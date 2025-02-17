import React, { useContext, useEffect } from "react";
import { Contexts } from "../../App";
import Styles from "./ShoppingCard.module.css";
import { useNavigate } from "react-router-dom";
// import AddtoCard from "../AddtoCard/AddtoCard";

const ShoppingCard = () => {
  const { productsData, setProductsData, firstAvailableref, productAvailable } =
    useContext(Contexts);
  const navigate = useNavigate();
  const getIdHandler = (id) => {
    navigate(`/product/${id}`);
  };
  useEffect(() => {
    const storedFavorites = sessionStorage.getItem("savedProducts");
    setProductsData(storedFavorites ? JSON.parse(storedFavorites) : []);
  }, []);

  const AddtoCardremoveHandler = (id) => {
    setProductsData((preve) => {
      const newProductList = preve.map((product) =>
        id === product.id
          ? {
              ...product,
              isAdded: !product.isAdded,
              available: firstAvailableref.current[id],
              buyCount: 0,
            }
          : product
      );
      sessionStorage.setItem("savedProducts", JSON.stringify(newProductList));
      return newProductList;
    });
  };

  return (
    <div>
      <h1 className={Styles.title}>Shopping Card</h1>
      <div className={Styles.productContainer}>
        {productsData
          .filter((product) => product.isAdded)
          .map((product) => (
            <div key={product.id} className={Styles.Card}>
              <div
                className={Styles.imgcontainer}
                onClick={() => getIdHandler(product.id)}
              >
                <img src={product.image} alt={product.title} width={100} />
              </div>
              <div className={Styles.details}>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <button
                  className={Styles.addRemove}
                  onClick={() => AddtoCardremoveHandler(product.id)}
                >
                  Remove
                </button>
                <h2>Buy count: {product.buyCount}</h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShoppingCard;
