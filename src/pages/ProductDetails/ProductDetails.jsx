import React from "react";
import ProductSideBar from "../Product/ProductTools/ProductSideBar";
import Breadcrumb from "../Product/ProductTools/Breadcrumb";
import ProductDetailsList from "./ProductDetailsTools/ProductDetailsList";

const ProductDetails = () => {
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
              <ProductDetailsList />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductDetails;
