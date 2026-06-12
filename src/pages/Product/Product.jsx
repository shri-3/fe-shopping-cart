import React from "react";
import ProductSideBar from "./ProductTools/ProductSideBar";
import ProductList from "./ProductTools/ProductList";
import Breadcrumb from "./ProductTools/Breadcrumb";

const Product = () => {
  return (
    <>
      <Breadcrumb />
      <div id="content">
        {/* ### Products */}
        <section className="padding-top-40 padding-bottom-60">
          <div className="container">
            <div className="row">
              {/* ### Product Side Bar */}
              <ProductSideBar />

              {/* ### Product List */}
              <ProductList />
            </div>
            ;
          </div>
        </section>
      </div>
    </>
  );
};

export default Product;
