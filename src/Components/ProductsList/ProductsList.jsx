import { useContext, useEffect } from "react";
import ProductsCard from "../ProductsCard/ProductCard";
import Styles from "../ProductsList/ProductsList.module.css";
import { Contexts } from "../../App";

const ProductList = () => {
  const {
    productsData,
    setProductsData,
    filterd,
  } = useContext(Contexts);

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem("savedProducts");

    if (!storedFavorites) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) =>
          setProductsData(() => {
            const NewProductData = data.map((product) => ({
              ...product,
              available: Math.floor(Math.random() * 20) + 1,
            }));
            sessionStorage.setItem(
              "savedProducts",
              JSON.stringify(NewProductData)
            );
            return NewProductData;
          })
        );
    } else {
      setProductsData(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <>
      <div className={Styles.productContainer}>
        {filterd.isFiltered
          ? productsData
              .filter((product) =>
                product.title
                  .toLowerCase()
                  .includes(filterd.search.toLowerCase())
              )
              .filter(
                (product) =>
                  product.price >= filterd.range[0] &&
                  product.price <= filterd.range[1]
              )
              .filter(
                (product) =>
                  filterd.categories.length === 0 ||
                  filterd.categories.includes(product.category)
              )
              .map((product) => {
                return (
                  <div className={Styles.Card} key={product.id}>
                    <ProductsCard product={product} />
                  </div>
                );
              })
          : productsData.map((product) => {
              return (
                <div className={Styles.Card} key={product.id}>
                  <ProductsCard product={product} />
                </div>
              );
            })}
      </div>
    </>
  );
};

export default ProductList;
