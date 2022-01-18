import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Range } from "rc-slider";
import { getLatestAds, getTags } from "../service";
import Layout from "../../layout";
import "./AdsPage.css";
import { Button } from "../../common";
import Ad from "./Ad";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
const EmptyList = () => (
  <div style={{ textAlign: "center" }}>
    <p>Be the first advert!</p>
    <Button as={Link} to="/ads/new" variant="primary">
      Ad
    </Button>
  </div>
);
function AdsPage({ history, ...props }) {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState(ads);
  const [tags, setTags] = useState([]);

  const min = 1;
  const max = 100000;
  const handleChange = (event) => {
    setValue((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const [prices, setPrices] = useState([10, 20]);

  const [value, setValue] = useState({
    name: "",
    sale: true,
    price: 0,
    tags: [],
  });
  useEffect(() => {
    getTags().then((tags) => setTags(tags));
  }, []);
  useEffect(() => {
    getLatestAds().then((ads) => {
      setAds(ads);
      setFilteredAds(ads);
    });
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = null;
    result = ads.filter((data) => {
      return data.name.toLowerCase().search(value) !== -1;
    });

    setFilteredAds(result);
  };
  const handleRadio = (event) => {
    let value = event.target.value.toLowerCase();
    let result = null;
    result = ads.filter((data) => {
      return data.sale.toString().search(value) !== -1;
    });

    setFilteredAds(result);
  };
  const handlePrice = (event, newValue) => {
    let value = event.target.value;
    let result = null;
    result = ads.filter((data) => {
      if (value[0] < data.price && value[1] > data.price) {
        console.log(value);
        return data.price.toString().search(value);
      }
    });
    setPrices(newValue);
    setFilteredAds(result);
  };
  const handleTags = (event) => {
    let value = Array.from(event.target.selectedOptions, (option) =>
      option.value.toString()
    );
    let result = null;
    result = ads.filter((data) => {
      console.log(value);
      return data.tags.toString().search(value) != -1;
    });
    setFilteredAds(result);
  };

  return (
    <Layout {...props}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nombre a filtrar"
          onChange={(event) => handleSearch(event)}
        ></input>
        <p>Buscar por Compra/Venta:</p>
        <input
          type="radio"
          id="compra"
          name="sale"
          value="false"
          onChange={(event) => handleRadio(event)}
        />
        <label for="compra">Compra</label>
        <input
          type="radio"
          id="venta"
          name="sale"
          value="true"
          onChange={(event) => handleRadio(event)}
        />
        <label for="venta">Venta</label>
        <br />

        <select name="tags" multiple onChange={handleTags}>
          {tags.map((tags) => (
            <option value={tags}>{tags}</option>
          ))}
        </select>
        <Box sx={{ width: 300 }}>
          <br></br>
          <Slider
            name="price"
            value={prices}
            onChange={handlePrice}
            valueLabelDisplay="auto"
            min={1}
            max={10000}
          />
        </Box>
      </div>
      {ads.length ? (
        <div className="adsList">
          {filteredAds.map(({ id, ...ad }) => (
            <div key={id}>
              <Link to={`/ads/${id}`} style={{ textDecoration: "none" }}>
                <Ad {...ad} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <EmptyList />
      )}
    </Layout>
  );
}

export default AdsPage;
