import React, { useEffect, useState } from "react";
import ProductShortList from "./ProductShortList";
import { Link } from "react-router";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cart-product";
import { BE_BASE_URL } from "../../../api/apiService";

const ProductList = () => {
  const { data, loading, error, refetch } = useFetch(`${BE_BASE_URL}/wishlist`);
  const dispatch = useDispatch();

  const [getId, setGetId] = useState("");

  useEffect(() => {
    if (getId != "") {
      // Make an API call to delete the item from the wishlist using the getId
      const fetchData = async () => {
        const url = `${BE_BASE_URL}/wishlist/${getId}`;
        try {
          const response = await axios.delete(url);
          refetch(); // Refetch the wishlist data after deletion
          setGetId(""); // Reset getId after deletion
        } catch (err) {
          console.log("Error deleting item:", err.message);
        }
      };
      fetchData();
    }
  }, [getId, refetch]);

  const listItems = () => {
    return data?.map((product, i) => (
      <div className="product" key={i + 1}>
        <article>
          <div
            className="wishlist-remove text-right"
            // onClick={() => dispatch(removeFromCart(product))}
            onClick={() => setGetId(product._id)}
          >
            <i className="fa fa-close"></i>
          </div>
          <img
            className="img-responsive"
            src={product.productId.imageUrl}
            alt=""
          />
          <span className="sale-tag">-25%</span>
          <span className="tag">Tablets</span>
          <Link to="/product/1" className="tittle">
            {product.productId.name}
          </Link>
          <p className="rev">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
            <span className="margin-left-10">5 Review(s)</span>
          </p>
          <div className="price">
            ${product.productId.price}.00 {/* <span>$200.00</span> */}
          </div>
          <a
            // href="#."
            className="cart-btn"
            onClick={() => dispatch(addToCart(product.productId))}
          >
            <i className="icon-basket-loaded"></i>
          </a>
        </article>
      </div>
    ));
  };

  return (
    <div className="col-md-12">
      <ProductShortList />

      <div className="item-col-4">
        {/* ### Product 1 */}
        {listItems()}
        {/* pagination */}
        <ul className="pagination col-md-12">
          <li>
            <Link to="#" aria-label="Previous">
              <i className="fa fa-angle-left"></i>
            </Link>
          </li>
          <li>
            <a className="active" href="#">
              1
            </a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#" aria-label="Next">
              <i className="fa fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
