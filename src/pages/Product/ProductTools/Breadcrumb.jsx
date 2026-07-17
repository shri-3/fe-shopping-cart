import React from "react";

const Breadcrumb = () => {
  return (
    <div className="linking">
      <div className="container">
        <ol className="breadcrumb">
          <li>
            <a href="#">Home</a>
          </li>
          <li className="active">All Products</li>
        </ol>
      </div>
    </div>
  );
};

export default Breadcrumb;
