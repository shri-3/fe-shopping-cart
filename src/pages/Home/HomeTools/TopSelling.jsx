import React, { useEffect } from "react";
import itemImg6 from "../../../assets/template-assets/images/item-img-1-6.jpg";
import itemImg7 from "../../../assets/template-assets/images/item-img-1-7.jpg";
import itemImg8 from "../../../assets/template-assets/images/item-img-1-8.jpg";
import itemImg9 from "../../../assets/template-assets/images/item-img-1-9.jpg";
import itemImg10 from "../../../assets/template-assets/images/item-img-1-10.jpg";
import itemImg11 from "../../../assets/template-assets/images/item-img-1-11.jpg";
import itemImg12 from "../../../assets/template-assets/images/item-img-1-12.jpg";
import itemImg13 from "../../../assets/template-assets/images/item-img-1-13.jpg";

const TopSelling = () => {
  useEffect(() => {
    let intervalId = null;
    let timeoutId = null;
    let isUnmounted = false;

    const destroyCarousel = (selector) => {
      const $ = window.jQuery;
      if (!$ || !$.fn || !$.fn.owlCarousel) return;
      const $carousel = $(selector);
      if (!$carousel.length || !$carousel.hasClass("owl-loaded")) return;
      try {
        $carousel.trigger("destroy.owl.carousel");
        $carousel.removeClass("owl-loaded owl-carousel");
        const $stageOuter = $carousel.find(".owl-stage-outer");
        if ($stageOuter.length) {
          $stageOuter.children().unwrap();
        }
        const $stage = $carousel.find(".owl-stage");
        if ($stage.length) {
          $stage.children().unwrap();
        }
      } catch (error) {
        console.warn(`Failed to destroy ${selector} carousel:`, error);
      }
    };

    const initCarousel = (selector, options) => {
      const $ = window.jQuery;
      if (!$ || !$.fn || !$.fn.owlCarousel) return false;
      destroyCarousel(selector);
      const $carousel = $(selector);
      if (!$carousel.length) return false;
      $carousel.owlCarousel(options);
      return true;
    };

    const initWhenReady = () => {
      if (isUnmounted) return;
      const $ = window.jQuery;
      if (!$ || !$.fn || !$.fn.owlCarousel) {
        return;
      }

      const initialized = initCarousel(".item-col-5", {
        items: 5,
        autoplay: true,
        loop: false,
        margin: 30,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText: [
          "<i class='fa fa-angle-left'></i>",
          "<i class='fa fa-angle-right'></i>",
        ],
        lazyLoad: true,
        nav: true,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 5 },
        },
        animateOut: "fadeOut",
      });

      if (!initialized) {
        if (!intervalId) {
          intervalId = window.setInterval(initWhenReady, 100);
        }
      } else if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    timeoutId = window.setTimeout(initWhenReady, 50);
    intervalId = window.setInterval(initWhenReady, 100);

    return () => {
      isUnmounted = true;
      if (intervalId) {
        window.clearInterval(intervalId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      destroyCarousel(".item-col-5");
    };
  }, []);

  return (
    <>
      <section class="light-gry-bg padding-top-60 padding-bottom-30">
        <div class="container">
          {/* <!-- heading --> */}
          <div class="heading">
            <h2>Top Selling of the Week</h2>
            <hr />
          </div>

          {/* <!-- Items --> */}
          <div class="item-col-5">
            {/* <!-- Product --> */}
            <div class="product col-2x">
              <div class="like-bnr">
                <div class="position-center-center">
                  <h5>Smart Watch 2.0</h5>
                  <p>
                    Space Gray Aluminum Case with Black/Volt Real Sport Band{" "}
                    <span>38mm | 42mm</span>{" "}
                  </p>
                  <a href="#." class="btn-round">
                    View Detail
                  </a>{" "}
                </div>
              </div>
            </div>

            {/* <!-- Product --> */}
            <div class="product">
              <article>
                {" "}
                <img
                  class="img-responsive"
                  src="https://jthemes.net/themes/f-html/smarttech/html/images/item-img-1-6.jpg"
                  alt=""
                />{" "}
                <span class="sale-tag">-25%</span>
                {/* <!-- Content -->  */}
                <span class="tag">Tablets</span>{" "}
                <a href="#." class="tittle">
                  Mp3 Sumergible Deportivo Slim Con 8GB
                </a>
                {/* <!-- Reviews --> */}
                <p class="rev">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
                  <span class="margin-left-10">5 Review(s)</span>
                </p>
                <div class="price">
                  $350.00 <span>$200.00</span>
                </div>
                <a href="#." class="cart-btn">
                  <i class="icon-basket-loaded"></i>
                </a>{" "}
              </article>
            </div>

            {/* <!-- Product --> */}
            <div class="product">
              <article>
                {" "}
                <img
                  class="img-responsive"
                  src="https://jthemes.net/themes/f-html/smarttech/html/images/item-img-1-7.jpg"
                  alt=""
                />
                {/* <!-- Content -->  */}
                <span class="tag">Appliances</span>{" "}
                <a href="#." class="tittle">
                  Reloj Inteligente Smart Watch M26 Touch Bluetooh{" "}
                </a>
                {/* <!-- Reviews --> */}
                <p class="rev">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i> <i class="fa fa-star-o"></i>{" "}
                  <span class="margin-left-10">5 Review(s)</span>
                </p>
                <div class="price">$350.00</div>
                <a href="#." class="cart-btn">
                  <i class="icon-basket-loaded"></i>
                </a>{" "}
              </article>
            </div>

            {/* <!-- Product --> */}
            <div class="product">
              <article>
                {" "}
                <img
                  class="img-responsive"
                  src="https://jthemes.net/themes/f-html/smarttech/html/images/item-img-1-8.jpg"
                  alt=""
                />{" "}
                <span class="new-tag">New</span>
                {/* <!-- Content -->  */}
                <span class="tag">Accessories</span>{" "}
                <a href="#." class="tittle">
                  Teclado Inalambrico Bluetooth Con Air Mouse
                </a>
                {/* <!-- Reviews --> */}
                <p class="rev">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i> <i class="fa fa-star-o"></i>{" "}
                  <span class="margin-left-10">5 Review(s)</span>
                </p>
                <div class="price">$350.00</div>
                <a href="#." class="cart-btn">
                  <i class="icon-basket-loaded"></i>
                </a>{" "}
              </article>
            </div>

            {/* <!-- Product --> */}
            <div class="product">
              <article>
                {" "}
                <img
                  class="img-responsive"
                  src="https://jthemes.net/themes/f-html/smarttech/html/images/item-img-1-9.jpg"
                  alt=""
                />
                {/* <!-- Content -->  */}
                <span class="tag">Appliances</span>{" "}
                <a href="#." class="tittle">
                  Funda Para Ebook 7" 128GB full HD
                </a>
                {/* <!-- Reviews --> */}
                <p class="rev">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i> <i class="fa fa-star-o"></i>{" "}
                  <span class="margin-left-10">5 Review(s)</span>
                </p>
                <div class="price">$350.00</div>
                <a href="#." class="cart-btn">
                  <i class="icon-basket-loaded"></i>
                </a>{" "}
              </article>
            </div>

            {/* <!-- Product --> */}
            <div class="product">
              <article>
                {" "}
                <img
                  class="img-responsive"
                  src="https://jthemes.net/themes/f-html/smarttech/html/images/item-img-1-10.jpg"
                  alt=""
                />
                {/* <!-- Content -->  */}
                <span class="tag">Appliances</span>{" "}
                <a href="#." class="tittle">
                  Reloj Inteligente Smart Watch M26 Touch Bluetooh{" "}
                </a>
                {/* <!-- Reviews --> */}
                <p class="rev">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i> <i class="fa fa-star-o"></i>{" "}
                  <span class="margin-left-10">5 Review(s)</span>
                </p>
                <div class="price">$350.00</div>
                <a href="#." class="cart-btn">
                  <i class="icon-basket-loaded"></i>
                </a>{" "}
              </article>
            </div>

            {/* <!-- Product --> */}
            <div class="product">
              <article>
                {" "}
                <img
                  class="img-responsive"
                  src="https://jthemes.net/themes/f-html/smarttech/html/images/item-img-1-11.jpg"
                  alt=""
                />{" "}
                <span class="new-tag">New</span>
                {/* <!-- Content -->  */}
                <span class="tag">Accessories</span>{" "}
                <a href="#." class="tittle">
                  Teclado Inalambrico Bluetooth Con Air Mouse
                </a>
                {/* <!-- Reviews --> */}
                <p class="rev">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
                  <span class="margin-left-10">5 Review(s)</span>
                </p>
                <div class="price">$350.00</div>
                <a href="#." class="cart-btn">
                  <i class="icon-basket-loaded"></i>
                </a>{" "}
              </article>
            </div>

            {/* <!-- Product --> */}
            <div class="product">
              <article>
                {" "}
                <img
                  class="img-responsive"
                  src="https://jthemes.net/themes/f-html/smarttech/html/images/item-img-1-12.jpg"
                  alt=""
                />
                {/* <!-- Content -->  */}
                <span class="tag">Appliances</span>{" "}
                <a href="#." class="tittle">
                  Funda Para Ebook 7" 128GB full HD
                </a>
                {/* <!-- Reviews --> */}
                <p class="rev">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
                  <span class="margin-left-10">5 Review(s)</span>
                </p>
                <div class="price">$350.00</div>
                <a href="#." class="cart-btn">
                  <i class="icon-basket-loaded"></i>
                </a>{" "}
              </article>
            </div>

            {/* <!-- Product --> */}
            <div class="product">
              <article>
                {" "}
                <img
                  class="img-responsive"
                  src="https://jthemes.net/themes/f-html/smarttech/html/images/item-img-1-13.jpg"
                  alt=""
                />
                {/* <!-- Content -->  */}
                <span class="tag">Appliances</span>{" "}
                <a href="#." class="tittle">
                  Reloj Inteligente Smart Watch M26 Touch Bluetooh{" "}
                </a>
                {/* <!-- Reviews --> */}
                <p class="rev">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i> <i class="fa fa-star"></i>{" "}
                  <span class="margin-left-10">5 Review(s)</span>
                </p>
                <div class="price">$350.00</div>
                <a href="#." class="cart-btn">
                  <i class="icon-basket-loaded"></i>
                </a>{" "}
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopSelling;
