import React, { useEffect, useState } from "react";
import "./ShoppingCart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  removeFromCart,
  clearCart,
  selectCartSubtotal,
  selectCartProducts,
  removeWishlistForCart,
} from "../../redux/slices/cart-product";
import { Link, useNavigate } from "react-router";
import OrderSuccess from "./OrderSuccess";
import Checkout from "./Checkout";
import { BE_BASE_URL } from "../../api/apiService";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";

const ShoppingCart = () => {
  const cartProducts = useSelector(selectCartProducts);
  const dispatch = useDispatch();
  const totalSum = useSelector(selectCartSubtotal);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState("cart"); // cart, checkout, or success

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setCurrentPage("checkout");
  };

  const handleOrderPlaced = () => {
    setCurrentPage("success");
  };

  // Fetch user profile data for default address
  const { data } = useFetch(`${BE_BASE_URL}/profile/6a5a18ddc6c2af9485a629b0`);
  const filteredAddresses = data?.data?.address?.filter(
    (addr) => addr._id == data?.data?.primaryAddress,
  );
  const DeliverdAddress = filteredAddresses?.[0];

  // Wishlist handler
  const handelAddWishlist = async (proData) => {
    console.log(proData);
    // Add wishlist API call here
    const proId = { productId: proData._id };
    fetch(`${BE_BASE_URL}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proId),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errData = await response.json();
          //  Throwing just the message string makes it cleaner to catch
          throw new Error(errData.error || "Failed to add item to wishlist");
        }
        // CRUCIAL: You must keep this return for successful responses!
        return response.json();
      })
      .then((data) => {
        toast.success("Added to wishlist");
        dispatch(removeWishlistForCart(proData));
      })
      .catch((err) => {
        // FIX: Use err.message to get just the text string without "Error:"
        toast.error(err.message);
      });
  };

  return (
    <div id="content">
      {currentPage === "cart" && (
        <>
          {/* Ship Process  */}
          <div className="ship-process padding-top-30 padding-bottom-30">
            <div className="container">
              <ul className="row">
                <li className="col-sm-3 current">
                  <div className="media-left">
                    <i className="flaticon-shopping"></i>
                  </div>
                  <div className="media-body">
                    <span></span>
                    <h6>Shopping Cart</h6>
                  </div>
                </li>
                <li className="col-sm-3 ">
                  <div className="media-left">
                    <i className="fa fa-map"></i>
                  </div>
                  <div className="media-body">
                    <span></span>
                    <h6>Checkout</h6>
                  </div>
                </li>
                <li className="col-sm-3">
                  <div className="media-left">
                    <i className="flaticon-delivery-truck-1"></i>
                  </div>
                  <div className="media-body">
                    <span></span>
                    <h6>Order Success</h6>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Shopping Cart */}
          <section className="checkout-section shopping-cart padding-top-30 padding-bottom-60">
            <div className="container">
              <div className="shopping-cart-wrapper">
                {/* Left Side - Cart Items */}
                <div className="cart-items-section">
                  <h3>Shopping Cart ({cartProducts.length} Items)</h3>

                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>PRODUCT DETAILS</th>
                        <th className="text-center">QUANTITY</th>
                        <th className="text-center">PRICE</th>
                        <th className="text-center">TOTAL</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Item Cart */}
                      {cartProducts?.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <div className="product-item">
                              <img src={product.imageUrl} alt={product.name} />
                              <div className="product-info">
                                <p>{product.name}</p>
                                <small>Product ID: {product._id}</small>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="qty-control">
                              <button
                                onClick={() =>
                                  dispatch(decrement({ _id: product._id }))
                                }
                              >
                                −
                              </button>
                              <span>{product.quantity}</span>
                              <button
                                onClick={() =>
                                  dispatch(increment({ _id: product._id }))
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="text-center price-text">
                            ${product.price?.toFixed(2)}
                          </td>
                          <td className="text-center price-text">
                            ${(product.price * product.quantity).toFixed(2)}
                          </td>
                          <td className="text-center">
                            <a
                              className="remove-btn"
                              onClick={() => handelAddWishlist(product)}
                            >
                              <i className="fa fa-heart"></i>
                            </a>
                          </td>
                          <td className="text-center">
                            <a
                              className="remove-btn"
                              onClick={() => dispatch(removeFromCart(product))}
                            >
                              <i className="fa fa-close"></i>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="continue-shopping">
                    <Link to="/product">
                      <i className="fa fa-angle-left"></i> Continue Shopping
                    </Link>
                  </div>
                </div>

                {/* Right Side - Order Summary */}
                <div className="order-summary-section">
                  {/* Summary Card */}
                  <div className="summary-card">
                    <h4>ORDER SUMMARY</h4>

                    <div className="summary-row">
                      <span>Items:</span>
                      <strong>{cartProducts.length}</strong>
                    </div>

                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <strong>${totalSum.toFixed(2)}</strong>
                    </div>

                    <div className="summary-row">
                      <span>Shipping:</span>
                      <strong>Standard Delivery - $5.00</strong>
                    </div>

                    <div className="summary-row total">
                      <span>TOTAL COST</span>
                      <span>${(totalSum + 5).toFixed(2)}</span>
                    </div>

                    {/* Promo Code */}
                    {/* <div
                      style={{
                        marginTop: "20px",
                        paddingTop: "15px",
                        borderTop: "1px solid #f0f0f0",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "12px",
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: "600",
                        }}
                      >
                        PROMO CODE
                      </label>
                      <div className="promo-section">
                        <input type="text" placeholder="Enter your code" />
                        <button type="submit">APPLY</button>
                      </div>
                    </div> */}

                    {/* Checkout Button */}
                    <button
                      className="checkout-btn"
                      style={{ marginTop: "20px" }}
                      disabled={cartProducts.length === 0}
                      onClick={handleCheckout}
                    >
                      CHECKOUT
                    </button>
                  </div>

                  {/* Delivery Address Card */}
                  <div className="summary-card">
                    <h4>DELIVERY ADDRESS</h4>

                    <div className="address-card">
                      <h5>{DeliverdAddress?.name || "Primary Address"}</h5>
                      <p>{DeliverdAddress?.street || "32 Naim Street"}</p>
                      <p>{DeliverdAddress?.apartment || "Suite #300"}</p>
                      <p>
                        {DeliverdAddress?.city || "Yitc"},
                        {DeliverdAddress?.state
                          ? ` ${DeliverdAddress.state}`
                          : " US-AR"}
                        ,{DeliverdAddress?.country || " US"}
                        {DeliverdAddress?.zipCode
                          ? ` ${DeliverdAddress.zipCode}`
                          : " 12345"}
                      </p>
                      <p style={{ marginTop: "8px", fontWeight: "600" }}>
                        📞 {DeliverdAddress?.phone || "+1 (555) 555-234"}
                      </p>
                      <span className="address-label">Default</span>
                    </div>

                    <div style={{ marginTop: "15px", fontSize: "12px" }}>
                      <Link
                        to="/profile"
                        style={{
                          color: "#0168b8",
                          textDecoration: "none",
                          fontWeight: "600",
                        }}
                      >
                        Change Address
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {currentPage === "checkout" && (
        <Checkout
          onOrderPlaced={handleOrderPlaced}
          setCurrentPage={setCurrentPage}
        />
      )}

      {currentPage === "success" && <OrderSuccess />}
    </div>
  );
};

export default ShoppingCart;
