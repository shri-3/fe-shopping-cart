import React, { useEffect, useState } from "react";
import logo from "../../../assets/template-assets/images/logo.png";
import MenuBar from "./MenuBar";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProductResults,
  setProductResults,
} from "../../../redux/slices/search-product";
import useDebounce from "../../../hooks/useDebounce";

const Header = () => {
  const productsSearch = useSelector(selectProductResults);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const count = useSelector(
    (state) => state.cartProduct.cartProductsList.length,
  );
  const handelChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    dispatch(setProductResults(trimmed));
    navigate("/product");
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(setProductResults(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    if (productsSearch.length === 0) {
      setSearchTerm(""); // safe here, runs only when productsSearch changes
    }
  }, [productsSearch]);

  return (
    <>
      <header>
        <div className="container">
          <div className="logo">
            <Link to="/">
              {/* <img src={logo} alt="" /> */}
              <h4>Smart Product</h4>
            </Link>
          </div>
          <form className="search-cate" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              name="searchInput"
              placeholder="Search entire store here..."
              onChange={handelChangeSearch}
              value={searchTerm}
            />
            <button className="submit" type="submit">
              <i className="icon-magnifier"></i>
            </button>
          </form>

          {/* !-- Cart Part -- */}
          <ul className="nav navbar-right cart-pop">
            <li className="dropdown">
              {" "}
              <Link
                to={"/cart"}
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="itm-cont">{count}</span>{" "}
                <i className="flaticon-shopping-bag"></i>{" "}
                <strong>My Cart</strong> <br />
                <span>{count} item(s)</span>
              </Link>
              {/* <ul className="dropdown-menu">
                <li>
                  <div className="media-left">
                    {" "}
                    <a href="#." className="thumb">
                      {" "}
                      <img
                        src="images/item-img-1-1.jpg"
                        className="img-responsive"
                        alt=""
                      />{" "}
                    </a>{" "}
                  </div>
                  <div className="media-body">
                    {" "}
                    <a href="#." className="tittle">
                      Funda Para Ebook 7" 128GB full HD
                    </a>{" "}
                    <span>250 x 1</span>{" "}
                  </div>
                </li>
                <li>
                  <div className="media-left">
                    {" "}
                    <a href="#." className="thumb">
                      {" "}
                      <img
                        src="images/item-img-1-2.jpg"
                        className="img-responsive"
                        alt=""
                      />{" "}
                    </a>{" "}
                  </div>
                  <div className="media-body">
                    {" "}
                    <a href="#." className="tittle">
                      Funda Para Ebook 7" full HD
                    </a>{" "}
                    <span>250 x 1</span>{" "}
                  </div>
                </li>
                <li className="btn-cart">
                  {" "}
                  <a href="#." className="btn-round">
                    View Cart
                  </a>{" "}
                </li>
              </ul> */}
            </li>
          </ul>
        </div>
        <MenuBar />
      </header>
    </>
  );
};

export default Header;
