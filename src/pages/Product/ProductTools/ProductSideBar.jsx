import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch } from "react-redux";
import {
  setPriceResults,
  setRatingResults,
  setProductResults,
  setCategoryResults,
  setShortPriceResults,
} from "../../../redux/slices/search-product";
import useFetch from "../../../hooks/useFetch";
import { BE_BASE_URL } from "../../../api/apiService";

const ProductSideBar = () => {
  const { data, loading } = useFetch(`${BE_BASE_URL}/category`);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 940]);
  const dispatch = useDispatch();

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };
  const handlePriceFilter = (value) => {
    dispatch(setPriceResults(value));
  };
  const handleClearFilters = () => {
    dispatch(setPriceResults([]));
    dispatch(setRatingResults([]));
    dispatch(setProductResults([]));
    dispatch(setCategoryResults([]));
    dispatch(setShortPriceResults([]));
    setSelectedIds([]);
    setPriceRange([0, 940]);
    setSelectedOption("");
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add ID to array if checked
      setSelectedIds([...selectedIds, value]);
    } else {
      // Remove ID from array if unchecked
      setSelectedIds(selectedIds.filter((id) => id !== value));
    }
  };

  const handleClickRadio = (e) => {
    setSelectedOption(e.target.value);
    dispatch(setShortPriceResults(Number(e.target.value)));
  };

  useEffect(() => {
    // Dispatch the selected IDs to the Redux store whenever they change
    dispatch(setCategoryResults(selectedIds));
  }, [selectedIds, dispatch]);

  if (loading) return null;

  return (
    <>
      {/* ### Shop Side Bar */}
      <div className="col-md-3">
        <div className="shop-side-bar">
          {/* ### Categories */}
          <div className="categories-head">
            <h6>Filter</h6>
            <p onClick={() => handleClearFilters()}>Clear</p>
          </div>
          <h6>Categories</h6>
          <div className="checkbox checkbox-primary">
            <ul>
              {data?.map((category, index) => (
                <li key={`cate${index}`}>
                  <input
                    id={`cate${index}`}
                    className="styled"
                    type="checkbox"
                    value={category._id}
                    checked={selectedIds.includes(category._id)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`cate${index}`}> {category.name} </label>
                </li>
              ))}
            </ul>
          </div>

          <h6>Price</h6>
          {/* PRICE */}
          <div className="cost-price-content">
            <Slider
              range
              min={0}
              max={10000}
              step={1}
              // defaultValue={[0, 940]}
              value={priceRange}
              onChange={handlePriceChange}
              trackStyle={[{ backgroundColor: "#2B7FBD" }]}
              handleStyle={[
                {
                  backgroundColor: "#2B7FBD",
                  borderColor: "#2B7FBD",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                },
                {
                  backgroundColor: "#2B7FBD",
                  borderColor: "#2B7FBD",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                },
              ]}
              railStyle={{ backgroundColor: "#d3d3d3", height: 5 }}
            />
            <span className="price-min">${priceRange[0]}</span>{" "}
            <span className="price-max">${priceRange[1]}</span>{" "}
            <button
              // href="#."
              className="btn-round "
              onClick={() => handlePriceFilter(priceRange)}
            >
              Filter
            </button>
          </div>

          {/* Featured Brands */}
          {/* <h6>Featured Brands</h6>
          <div className="checkbox checkbox-primary">
            <ul>
              <li>
                <input id="brand1" className="styled" type="checkbox" />
                <label htmlFor="brand1">
                  {" "}
                  Apple <span>(217)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand2" className="styled" type="checkbox" />
                <label htmlFor="brand2">
                  {" "}
                  Acer <span>(79)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand3" className="styled" type="checkbox" />
                <label htmlFor="brand3">
                  {" "}
                  Asus <span>(283)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand4" className="styled" type="checkbox" />
                <label htmlFor="brand4">
                  Samsung <span>(116)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand5" className="styled" type="checkbox" />
                <label htmlFor="brand5">
                  {" "}
                  LG <span>(29)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand6" className="styled" type="checkbox" />
                <label htmlFor="brand6">
                  {" "}
                  Electrolux <span>(179)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand7" className="styled" type="checkbox" />
                <label htmlFor="brand7">
                  {" "}
                  Toshiba <span>(38)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand8" className="styled" type="checkbox" />
                <label htmlFor="brand8">
                  {" "}
                  Sharp <span>(205)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand9" className="styled" type="checkbox" />
                <label htmlFor="brand9">
                  {" "}
                  Sony <span>(35)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand10" className="styled" type="checkbox" />
                <label htmlFor="brand10">
                  {" "}
                  HTC <span>(59)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand11" className="styled" type="checkbox" />
                <label htmlFor="brand11">
                  {" "}
                  Lenovo <span>(68)</span>{" "}
                </label>
              </li>
              <li>
                <input id="brand12" className="styled" type="checkbox" />
                <label htmlFor="brand12">Sanyo (19) </label>
              </li>
            </ul>
          </div> */}

          {/* Rating */}
          <h6>Rating</h6>
          <div className="rating">
            <ul>
              <li>
                <a onClick={() => dispatch(setRatingResults(5))}>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i> <span>(21)</span>
                </a>
              </li>
              <li>
                <a onClick={() => dispatch(setRatingResults(4))}>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i> <span>(218)</span>
                </a>
              </li>
              <li>
                <a onClick={() => dispatch(setRatingResults(3))}>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i> <span>(178)</span>
                </a>
              </li>
              <li>
                <a onClick={() => dispatch(setRatingResults(2))}>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i> <span>(79)</span>
                </a>
              </li>
              <li>
                <a onClick={() => dispatch(setRatingResults(1))}>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i> <span>(188)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Price radio Buttons */}
          <h6>Short By Price</h6>
          <div className="radio radio-primary">
            <ul>
              <li>
                <input
                  name="priceSort"
                  className=""
                  type="radio"
                  value="1"
                  checked={selectedOption === "1"}
                  onClick={handleClickRadio}
                />
                <label htmlFor="priceSort1"> Low to High</label>
              </li>
              <li>
                <input
                  name="priceSort"
                  className=""
                  type="radio"
                  value="-1"
                  checked={selectedOption === "-1"}
                  onClick={handleClickRadio}
                />
                <label htmlFor="priceSort2"> High to Low</label>
              </li>
            </ul>
          </div>
          {/* </div> */}

          {/* Size */}
          {/* <h6>Size</h6>
          <div className="sizes">
            {" "}
            <a href="#.">S</a> <a href="#.">M</a> <a href="#.">L</a>{" "}
            <a href="#.">XL</a>{" "}
          </div> */}

          {/* Colors */}
          {/* <h6>Colors</h6>
          <div className="checkbox checkbox-primary">
            <ul>
              <li>
                <input id="colr1" className="styled" type="checkbox" />
                <label htmlFor="colr1">
                  {" "}
                  Red <span>(217)</span>{" "}
                </label>
              </li>
              <li>
                <input id="colr2" className="styled" type="checkbox" />
                <label htmlFor="colr2">
                  {" "}
                  Yellow <span> (179) </span>{" "}
                </label>
              </li>
              <li>
                <input id="colr3" className="styled" type="checkbox" />
                <label htmlFor="colr3">
                  {" "}
                  Black <span>(79)</span>{" "}
                </label>
              </li>
              <li>
                <input id="colr4" className="styled" type="checkbox" />
                <label htmlFor="colr4">
                  Blue <span>(283) </span>
                </label>
              </li>
              <li>
                <input id="colr5" className="styled" type="checkbox" />
                <label htmlFor="colr5">
                  {" "}
                  Grey <span> (116)</span>{" "}
                </label>
              </li>
              <li>
                <input id="colr6" className="styled" type="checkbox" />
                <label htmlFor="colr6">
                  {" "}
                  Pink<span> (29) </span>
                </label>
              </li>
              <li>
                <input id="colr7" className="styled" type="checkbox" />
                <label htmlFor="colr7">
                  {" "}
                  White <span> (38)</span>{" "}
                </label>
              </li>
              <li>
                <input id="colr8" className="styled" type="checkbox" />
                <label htmlFor="colr8">
                  Green <span>(205)</span>
                </label>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductSideBar;
