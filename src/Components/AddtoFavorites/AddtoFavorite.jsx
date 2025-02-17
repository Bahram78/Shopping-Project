import { useContext, useEffect } from "react";
import { Contexts } from "../../App";

const AddtoFavorite = ({ id, customClass }) => {
  const { productsData, setProductsData } = useContext(Contexts);

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem("savedProducts");
    setProductsData(storedFavorites ? JSON.parse(storedFavorites) : []);
  }, []);

  const Handlefavoriteproduct = () => {
    setProductsData((preve) => {
      const newProductList = preve.map((product) =>
        product.id === id
          ? { ...product, isfavorite: !product.isfavorite }
          : product
      );
      sessionStorage.setItem("savedProducts", JSON.stringify(newProductList));
      return newProductList;
    });
  };

  // useEffect(() => {
  //   console.log("jan bachat", productsData);
  // }, [productsData]);

  // const clearHandler = () => {
  //   localStorage.clear();
  //   setProductsList([]);
  // };

  const currentProduct = productsData.find((p) => p.id === id);
  const isFavorite = currentProduct?.isfavorite;
  return (
    <>
      <button onClick={Handlefavoriteproduct} className={customClass}>
        {!isFavorite ? "Add to favorites" : "Remove from favorites"}
      </button>

      {/* <button onClick={clearHandler}>Clear Favorites Data</button> */}
    </>
  );
};

export default AddtoFavorite;
