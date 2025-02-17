import { useContext, useEffect, useRef } from "react";
import { Contexts } from "../../App";

const AddtoCard = ({ id }) => {
  const {
    productsData,
    setProductsData,
    firstAvailableref,
    productAvailable,
    setProductAvailable,
  } = useContext(Contexts);
  // console.log("bbbb", firstAvailableref?.current);
  useEffect(() => {
    const StoredList = sessionStorage.getItem("savedProducts");
    setProductsData(productsData ? JSON.parse(StoredList) : []);
  }, []);

  useEffect(() => {
    if (productsData.length > 0) {
      const p = productsData.find((product) => product.id === id);
      setProductAvailable(p.available);
    }
  }, [productsData]); //model neveshtanesh kheyli jalebe bazam motale shavad

  useEffect(() => {
    if (
      productsData.length > 0 &&
      Object.keys(firstAvailableref.current).length === 0
    ) {
      const savaedFirsrAvailables = productsData.reduce((acc, product) => {
        acc[product.id] = product.available; //porside shavad hatmannnnnnna
        return acc;
      }, {});
      firstAvailableref.current = savaedFirsrAvailables;
    }
  }, [productsData]);

  const AddtoCardHandler = () => {
    setProductsData((preve) => {
      const NewProductData = preve.map((product) =>
        id === product.id
          ? {
              ...product,
              isAdded: !product.isAdded,
              buyCount: 0,
            }
          : product
      );
      sessionStorage.setItem("savedProducts", JSON.stringify(NewProductData));
      return NewProductData;
    });
  };

  const plusHanlder = () => {
    setProductsData((preve) => {
      const availableSatus = preve.find((product) => product.id === id);
      const availableFinalSatatus = availableSatus?.available;
      if (availableFinalSatatus > 0) {
        const NewProductData = preve.map((product) =>
          product.id === id
            ? {
                ...product,
                available: product.available - 1,
                buyCount: firstAvailableref.current[id] - product.available + 1,
              }
            : product
        );
        sessionStorage.setItem("savedProducts", JSON.stringify(NewProductData));
        return NewProductData;
      } else {
        console.log("nadarim agha tamom shod");
        return preve;
      }
    });
  };
  const minesHandler = () => {
    setProductsData((preve) => {
      const availableSatus = preve.find((product) => product.id === id);
      const availableFinalSatatus = availableSatus?.available;
      if (availableFinalSatatus < firstAvailableref.current[id]) {
        //porside shavad hatmannnn
        const NewProductData = preve.map((product) =>
          product.id === id
            ? {
                ...product,
                available: product.available + 1,
                buyCount: firstAvailableref.current[id] - product.available - 1,
              }
            : product
        );
        sessionStorage.setItem("savedProducts", JSON.stringify(NewProductData));
        return NewProductData;
      } else {
        const NewProductData = preve.map((product) =>
          product.id === id
            ? {
                ...product,
                isAdded: !product.isAdded,
              }
            : product
        );
        return NewProductData;
      }
    });
  };

  useEffect(() => {
    console.log("shoppingList", productsData);
  }, [productsData]);

  const addStatus = productsData.find((product) => product.id === id);
  const addfalsyValue = addStatus?.isAdded;
  return (
    <div>
      {addfalsyValue ? (
        <>
          <button onClick={plusHanlder}>+</button>
          <button disabled onClick={AddtoCardHandler}>
            Add To Card
          </button>
          <button onClick={minesHandler}>-</button>
        </>
      ) : (
        <button onClick={AddtoCardHandler}>Add To Card</button>
      )}
    </div>
  );
};

export default AddtoCard;
