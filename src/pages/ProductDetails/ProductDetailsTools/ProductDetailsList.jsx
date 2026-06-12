import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../../../hooks/useFetch";
import FeaturProduct from "../../Home/HomeTools/FeaturProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cart-product";
import { BE_BASE_URL } from "../../../api/apiService";

const ProductDetailsList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // API base URL for fetching product details
  const baseURL = `${BE_BASE_URL}/products/${id}`;
  const { data, loading, error, refetch } = useFetch(baseURL);

  // Local state for product details and quantity
  const [product, setProduct] = useState(null);
  const [productQnt, setProductQnt] = useState(1);
  const moreItems = "More items you may like";

  // Wishlist handler
  const handelAddWishlist = (id) => {
    // Add wishlist API call here
    const proId = { productId: id };
    fetch(`${BE_BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proId),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Added to wishlist:", data);
      })
      .catch((error) => {
        console.error("Error adding to wishlist:", error);
      });
  };

  // Initialize product when API data arrives
  useEffect(() => {
    if (data) {
      // initialize product with API data
      setProduct({ ...data, quantity: productQnt });
    }
  }, [data]);

  // Quantity handlers
  const handelIncrementQnt = () => {
    const newQuantity = productQnt + 1;
    setProductQnt(newQuantity);

    // update product state with new quantity
    setProduct((prev) => ({
      ...prev,
      quantity: newQuantity,
    }));
  };

  const handelDecrementQnt = () => {
    if (productQnt > 1) {
      const newQuantity = productQnt - 1;
      setProductQnt(newQuantity);

      // update product state with new quantity
      setProduct((prev) => ({
        ...prev,
        quantity: newQuantity,
      }));
    }
  };

  return (
    <>
      <div className="col-md-9">
        <div className="product-detail">
          <div className="product">
            <div className="row">
              {/* <!-- Slider Thumb --> */}
              <div className="col-xs-5">
                <article className="slider-item on-nav">
                  <div className="thumb-slider">
                    <ul className="slides">
                      <li data-thumb={product?.imageUrl}>
                        {" "}
                        <img src={product?.imageUrl} alt="" />{" "}
                      </li>
                    </ul>
                  </div>
                </article>
              </div>
              {/* <!-- Item Content --> */}
              <div className="col-xs-7">
                {" "}
                <span className="tags">Smartphones</span>
                <h5>{product?.name}</h5>
                <p className="rev">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>{" "}
                  <i className="fa fa-star-o"></i>{" "}
                  <span className="margin-left-10">5 Review(s)</span>
                </p>
                <div className="row">
                  <div className="col-sm-6">
                    <span className="price">${product?.price?.toFixed(2)}</span>
                  </div>
                  <div className="col-sm-6">
                    <p>
                      Availability: <span className="in-stock">In stock</span>
                    </p>
                  </div>
                </div>
                {/* <!-- List Details --> */}
                <ul className="bullet-round-list">
                  <li>Screen: 1920 x 1080 pixels</li>
                  <li>Processor: 2.5 GHz None</li>
                  <li>RAM: 8 GB</li>
                  <li>Hard Drive: Flash memory solid state</li>
                  <li>Graphics : Intel HD Graphics 520 Integrated</li>
                  <li>Card Description: Integrated</li>
                </ul>
                {/* <!-- Colors --> */}
                <div className="row">
                  <div className="col-xs-5">
                    <div className="clr">
                      {" "}
                      {/* <span style="background:#068bcd"></span>{" "}
                      <span style="background:#d4b174"></span>{" "}
                      <span style="background:#333333"></span>{" "} */}
                    </div>
                  </div>
                </div>
                {/* <!-- Compare Wishlist --> */}
                <ul className="cmp-list">
                  <li>
                    <a onClick={() => handelAddWishlist(product._id)}>
                      <i className="fa fa-heart"></i> Add to Wishlist
                    </a>
                  </li>
                  <li>
                    <a href="#.">
                      {/* <i className="fa fa-navicon"></i> Add to Compare */}
                    </a>
                  </li>
                </ul>
                {/* <!-- Quinty --> */}
                <div className="shopping-cart quinty">
                  <div className="qty-control">
                    <button
                      className="btn-round btn-light"
                      onClick={handelDecrementQnt}
                    >
                      -
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      className="btn-round btn-light"
                      onClick={handelIncrementQnt}
                    >
                      +
                    </button>
                  </div>
                </div>
                <a
                  className="btn-round"
                  onClick={() => dispatch(addToCart(product))}
                >
                  <i className="icon-basket-loaded margin-right-5"></i> Add to
                  Cart
                </a>{" "}
              </div>
            </div>
          </div>

          {/* <!-- Details Tab Section--> */}
          <div className="item-tabs-sec">
            {/* <!-- Nav tabs --> */}
            <ul className="nav" role="tablist">
              <li role="presentation" className="active">
                <a href="#pro-detil" role="tab" data-toggle="tab">
                  Product Details
                </a>
              </li>
              {/* <li role="presentation">
                <a href="#cus-rev" role="tab" data-toggle="tab">
                  Customer Reviews
                </a>
              </li>
              <li role="presentation">
                <a href="#ship" role="tab" data-toggle="tab">
                  Shipping & Payment
                </a>
              </li> */}
            </ul>

            {/* <!-- Tab panes --> */}
            <div className="tab-content">
              <div
                role="tabpanel"
                className="tab-pane fade in active"
                id="pro-detil"
              >
                {/* <!-- List Details --> */}
                <ul className="bullet-round-list">
                  <li>{product?.name}</li>
                  <li>{product?.description}</li>
                </ul>
                {/* <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Carrier</th>
                        <th>Compatibility Rating </th>
                        <th>Voice / Text </th>
                        <th>Voice / Text </th>
                        <th>2G Data </th>
                        <th>3G Data </th>
                        <th>4G LTE Data </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>AT&T </td>
                        <td>Fully Compatible</td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center"></td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center"></td>
                      </tr>
                      <tr>
                        <td>Sprint </td>
                        <td>No Voice/Text and Partial Data Connection</td>
                        <td className="text-center"></td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>Q-Mobile </td>
                        <td>Partial Data Connection</td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center"></td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                      </tr>
                      <tr>
                        <td>Verizon Wireless </td>
                        <td>No Votice/Text and Partial Data Connection</td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center"></td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                        <td className="text-center">
                          <i className="fa fa-check"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
              </div>
              <div role="tabpanel" className="tab-pane fade" id="cus-rev"></div>
              <div role="tabpanel" className="tab-pane fade" id="ship"></div>
            </div>
          </div>
        </div>

        {/* ##Related Products  */}
        <section className="padding-top-30 padding-bottom-0">
          {/* heading */}
          <FeaturProduct message={moreItems} />
        </section>
      </div>
    </>
  );
};

export default ProductDetailsList;
