import React from "react";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="container">
        <p>Welcome to SmartTech center!</p>
        <div className="right-sec">
          <ul>
            <li>
              <a href="#.">Login/Register </a>
            </li>
            <li>
              <a href="#.">Store Location </a>
            </li>
            <li>
              <a href="#.">FAQ </a>
            </li>
            <li>
              <a href="#.">Newsletter </a>
            </li>
            <li>
              <select className="selectpicker">
                <option>French</option>
                <option>German</option>
                <option>Italian</option>
                <option>Japanese</option>
              </select>
            </li>
            <li>
              <select className="selectpicker">
                <option>(USD)Dollar</option>
                <option>GBP</option>
                <option>Euro</option>
                <option>JPY</option>
              </select>
            </li>
          </ul>
          <div className="social-top">
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
              <i className="fa fa-dribbble"></i>
            </a>{" "}
            <a href="#.">
              <i className="fa fa-pinterest"></i>
            </a>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
