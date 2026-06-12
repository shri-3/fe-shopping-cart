import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router";
import { BE_BASE_URL } from "../../../api/apiService";

const FeaturProduct = ({ message }) => {
  const { data, loading } = useFetch(`${BE_BASE_URL}/feature-products`);

  if (loading) return null;

  return (
    <section className="featur-tabs padding-top-60 padding-bottom-60">
      <div className="container">
        <ul className="nav nav-tabs nav-pills margin-bottom-40" role="tablist">
          <li role="presentation" className="active">
            <a
              href="#featur"
              aria-controls="featur"
              role="tab"
              data-toggle="tab"
            >
              {message || "Featured"}
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div role="tabpanel" className="tab-pane active fade in" id="featur">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={false}
              autoplay={{ delay: 5000, disableOnInteraction: true }}
              breakpoints={{
                600: { slidesPerView: 2 },
                1000: { slidesPerView: 4 },
                1200: { slidesPerView: 5 },
              }}
              className="item-slide-5 with-nav"
            >
              {data?.map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="product">
                    <article>
                      <img
                        className="img-responsive"
                        src={product.productId.imageUrl}
                        alt={product.productId.name}
                      />
                      <span className="tag">Latop</span>
                      <Link to={`/product`} className="tittle">
                        {product.productId.name}
                      </Link>
                      <p className="rev">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                        <span className="margin-left-10">5 Review(s)</span>
                      </p>
                      <div className="price">${product.productId.price}.00</div>
                      <a href="#." className="cart-btn">
                        <i className="icon-basket-loaded"></i>
                      </a>
                    </article>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturProduct;
