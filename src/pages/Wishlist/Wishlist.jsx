import React from "react";
import WishlistProduct from "./WishlistTools/WishlistProduct";

const Wishlist = () => {
  return (
    <>
      <div id="content">
        {/* ### Products */}
        <section className="padding-top-40 padding-bottom-60">
          <div className="container">
            <div className="row">
              {/* ### Product Side Bar */}
              {/* <ProductSideBar /> */}

              {/* ### Product List */}
              <WishlistProduct />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Wishlist;
