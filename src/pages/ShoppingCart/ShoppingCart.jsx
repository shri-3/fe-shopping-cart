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
} from "../../redux/slices/cart-product";
import { Link } from "react-router";
import OrderSuccess from "./OrderSuccess";
import { BE_BASE_URL } from "../../api/apiService";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";

const ShoppingCart = () => {
  const cartProducts = useSelector(selectCartProducts);
  const dispatch = useDispatch();
  const totalSum = useSelector(selectCartSubtotal);

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderUpdateData, setOrderUpdateData] = useState({
    userId: "6a0d9f63492c3f5603b807ab",
    products: [],
  });

  const baseURL = `${BE_BASE_URL}/order-history`;
  const { data, loading, error, refetch } = useFetch(
    `${BE_BASE_URL}/profile/6a5a18ddc6c2af9485a629b0`,
  );
  const filteredAddresses = data?.data?.address?.filter(
    (addr) => addr._id == data?.data?.primaryAddress,
  );
  const DeliverdAddress = filteredAddresses?.[0];
  console.log(data);
  console.log(filteredAddresses);

  const addProductsToOrder = (newProductsArray) => {
    // setOrderUpdateData((prevOrder) => ({
    //   ...prevOrder, // Copy all existing object fields (like userId)
    //   products: [
    //     ...prevOrder.products, // Copy all existing items in the array
    //     ...newProductsArray, // Spread and append the new array elements
    //   ],
    // }));
    setOrderUpdateData((prevOrder) => ({
      ...prevOrder,
      products: newProductsArray, // Direct overwrite removes duplication completely
    }));
  };

  useEffect(() => {
    addProductsToOrder(cartProducts);
  }, [cartProducts]);

  const handelSaveOrderHistory = () => {
    // implement logic to save order History to backend
    fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderUpdateData),
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
        toast.success("Order Placed Successfully");
        setOrderConfirmed(true);
        dispatch(clearCart());
      })
      .catch((err) => {
        // FIX: Use err.message to get just the text string without "Error:"
        toast.error(err.message);
      });
  };

  const handelSuccess = () => {
    handelSaveOrderHistory();
  };

  return (
    <div id="content">
      {!orderConfirmed ? (
        <>
          {/* Ship Process  */}
          <div className="ship-process padding-top-30 padding-bottom-30">
            <div className="container">
              <ul className="row">
                {/* Step 1 */}
                <li className="col-sm-3 current">
                  <div className="media-left">
                    <i className="flaticon-shopping"></i>
                  </div>
                  <div className="media-body">
                    <span></span>
                    <h6>Shopping Cart</h6>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Shopping Cart */}
          <section className="shopping-cart padding-bottom-60">
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
                      onClick={handelSuccess}
                    >
                      CHECKOUT
                    </button>
                  </div>

                  {/* Delivery Address Card */}
                  <div className="summary-card">
                    <h4>DELIVERY ADDRESS</h4>

                    <div className="address-card">
                      <h5>{DeliverdAddress?.name}</h5>
                      <p>{DeliverdAddress?.street}</p>
                      <p>
                        {DeliverdAddress?.city},{DeliverdAddress?.state},
                        {DeliverdAddress?.country}
                      </p>
                      <p>{DeliverdAddress?.zipCode}</p>
                      <p style={{ marginTop: "8px", fontWeight: "600" }}>
                        📞 {DeliverdAddress?.phone}
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
      ) : (
        <>
          <OrderSuccess />
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
