import React from "react";
import T from "prop-types";

import "./Ad.css";

const Ad = ({ name, sale, price, tags, photo }) => {
  return (
    <article className="ad">
      {photo ? (
        <img src={`http://localhost:3001${photo}`} className="adPhoto"></img>
      ) : null}
      <b>
        <p className="name">{name}</p>
      </b>
      {sale === true ? (
        <p className="sale"> Venta </p>
      ) : (
        <p className="sale"> Compra </p>
      )}
      <p className="price">{price} €</p>
      <p className="tags">Etiquetas: {tags.join(", ")}</p>
    </article>
  );
};

export const adType = {
  name: T.string.isRequired,
  sale: T.bool.isRequired,
  price: T.number.isRequired,
  tags: T.array,
  photo: T.string,
};

Ad.propTypes = adType;

Ad.defaultProps = {
  name: "Nothing here!",
};

export default Ad;
