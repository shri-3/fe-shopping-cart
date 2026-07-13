import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductShortList from "./ProductShortList";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/cart-product";
import {
  selectProductResults,
  selectRatingResults,
  selectSearchResults,
  selectCategoryResults,
  selectShortPriceResults,
} from "../../../redux/slices/search-product";
import { buildSearchUrl } from "../../../utils/buildSearchUrl";
import { BE_BASE_URL } from "../../../api/apiService";
import { toast } from "react-toastify";

const ProductList = () => {
  const baseURL = `${BE_BASE_URL}/products`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const count = useSelector((state) => state.cartProduct);

  const getPrice = useSelector(selectSearchResults);
  const productsSearch = useSelector(selectProductResults);
  const ratingResults = useSelector(selectRatingResults);
  const categoryResults = useSelector(selectCategoryResults);
  const shortByPrice = useSelector(selectShortPriceResults);

  const dispatch = useDispatch();

  const renderStars = (rating) => {
    const value = Number(rating) || 0;
    const filledStars = Math.round(Math.max(0, Math.min(5, value)));
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`fa ${index < filledStars ? "fa-star" : "fa-star-o"}`}
      ></i>
    ));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const searchParams = {
          name: productsSearch,
          rating: ratingResults,
          minPrice: getPrice?.[0],
          maxPrice: getPrice?.[1],
          categoryId: categoryResults,
          priceShort: shortByPrice,
        };

        const payload = buildSearchUrl(searchParams);

        if (Object.keys(payload).length > 0) {
          const response = await axios.post(`${baseURL}/search`, payload);
          setData(response.data);
        } else {
          const response = await axios.get(baseURL);
          setData(response.data);
        }
      } catch (err) {
        setError(err.message || "Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    getPrice,
    productsSearch,
    ratingResults,
    categoryResults,
    baseURL,
    shortByPrice,
  ]);

  // Wishlist handler
  const handelAddWishlist = async (id) => {
    // Add wishlist API call here
    const proId = { productId: id };
    fetch(`${BE_BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proId),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errData = await response.json();
          //  Throwing just the message string makes it cleaner to catch
          throw new Error(errData.error || "Failed to add item to wishlist");
        }
        // CRUCIAL: You must keep this return for successful responses!
        return response.json();
      })
      .then((data) => {
        toast.success("Added to wishlist");
      })
      .catch((err) => {
        // FIX: Use err.message to get just the text string without "Error:"
        toast.error(err.message);
      });
  };

  const listItems = [];
  for (let i = 0; i < data.length; i++) {
    listItems.push(
      <div className="product" key={data[i]._id}>
        <article>
          <img
            className="img-responsive"
            style={{ height: "106px" }}
            src={data[i].imageUrl}
            alt=""
          />
          <span className="sale-tag">-25%</span>
          <span className="tag">{data[i].categoryId.name}</span>
          <Link to={`/product/${data[i]._id}`} className="tittle">
            {data[i].name}
          </Link>
          <p className="rev">
            {renderStars(data[i].rating)}
            <span className="margin-left-10">
              {data[i].reviews?.length ?? 0} Review(s)
            </span>
          </p>
          <div className="price">
            ${data[i].price}.00 {/* <span>$200.00</span> */}
          </div>
          <a className="cart-btn" onClick={() => dispatch(addToCart(data[i]))}>
            <i className="icon-basket-loaded"></i>
          </a>
          <a
            className="cart-btn"
            onClick={() => handelAddWishlist(data[i]._id)}
          >
            <i className="fa fa-heart"></i>
          </a>
        </article>
      </div>,
    );
  }
  return (
    <div className="col-md-9">
      <ProductShortList />

      <div className="item-col-4">
        {/* ### Product 1 */}
        {listItems}
        {/* pagination */}
        <div className="col-md-12">
          <ul className="pagination">
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
    </div>
  );
};

export default ProductList;
