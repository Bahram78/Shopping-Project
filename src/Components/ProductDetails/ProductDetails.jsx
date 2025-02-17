import React, { useContext, useEffect, useState } from "react";
import { Contexts } from "../../App";
import Styles from "./ProductDetails.module.css";
// import LoadingSkeletonExample from "../skeleton/skeleton";
import { useParams } from "react-router-dom";
import AddtoCard from "../AddtoCard/AddtoCard";
import AddtoFavorite from "../AddtoFavorites/AddtoFavorite";
import { RotatingLines } from "react-loader-spinner";

const ProductDetails = () => {
  const { productData, setProductData, productAvailable, loading, setLoading } =
    useContext(Contexts);
  const params = useParams();


  useEffect(() => {
    setLoading(true);

    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => res.json())
      .then((date) => setProductData(date))
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false));

  }, [params.id]);

  if (!productData || Object.keys(productData).length === 0 || loading) {
    return (
      <div className="rotating">
        <RotatingLines
          strokeColor="bisque"
          strokeWidth="5"
          animationDuration="0.75"
          width="70"
          visible={true}
        />
      </div>
    );
  }

 
  return (
    <>
      <div className={Styles.details}>
        <div
          style={{ backgroundImage: `url(${productData.image}) ` }}
          className={Styles.imagebox}
        ></div>
        <h1>{productData.title}</h1>
        <p>{productData.description}</p>
        <h3>Available:{productAvailable}</h3>
        <div className={Styles.btnContainer}>
          <AddtoFavorite id={productData.id} />
          <AddtoCard id={productData.id} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
