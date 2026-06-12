import React, { useEffect, useRef } from "react";
import slider1 from "../../../assets/template-assets/images/slider-img-1.jpg";
import slider2 from "../../../assets/template-assets/images/slider-img-2.jpg";
import slider3 from "../../../assets/template-assets/images/slider-img-3.jpg";

const Slider = () => {
  const sliderRef = useRef(null);
  const isInitializedRef = useRef(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    let timeoutId;

    // Initialize Revolution Slider after component mounts and images load
    const initSlider = () => {
      if (isInitializedRef.current || !isMountedRef.current) return; // Prevent multiple initializations or if unmounted

      const sliderElement = sliderRef.current;
      if (!sliderElement) return; // Element no longer exists

      if (window.jQuery && window.jQuery.fn.revolution) {
        const $slider = window.jQuery(sliderElement);

        // Destroy any existing slider first
        if ($slider.hasClass("revslider-initialised")) {
          try {
            $slider.revkill();
          } catch (e) {
            console.warn("Error destroying slider:", e);
          }
        }

        // Add unique ID if not present
        if (!$slider.attr("id")) {
          $slider.attr("id", `tp-banner-${Date.now()}`);
        }

        // Initialize new slider
        try {
          $slider.revolution({
            sliderType: "standard",
            sliderLayout: "auto",
            delay: 9000,
            minHeight: 500,
            gridwidth: 0,
            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "preview4",
            gridheight: 500,
          });
          isInitializedRef.current = true;
        } catch (e) {
          console.error("Error initializing Revolution Slider:", e);
        }
      }
    };

    // Wait for images to load
    const checkImagesAndInit = () => {
      if (!isMountedRef.current) return;

      const sliderElement = sliderRef.current;
      if (!sliderElement) return;

      const images = sliderElement.querySelectorAll("img");
      let loadedCount = 0;
      const totalImages = images.length;

      if (totalImages === 0) {
        // Small delay to ensure DOM is ready
        timeoutId = setTimeout(initSlider, 100);
      } else {
        const checkComplete = () => {
          if (!isMountedRef.current) return;
          loadedCount = Array.from(images).filter((img) => img.complete).length;
          if (loadedCount === totalImages) {
            initSlider();
          }
        };

        // Check initially
        checkComplete();

        // Set up listeners for remaining images
        images.forEach((img) => {
          if (!img.complete) {
            img.addEventListener("load", checkComplete);
            img.addEventListener("error", checkComplete);
          }
        });
      }
    };

    checkImagesAndInit();

    // Cleanup function to destroy slider when component unmounts
    return () => {
      isMountedRef.current = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const sliderElement = sliderRef.current;
      if (sliderElement && window.jQuery && window.jQuery.fn.revolution) {
        const $slider = window.jQuery(sliderElement);
        if ($slider.hasClass("revslider-initialised")) {
          try {
            $slider.revkill();
          } catch (e) {
            console.warn("Error destroying slider on cleanup:", e);
          }
        }
      }
      isInitializedRef.current = false;
    };
  }, []);

  return (
    <>
      <section class="slid-sec">
        <div class="container">
          <div class="container-fluid">
            <div class="row">
              {/* <!-- Main Slider  --> */}
              <div class="col-md-9 no-padding">
                {/* <!-- Main Slider Start --> */}
                <div
                  class="tp-banner-container"
                  style={{ width: "100%", height: "500px" }}
                >
                  <div class="tp-banner" ref={sliderRef}>
                    <ul>
                      {/* <!-- SLIDE  --> */}
                      <li
                        data-transition="random"
                        data-slotamount="7"
                        data-masterspeed="300"
                        data-saveperformance="off"
                      >
                        {/* <!-- MAIN IMAGE --> */}
                        <img
                          src="https://jthemes.net/themes/f-html/smarttech/html/images/slider-img-1.jpg"
                          alt="slider"
                          data-bgposition="center bottom"
                          data-bgfit="cover"
                          data-bgrepeat="no-repeat"
                        />

                        {/* <!-- LAYER NR. 1 --> */}
                        <div
                          class="tp-caption sfl tp-resizeme"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="-110"
                          data-speed="800"
                          data-start="800"
                          data-easing="Power3.easeInOut"
                          data-splitin="chars"
                          data-splitout="none"
                          data-elementdelay="0.03"
                          data-endelementdelay="0.4"
                          data-endspeed="300"
                          style={{
                            zIndex: 5,
                            fontSize: "30px",
                            fontWeight: 500,
                            color: "#888888",
                            maxWidth: "auto",
                            maxHeight: "auto",
                            whiteSpace: "nowrap",
                          }}
                        >
                          High Quality VR Glasses{" "}
                        </div>

                        {/* <!-- LAYER NR. 2 --> */}
                        <div
                          class="tp-caption sfr tp-resizeme"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="-60"
                          data-speed="800"
                          data-start="1000"
                          data-easing="Power3.easeInOut"
                          data-splitin="chars"
                          data-splitout="none"
                          data-elementdelay="0.03"
                          data-endelementdelay="0.1"
                          data-endspeed="300"
                          style={{
                            zIndex: 6,
                            fontSize: "50px",
                            color: "#0088cc",
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                          }}
                        >
                          3D Daydream View{" "}
                        </div>

                        {/* <!-- LAYER NR. 3 --> */}
                        <div
                          class="tp-caption sfl tp-resizeme"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="10"
                          data-speed="800"
                          data-start="1200"
                          data-easing="Power3.easeInOut"
                          data-splitin="none"
                          data-splitout="none"
                          data-elementdelay="0.1"
                          data-endelementdelay="0.1"
                          data-endspeed="300"
                          style={{
                            zIndex: 7,
                            fontSize: "24px",
                            color: "#888888",
                            fontWeight: 500,
                            maxWidth: "auto",
                            maxHeight: "auto",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Starting at{" "}
                        </div>

                        {/* <!-- LAYER NR. 1 --> */}
                        <div
                          class="tp-caption sfr tp-resizeme"
                          data-x="left"
                          data-hoffset="210"
                          data-y="center"
                          data-voffset="5"
                          data-speed="800"
                          data-start="1300"
                          data-easing="Power3.easeInOut"
                          data-splitin="chars"
                          data-splitout="none"
                          data-elementdelay="0.03"
                          data-endelementdelay="0.4"
                          data-endspeed="300"
                          style={{
                            zIndex: 5,
                            fontSize: "36px",
                            fontWeight: 800,
                            color: "#000",
                            maxWidth: "auto",
                            maxHeight: "auto",
                            whiteSpace: "nowrap",
                          }}
                        >
                          $49.99{" "}
                        </div>

                        {/* <!-- LAYER NR. 4 --> */}
                        <div
                          class="tp-caption lfb tp-resizeme scroll"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="80"
                          data-speed="800"
                          data-start="1300"
                          data-easing="Power3.easeInOut"
                          data-elementdelay="0.1"
                          data-endelementdelay="0.1"
                          data-endspeed="300"
                          data-scrolloffset="0"
                          style={{ zIndex: 8 }}
                        >
                          <a href="#." class="btn-round big">
                            Shop Now
                          </a>{" "}
                        </div>
                      </li>

                      {/* <!-- SLIDE  --> */}
                      <li
                        data-transition="random"
                        data-slotamount="7"
                        data-masterspeed="300"
                        data-saveperformance="off"
                      >
                        {/* <!-- MAIN IMAGE --> */}
                        <img
                          src="https://jthemes.net/themes/f-html/smarttech/html/images/slider-img-2.jpg"
                          alt="slider"
                          data-bgposition="center bottom"
                          data-bgfit="cover"
                          data-bgrepeat="no-repeat"
                        />

                        {/* <!-- LAYER NR. 1 --> */}
                        <div
                          class="tp-caption sfl tp-resizeme"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="-110"
                          data-speed="800"
                          data-start="800"
                          data-easing="Power3.easeInOut"
                          data-splitin="chars"
                          data-splitout="none"
                          data-elementdelay="0.03"
                          data-endelementdelay="0.4"
                          data-endspeed="300"
                          style={{
                            zIndex: 5,
                            fontSize: "30px",
                            fontWeight: 500,
                            color: "#888888",
                            maxWidth: "auto",
                            maxHeight: "auto",
                            whiteSpace: "nowrap",
                          }}
                        >
                          No restocking fee ($35 savings)
                        </div>

                        {/* <!-- LAYER NR. 2 --> */}
                        <div
                          class="tp-caption sfr tp-resizeme"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="-60"
                          data-speed="800"
                          data-start="1000"
                          data-easing="Power3.easeInOut"
                          data-splitin="chars"
                          data-splitout="none"
                          data-elementdelay="0.03"
                          data-endelementdelay="0.1"
                          data-endspeed="300"
                          style={{
                            zIndex: 6,
                            fontSize: "50px",
                            color: "#0088cc",
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                          }}
                        >
                          M75 Sport Watch{" "}
                        </div>

                        {/* <!-- LAYER NR. 3 --> */}
                        <div
                          class="tp-caption sfl tp-resizeme"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="10"
                          data-speed="800"
                          data-start="1200"
                          data-easing="Power3.easeInOut"
                          data-splitin="none"
                          data-splitout="none"
                          data-elementdelay="0.1"
                          data-endelementdelay="0.1"
                          data-endspeed="300"
                          style={{
                            zIndex: 7,
                            fontSize: "24px",
                            color: "#888888",
                            fontWeight: 500,
                            maxWidth: "auto",
                            maxHeight: "auto",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Now Only{" "}
                        </div>

                        {/* <!-- LAYER NR. 1 --> */}
                        <div
                          class="tp-caption sfr tp-resizeme"
                          data-x="left"
                          data-hoffset="210"
                          data-y="center"
                          data-voffset="5"
                          data-speed="800"
                          data-start="1300"
                          data-easing="Power3.easeInOut"
                          data-splitin="chars"
                          data-splitout="none"
                          data-elementdelay="0.03"
                          data-endelementdelay="0.4"
                          data-endspeed="300"
                          style={{
                            zIndex: 5,
                            fontSize: "36px",
                            fontWeight: 800,
                            color: "#000",
                            maxWidth: "auto",
                            maxHeight: "auto",
                            whiteSpace: "nowrap",
                          }}
                        >
                          $320.99{" "}
                        </div>

                        {/* <!-- LAYER NR. 4 --> */}
                        <div
                          class="tp-caption lfb tp-resizeme scroll"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="80"
                          data-speed="800"
                          data-start="1300"
                          data-easing="Power3.easeInOut"
                          data-elementdelay="0.1"
                          data-endelementdelay="0.1"
                          data-endspeed="300"
                          data-scrolloffset="0"
                          style={{ zIndex: 8 }}
                        >
                          <a href="#." class="btn-round big">
                            Shop Now
                          </a>{" "}
                        </div>
                      </li>

                      {/* <!-- SLIDE  --> */}
                      <li
                        data-transition="random"
                        data-slotamount="7"
                        data-masterspeed="300"
                        data-saveperformance="off"
                      >
                        {/* <!-- MAIN IMAGE --> */}
                        <img
                          src="https://jthemes.net/themes/f-html/smarttech/html/images/slider-img-3.jpg"
                          alt="slider"
                          data-bgposition="center bottom"
                          data-bgfit="cover"
                          data-bgrepeat="no-repeat"
                        />

                        {/* <!-- LAYER NR. 1 --> */}
                        <div
                          class="tp-caption sfl tp-resizeme"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="-110"
                          data-speed="800"
                          data-start="800"
                          data-easing="Power3.easeInOut"
                          data-splitin="chars"
                          data-splitout="none"
                          data-elementdelay="0.03"
                          data-endelementdelay="0.4"
                          data-endspeed="300"
                          style={{
                            zIndex: 5,
                            fontSize: "30px",
                            fontWeight: 500,
                            color: "#888888",
                            maxWidth: "auto",
                            maxHeight: "auto",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Get Free Bluetooth when buy{" "}
                        </div>

                        {/* <!-- LAYER NR. 2 --> */}
                        <div
                          class="tp-caption sfr tp-resizeme"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="-60"
                          data-speed="800"
                          data-start="1000"
                          data-easing="Power3.easeInOut"
                          data-splitin="chars"
                          data-splitout="none"
                          data-elementdelay="0.03"
                          data-endelementdelay="0.1"
                          data-endspeed="300"
                          style={{
                            zIndex: 6,
                            fontSize: "50px",
                            color: "#0088cc",
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Flat SmartWatch{" "}
                        </div>

                        {/* <!-- LAYER NR. 3 --> */}
                        <div
                          class="tp-caption sfl tp-resizeme"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="0"
                          data-speed="800"
                          data-start="1200"
                          data-easing="Power3.easeInOut"
                          data-splitin="none"
                          data-splitout="none"
                          data-elementdelay="0.1"
                          data-endelementdelay="0.1"
                          data-endspeed="300"
                          style={{
                            zIndex: 7,
                            fontSize: "24px",
                            color: "#888888",
                            fontWeight: 500,
                            maxWidth: "auto",
                            maxHeight: "auto",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Combo Only:
                        </div>

                        {/* <!-- LAYER NR. 1 --> */}
                        <div
                          class="tp-caption sfr tp-resizeme"
                          data-x="left"
                          data-hoffset="240"
                          data-y="center"
                          data-voffset=" -5"
                          data-speed="800"
                          data-start="1300"
                          data-easing="Power3.easeInOut"
                          data-splitin="chars"
                          data-splitout="none"
                          data-elementdelay="0.03"
                          data-endelementdelay="0.4"
                          data-endspeed="300"
                          style={{
                            zIndex: 5,
                            fontSize: "36px",
                            fontWeight: 800,
                            color: "#000",
                            maxWidth: "auto",
                            maxHeight: "auto",
                            whiteSpace: "nowrap",
                          }}
                        >
                          $590.00{" "}
                        </div>

                        {/* <!-- LAYER NR. 4 --> */}
                        <div
                          class="tp-caption lfb tp-resizeme scroll"
                          data-x="left"
                          data-hoffset="60"
                          data-y="center"
                          data-voffset="80"
                          data-speed="800"
                          data-start="1300"
                          data-easing="Power3.easeInOut"
                          data-elementdelay="0.1"
                          data-endelementdelay="0.1"
                          data-endspeed="300"
                          data-scrolloffset="0"
                          style={{ zIndex: 8 }}
                        >
                          <a href="#." class="btn-round big">
                            Shop Now
                          </a>{" "}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- Main Slider  --> */}
              <div class="col-md-3 no-padding">
                {/* <!-- New line required  --> */}
                <div class="product">
                  <div class="like-bnr">
                    <div class="position-center-center">
                      <h5>New line required</h5>
                      <h4>Smartphone s7</h4>
                      <span class="price">$259.99</span>{" "}
                    </div>
                  </div>
                </div>

                {/* <!-- Weekly Slaes  --> */}
                <div class="week-sale-bnr">
                  <h4>
                    Weekly <span>Sale!</span>
                  </h4>
                  <p>Saving up to 50% off all online store items this week.</p>
                  <a href="#." class="btn-round">
                    Shop now
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slider;
