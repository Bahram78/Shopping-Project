import { useNavigate } from "react-router-dom";
import Styles from "../ProductsCard/ProductCard.module.css";
import AddtoFavorite from "../AddtoFavorites/AddtoFavorite";
const ProductsCard = ({ product }) => {
  const navigate = useNavigate();
  const Handlecarddetails = (id) => {
    navigate(`/product/${id}`);
  };
  // console.log("gholiim",product.id)
  return (
    <>
      <div>
        <div
          className={Styles.imgContainer}
          onClick={() => Handlecarddetails(product.id)}
        >
          <img src={product.image} alt="" className={Styles.imgBox} />
        </div>
        <div className={Styles.details}>
          <h3>Title : {product.title}</h3>
          <h3>Price : {product.price}</h3>
          <h3>Category : {product.category}</h3>
          <h3>Available : {product.available}</h3>
          <h3>Rata : {product.rating.rate}</h3>
          {/*Aya rahi joz customclass bod? baresi shavad  */}
          <AddtoFavorite id={product.id} customClass={Styles.addtoFavorite} />
        </div>
      </div>
    </>
  );
};

export default ProductsCard;
