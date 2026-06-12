import React, { useEffect, useState } from "react";
import ProductShortList from "./ProductShortList";
import { Link } from "react-router";
// import useFetch from "../../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/cart-product";
import {
  selectProductResults,
  selectRatingResults,
  selectSearchResults,
} from "../../../redux/slices/search-product";
import useFetch from "../../../hooks/useFetch";
import { buildSearchUrl } from "../../../utils/buildSearchUrl";
import { BE_BASE_URL } from "../../../api/apiService";

const ProductList = () => {
  const baseURL = `${BE_BASE_URL}/products`;
  const [searchURL, setSearchURL] = useState(baseURL);
  const { data, loading, error, refetch } = useFetch(searchURL);

  const count = useSelector((state) => state.cartProduct);

  const getPrice = useSelector(selectSearchResults);
  const productsSearch = useSelector(selectProductResults);
  const ratingResults = useSelector(selectRatingResults);

  const dispatch = useDispatch();

  useEffect(() => {
    const hasData = (arr) => Array.isArray(arr) && arr.length > 0;

    let url = baseURL;

    if (
      productsSearch.length > 0 ||
      hasData(getPrice) ||
      ratingResults.length > 0
    ) {
      const searchParams = {
        name: productsSearch,
        rating: ratingResults,
        minPrice: getPrice[0],
        maxPrice: getPrice[1],
      };

      // Build the search URL with only non-empty parameters and if any of the parameters "searchParams" are empty auto-removed
      url = buildSearchUrl(`${baseURL}/search`, searchParams);
    }

    // Only update if URL actually changed
    if (url !== searchURL) {
      setSearchURL(url);
    }
  }, [getPrice, productsSearch, ratingResults, searchURL]);

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
          <span className="tag">Tablets</span>
          <Link to={`/product/${data[i]._id}`} className="tittle">
            {data[i].name}
          </Link>
          <p className="rev">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
            <span className="margin-left-10">5 Review(s)</span>
          </p>
          <div className="price">
            ${data[i].price}.00 {/* <span>$200.00</span> */}
          </div>
          <a className="cart-btn" onClick={() => dispatch(addToCart(data[i]))}>
            <i className="icon-basket-loaded"></i>
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
