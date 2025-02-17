import { useState } from "react";

import { createContext, useRef } from "react";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Layout from "./Components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShoppingCard from "./Components/ShoppingCard/ShoppingCard";
import Favorites from "./Components/Favorites/Favorites";

export const Contexts = createContext();
function App() {
  const [productsData, setProductsData] = useState([]);
  const [serachValue, setSearchValue] = useState("");
  const [rangeValue, setRangeValue] = useState(["", ""]);
  const [checkedCategories, setCheckedCategories] = useState({});
  const [productAvailable, setProductAvailable] = useState();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({});
  const [filterd, setFiltered] = useState({
    search: "",
    range: [0, 1000],
    categories: [],
    isFiltered: false,
  });

  const MinPriceref = useRef();
  const MaxPriceref = useRef();
  const firstAvailableref = useRef({});

  return (
    <Contexts.Provider
      value={{
        productsData,
        setProductsData,
        serachValue,
        setSearchValue,
        rangeValue,
        setRangeValue,
        MinPriceref,
        MaxPriceref,
        checkedCategories,
        setCheckedCategories,
        productData,
        setProductData,
        firstAvailableref,
        productAvailable,
        setProductAvailable,
        filterd,
        setFiltered,
        loading,
        setLoading,
      }}
    >
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/product/:id" element={<ProductDetails />}></Route>
            <Route path="/ShoppingCard" element={<ShoppingCard />}></Route>
            <Route path="/Favorites" element={<Favorites />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </Contexts.Provider>
  );
}

export default App;
