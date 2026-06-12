import React from "react";
import { Link } from "react-router";

const MenuBar = () => {
  return (
    <>
      <nav className="navbar ownmenu">
        <div className="container">
          {/* <!-- Categories --> */}
          <div className="cate-lst">
            {" "}
            <a data-toggle="collapse" className="cate-style" href="#cater">
              <i className="fa fa-list-ul"></i> Our Categories{" "}
            </a>
            <div className="cate-bar-in">
              <div id="cater" className="collapse">
                <ul>
                  <li>
                    <a href="#."> Home Audio & Theater</a>
                  </li>
                  <li>
                    <a href="#."> TV & Video</a>
                  </li>
                  <li>
                    <a href="#."> Camera, Photo & Video</a>
                  </li>
                  <li className="sub-menu">
                    <a href="#."> Cell Phones & Accessories</a>
                    <ul>
                      <li>
                        <a href="#."> TV & Video</a>
                      </li>
                      <li>
                        <a href="#."> Camera, Photo & Video</a>
                      </li>
                      <li>
                        <a href="#."> Cell Phones & Accessories</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#."> Headphones</a>
                  </li>
                  <li>
                    <a href="#."> Video Games</a>
                  </li>
                  <li className="sub-menu">
                    <a href="#."> Bluetooth & Wireless Speakers</a>
                    <ul>
                      <li>
                        <a href="#."> TV & Video</a>
                      </li>
                      <li>
                        <a href="#."> Camera, Photo & Video</a>
                      </li>
                      <li>
                        <a href="#."> Cell Phones & Accessories</a>
                      </li>
                    </ul>
                  </li>
                  <li className="sub-menu">
                    <a href="#."> Gaming Console</a>
                    <ul>
                      <li>
                        <a href="#."> TV & Video</a>
                      </li>
                      <li>
                        <a href="#."> Camera, Photo & Video</a>
                      </li>
                      <li>
                        <a href="#."> Cell Phones & Accessories</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#."> Computers & Tablets</a>
                  </li>
                  <li>
                    <a href="#."> Monitors</a>
                  </li>
                  <li>
                    <a href="#."> Home Appliances</a>
                  </li>
                  <li>
                    <a href="#."> Office Supplies</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <!-- Navbar Header --> */}
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#nav-open-btn"
              aria-expanded="false"
            >
              {" "}
              <span>
                <i className="fa fa-navicon"></i>
              </span>{" "}
            </button>
          </div>
          {/* <!-- NAV --> */}
          <div className="collapse navbar-collapse" id="nav-open-btn">
            <ul className="nav">
              <li className="dropdown megamenu active">
                <Link to="/" className="dropdown-toggle" data-toggle="dropdown">
                  Home{" "}
                </Link>
                {/* <div className="dropdown-menu animated-2s fadeInUpHalf">
                  <div className="mega-inside scrn">
                    <ul className="home-links">
                      <li>
                        <a href="index.html">
                          <img
                            className="img-responsive"
                            src="images/home-1.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 1</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-2.html">
                          <img
                            className="img-responsive"
                            src="images/home-2.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 2</span>
                        </a>{" "}
                      </li>
                      <li>
                        <a href="index-3.html">
                          <img
                            className="img-responsive"
                            src="images/home-3.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 3</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-4.html">
                          <img
                            className="img-responsive"
                            src="images/home-4.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 4</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-5.html">
                          <img
                            className="img-responsive"
                            src="images/home-5.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 5</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-6.html">
                          <img
                            className="img-responsive"
                            src="images/home-6.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 6</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-7.html">
                          <img
                            className="img-responsive"
                            src="images/home-7.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 7</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-8.html">
                          <img
                            className="img-responsive"
                            src="images/home-8.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 8</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-9.html">
                          <img
                            className="img-responsive"
                            src="images/home-9.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 9</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-10.html">
                          <img
                            className="img-responsive"
                            src="images/home-10.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 10</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-11.html">
                          <img
                            className="img-responsive"
                            src="images/home-11.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 11</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-12.html">
                          <img
                            className="img-responsive"
                            src="images/home-12.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 12</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-13.html">
                          <img
                            className="img-responsive"
                            src="images/home-13.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 13</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-14.html">
                          <img
                            className="img-responsive"
                            src="images/home-14.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 14</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-15.html">
                          <img
                            className="img-responsive"
                            src="images/home-15.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 15</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-16.html">
                          <img
                            className="img-responsive"
                            src="images/home-16.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 16</span>
                        </a>
                      </li>
                      <li>
                        <a href="index-17.html">
                          <img
                            className="img-responsive"
                            src="images/home-17.jpg"
                            alt=""
                          />{" "}
                          <span>Home Version 17</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </li>
              <li>
                <Link to="/product">Product </Link>
              </li>
              <li>
                <Link to="/wishlist">Wishlist </Link>
              </li>
              <li>
                <Link to="/cart">Cart </Link>
              </li>
              {/* <li className="dropdown">
                {" "}
                <a
                  href="index.html"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Pages{" "}
                </a>
                <ul className="dropdown-menu multi-level animated-2s fadeInUpHalf">
                  <li>
                    <a href="About.html"> About </a>
                  </li>
                  <li>
                    <a href="LoginForm.html"> Login Form </a>
                  </li>
                  <li>
                    <a href="GridProducts_3Columns.html">
                      {" "}
                      Products 3 Columns{" "}
                    </a>
                  </li>
                  <li>
                    <a href="GridProducts_4Columns.html">
                      {" "}
                      Products 4 Columns{" "}
                    </a>
                  </li>
                  <li>
                    <a href="ListProducts.html"> List Products </a>
                  </li>
                  <li>
                    <a href="Product-Details.html"> Product Details </a>
                  </li>
                  <li>
                    <a href="ShoppingCart.html"> Shopping Cart</a>
                  </li>
                  <li>
                    <a href="PaymentMethods.html"> Payment Methods </a>
                  </li>
                  <li>
                    <a href="DeliveryMethods.html"> Delivery Methods</a>
                  </li>
                  <li>
                    <a href="Confirmation.html"> Confirmation </a>
                  </li>
                  <li>
                    <a href="CheckoutSuccessful.html"> Checkout Successful </a>
                  </li>
                  <li>
                    <a href="Error404.html"> Error404 </a>
                  </li>
                  <li>
                    <a href="contact.html"> Contact </a>
                  </li>
                  <li className="dropdown-submenu">
                    <a href="#."> Dropdown Level </a>
                    <ul className="dropdown-menu animated-2s fadeInRight">
                      <li>
                        <a href="#.">Level 1</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li> */}
              {/* <!-- Mega Menu Nav --> */}
              {/* <li className="dropdown megamenu">
                {" "}
                <a
                  href="index.html"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Mega menu{" "}
                </a>
                <div className="dropdown-menu animated-2s fadeInUpHalf">
                  <div className="mega-inside">
                    <div className="top-lins">
                      <ul>
                        <li>
                          <a href="#."> Cell Phones & Accessories </a>
                        </li>
                        <li>
                          <a href="#."> Carrier Phones </a>
                        </li>
                        <li>
                          <a href="#."> Unlocked Phones </a>
                        </li>
                        <li>
                          <a href="#."> Prime Exclusive Phones </a>
                        </li>
                        <li>
                          <a href="#."> Accessories </a>
                        </li>
                        <li>
                          <a href="#."> Cases </a>
                        </li>
                        <li>
                          <a href="#."> Best Sellers </a>
                        </li>
                        <li>
                          <a href="#."> Deals </a>
                        </li>
                        <li>
                          <a href="#."> All Electronics </a>
                        </li>
                      </ul>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6>Electronics</h6>
                        <ul>
                          <li>
                            <a href="#."> Cell Phones & Accessories </a>
                          </li>
                          <li>
                            <a href="#."> Carrier Phones </a>
                          </li>
                          <li>
                            <a href="#."> Unlocked Phones </a>
                          </li>
                          <li>
                            <a href="#."> Prime Exclusive Phones </a>
                          </li>
                          <li>
                            <a href="#."> Accessories </a>
                          </li>
                          <li>
                            <a href="#."> Cases </a>
                          </li>
                          <li>
                            <a href="#."> Best Sellers </a>
                          </li>
                          <li>
                            <a href="#."> Deals </a>
                          </li>
                          <li>
                            <a href="#."> All Electronics </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-sm-3">
                        <h6>Computers</h6>
                        <ul>
                          <li>
                            <a href="#."> Computers & Tablets</a>
                          </li>
                          <li>
                            <a href="#."> Monitors</a>
                          </li>
                          <li>
                            <a href="#."> Laptops & tablets</a>
                          </li>
                          <li>
                            <a href="#."> Networking</a>
                          </li>
                          <li>
                            <a href="#."> Drives & Storage</a>
                          </li>
                          <li>
                            <a href="#."> Computer Parts & Components</a>
                          </li>
                          <li>
                            <a href="#."> Printers & Ink</a>
                          </li>
                          <li>
                            <a href="#."> Office & School Supplies </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-sm-2">
                        <h6>Home Appliances</h6>
                        <ul>
                          <li>
                            <a href="#."> Refrigerators</a>
                          </li>
                          <li>
                            <a href="#."> Wall Ovens</a>
                          </li>
                          <li>
                            <a href="#."> Cooktops & Hoods</a>
                          </li>
                          <li>
                            <a href="#."> Microwaves</a>
                          </li>
                          <li>
                            <a href="#."> Dishwashers</a>
                          </li>
                          <li>
                            <a href="#."> Washers</a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-sm-4">
                        {" "}
                        <img
                          className=" nav-img"
                          src="images/navi-img.png"
                          alt=""
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="dropdown">
                {" "}
                <a
                  href="blog.html"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Blog
                </a>
                <ul className="dropdown-menu multi-level animated-2s fadeInUpHalf">
                  <li>
                    <a href="Blog.html">Blog </a>
                  </li>
                  <li>
                    <a href="Blog_details.html">Blog Single </a>
                  </li>
                </ul>
              </li>
              <li>
                {" "}
                <a href="shop.html">Buy theme! </a>
              </li> */}
            </ul>
          </div>

          {/* <!-- NAV RIGHT --> */}
          {/* <div className="nav-right">
            {" "}
            <span className="call-mun">
              <i className="fa fa-phone"></i> <strong>Hotline:</strong> (+100) 123
              456 7890
            </span>{" "}
          </div> */}
        </div>
      </nav>
    </>
  );
};

export default MenuBar;
