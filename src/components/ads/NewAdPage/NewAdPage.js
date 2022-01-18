import { bool, number } from "prop-types";
import { useEffect, useState, useRef } from "react";

import { Redirect, useHistory } from "react-router";
import { Button, Photo, Textarea } from "../../common";
import Layout from "../../layout";
import { createAd, getTags } from "../service";
import "./NewAdPage.css";

function NewAdPage() {
  const history = useHistory();
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState({
    name: "",
    sale: true,
    price: 0,
    tags: [],
  });
  const [createdAdId, setCreatedAdId] = useState("");
  const [error, setError] = useState(null);
  const [fileInput, setFileInput] = useState("");

  const handleTags = (event) => {
    let value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setValue((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  const handleChange = (event) => {
    setValue((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log(value);
  };
  useEffect(() => {
    getTags().then((tags) => setTags(tags));
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let newAd = new FormData();
      newAd.append("name", value.name);
      newAd.append("sale", value.sale);
      newAd.append("price", value.price);
      newAd.append("tags", value.tags);
      if (value.photo) {
        newAd.append("photo", value.photo);
      }
      console.log(value);
      const createdAd = await createAd(newAd);
      setCreatedAdId(createdAd.id);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        return history.push("/login");
      }
      setError(error);
    }
  };

  if (createdAdId) {
    return <Redirect to={`/ads/${createdAdId}`} />;
  }
  return (
    <Layout title="Creación de un nuevo anuncio">
      <div className="newAdPage bordered">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              label="Nombre"
              placeholder="Nombre del producto"
              className="loginForm-field"
              value={value.name}
              onChange={handleChange}
              required
              autofocus
            ></input>
            <br></br>
            <select name="sale" value={value.sale} onChange={handleChange}>
              <option value="true">Venta</option>
              <option value="false" selected>
                Compra
              </option>
            </select>
            <br></br>
            <input
              type="number"
              name="price"
              label="Precio"
              placeholder="Precio del producto"
              className="loginForm-field"
              value={value.price}
              onChange={handleChange}
              required
            ></input>
            <br></br>
            <select name="tags" multiple onChange={handleTags}>
              {tags.map((tags) => (
                <option value={tags}>{tags}</option>
              ))}
            </select>
            <div></div>
            <br></br>
            <input
              name="photo"
              type="file"
              onChange={(event) =>
                setValue((prevState) => ({
                  ...prevState,
                  [event.target.name]: event.target.files[0],
                }))
              }
            />
            <br></br>
            <div className="newAdPage-footer">
              <Button
                type="submit"
                className="newAdPage-submit"
                variant="primary"
              >
                Crear Anuncio
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
export default NewAdPage;
