import React from "react";
import ClientsSupport from "./ClientsSupport";

const Footer = () => {
  return (
    <>
      <ClientsSupport />
      {/* <!-- Footer --> */}
      <footer>
        <div className="container">
          {/* <!-- Footer Upside Links --> */}
          <div className="foot-link">
            <ul>
              <li>
                <a href="#."> About us </a>
              </li>
              <li>
                <a href="#."> Customer Service </a>
              </li>
              <li>
                <a href="#."> Privacy Policy </a>
              </li>
              <li>
                <a href="#."> Site Map </a>
              </li>
              <li>
                <a href="#."> Search Terms </a>
              </li>
              <li>
                <a href="#."> Advanced Search </a>
              </li>
              <li>
                <a href="#."> Orders and Returns </a>
              </li>
              <li>
                <a href="#."> Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="row">
            {/* <!-- Contact --> */}
            <div className="col-md-4">
              <h4>Contact SmartTech!</h4>
              <p>
                Address: 45 Grand Central Terminal New York, NY 1017 United
                State USA
              </p>
              <p>Phone: (+100) 123 456 7890</p>
              <p>Email: Support@smarttech.com</p>
              <div className="social-links">
                {" "}
                <a href="#.">
                  <i className="fa fa-facebook"></i>
                </a>{" "}
                <a href="#.">
                  <i className="fa fa-twitter"></i>
                </a>{" "}
                <a href="#.">
                  <i className="fa fa-linkedin"></i>
                </a>{" "}
                <a href="#.">
                  <i className="fa fa-pinterest"></i>
                </a>{" "}
                <a href="#.">
                  <i className="fa fa-instagram"></i>
                </a>{" "}
                <a href="#.">
                  <i className="fa fa-google"></i>
                </a>{" "}
              </div>
            </div>

            {/* <!-- Categories --> */}
            <div className="col-md-3">
              <h4>Categories</h4>
              <ul className="links-footer">
                <li>
                  <a href="#.">Home Audio & Theater</a>
                </li>
                <li>
                  <a href="#."> TV & Video</a>
                </li>
                <li>
                  <a href="#."> Camera, Photo & Video</a>
                </li>
                <li>
                  <a href="#."> Cell Phones & Accessories</a>
                </li>
                <li>
                  <a href="#."> Headphones</a>
                </li>
                <li>
                  <a href="#."> Video Games</a>
                </li>
                <li>
                  <a href="#."> Bluetooth & Wireless</a>
                </li>
              </ul>
            </div>

            {/* <!-- Categories --> */}
            <div className="col-md-3">
              <h4>Customer Services</h4>
              <ul className="links-footer">
                <li>
                  <a href="#.">Shipping & Returns</a>
                </li>
                <li>
                  <a href="#."> Secure Shopping</a>
                </li>
                <li>
                  <a href="#."> International Shipping</a>
                </li>
                <li>
                  <a href="#."> Affiliates</a>
                </li>
                <li>
                  <a href="#."> Contact </a>
                </li>
              </ul>
            </div>

            {/* <!-- Categories --> */}
            <div className="col-md-2">
              <h4>Information</h4>
              <ul className="links-footer">
                <li>
                  <a href="#.">Our Blog</a>
                </li>
                <li>
                  <a href="#."> About Our Shop</a>
                </li>
                <li>
                  <a href="#."> Secure Shopping</a>
                </li>
                <li>
                  <a href="#."> Delivery infomation</a>
                </li>
                <li>
                  <a href="#."> Store Locations</a>
                </li>
                <li>
                  <a href="#."> FAQs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* <!-- Rights --> */}
      <div className="rights">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <p>
                Copyright © 2017{" "}
                <a href="#." className="ri-li">
                  {" "}
                  SmartTech{" "}
                </a>
                HTML5 template. All rights reserved
              </p>
            </div>
            <div className="col-sm-6 text-right">
              {" "}
              <img src="images/card-icon.png" alt="" />{" "}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- End Footer --> */}

      {/* <!-- GO TO TOP  -->  */}
      <a href="#" className="cd-top">
        <i className="fa fa-angle-up"></i>
      </a>
      {/* <!-- GO TO TOP End --> */}
    </>
  );
};

export default Footer;
