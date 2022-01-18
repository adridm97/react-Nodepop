import React from "react";
import Button from "../../common/Button";
import { useEffect, useState, useMemo } from "react";
import { Redirect, useLocation, useParams } from "react-router";
import { useHistory, Link } from "react-router-dom";
import Confirmation from "./Confirmation";
import Layout from "../../layout/Layout";
import { getAd, deleteAd } from "../service";
import "./AdPage.css";

function AdPage() {
  const { adId } = useParams();
  const [ad, setAd] = useState(null);
  const [error, setError] = useState([]);
  const [display, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    getAd(adId)
      .then((ad) => setAd(ad))
      .catch((error) => setError(error));
  }, [adId]);

  const confirmation = async (event) => {
    event.preventDefault();
    setDisplay(true);
  };
  const handleDelete = async () => {
    try {
      await deleteAd(adId);
      setIsLoading(false);
      const { from } = location.state || { from: { pathname: "/ads" } };
      history.replace(from);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  const buttonDisabled = useMemo(() => isLoading[isLoading]);

  if (error?.status === 404) {
    return <Redirect to="/404" />;
  }

  return (
    <div>
      {ad && (
        <Layout>
          <div className="adContainer">
            <img
              className="adPhoto"
              src={`http://localhost:3001${ad.photo}`}
            ></img>
            <p className="adPrice">{ad.price} EUR</p>
            <p className="adName">{ad.name}</p>
            {ad.sale === true ? (
              <p className="sale">Tipo: Venta </p>
            ) : (
              <p className="sale">Tipo: Compra </p>
            )}
            <div className="tags">Etiquetas:{ad.tags.join(", ")}</div>
            <Button
              className="adButton"
              onClick={confirmation}
              disabled={buttonDisabled}
              variant="delete"
              as={Link}
              to="/"
            >
              Borrar
            </Button>
          </div>
          {display && (
            <Confirmation onConfirm={handleDelete} onDisplay={setDisplay}>
              Desea borrar el anuncio?
            </Confirmation>
          )}
        </Layout>
      )}
    </div>
  );
}

export default AdPage;
