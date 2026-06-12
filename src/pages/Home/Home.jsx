import React from "react";
import Slider from "./HomeTools/Slider";
import ShippingInfo from "./HomeTools/ShippingInfo";
import FeaturProduct from "./HomeTools/FeaturProduct";
import TopSelling from "./HomeTools/TopSelling";

function Home() {
  return (
    <>
      <Slider />
      <div id="content">
        <ShippingInfo />
        <FeaturProduct />
        {/* <TopSelling /> */}
      </div>
    </>
  );
}

export default Home;
