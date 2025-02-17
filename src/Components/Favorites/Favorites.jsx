import React, { useContext, useEffect } from "react";
import { Contexts } from "../../App";
import Styles from "./Favorites.module.css";
import AddtoCard from "../AddtoCard/AddtoCard";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { productsData, setProductsData } = useContext(Contexts);
  //   const likedArraykeys = Object.keys(likedProduct);
  // const likedArrayvalues = Object.entries(ProductsList)
  //   .filter(([key, value]) => value === true)
  // .map((ke) => Number(ke[0]));//دمم گرم اینو درسته ولی خب باید درست تر نوشت
  // .map(([key]) => Number(key));
  //   console.log(likedArraykeys);
  // console.log(likedArrayvalues);
  const navigate = useNavigate();
  const getIdHandler = (id) => {
    navigate(`/product/${id}`);
  };
  useEffect(() => {
    const storedFavorites = sessionStorage.getItem("savedProducts");
    setProductsData(storedFavorites ? JSON.parse(storedFavorites) : []);
  }, []);
  const favoriteremoveHandler = (id) => {
    setProductsData((preve) => {
      const newProductList = preve.map((product) =>
        id === product.id
          ? { ...product, isfavorite: !product.isfavorite }
          : product
      );
      sessionStorage.setItem("savedProducts", JSON.stringify(newProductList));
      return newProductList;
    });
  };

  return (
    <div>
      <h1 className={Styles.title}>Favorites</h1>
      <div className={Styles.productContainer}>
        {productsData
          .filter((product) => product.isfavorite)
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
                  onClick={() => favoriteremoveHandler(product.id)}
                  className={Styles.favoriteRemove}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorites;
