import React from "react";

const ProductShortList = () => {
  return (
    <div className="short-lst">
      <h2>Cell Phones & Accessories</h2>
      <ul>
        <li>
          <p>Showing 1–12 of 756 results</p>
        </li>

        <li>
          <select className="selectpicker">
            <option>Show 12 </option>
            <option>Show 24 </option>
            <option>Show 32 </option>
          </select>
        </li>

        <li>
          <select className="selectpicker">
            <option>Sort by Default </option>
            <option>Low to High </option>
            <option>High to Low </option>
          </select>
        </li>

        <li className="grid-layer">
          {" "}
          <a href="#.">
            <i className="fa fa-list margin-right-10"></i>
          </a>{" "}
          <a href="#." className="active">
            <i className="fa fa-th"></i>
          </a>{" "}
        </li>
        <li>
          <select className="selectpicker">
            <option>4 Columns </option>
            <option>3 Columns </option>
            <option>5 Columns</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default ProductShortList;
