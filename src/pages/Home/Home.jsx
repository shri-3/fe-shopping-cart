import React from "react";
import Slider from "./HomeTools/Slider";
import ShippingInfo from "./HomeTools/ShippingInfo";
import FeaturProduct from "./HomeTools/FeaturProduct";
import TopSelling from "./HomeTools/TopSelling";
import FeatureCategory from "./HomeTools/FeaturCategory";

function Home() {
  return (
    <>
      <Slider />
      <div id="content">
        <ShippingInfo />
        <FeatureCategory />
        <FeaturProduct />
        {/* <TopSelling /> */}
      </div>
    </>
  );
}

export default Home;
