import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  removeFromCart,
  clearCart,
  selectCartSubtotal,
} from "../../redux/slices/cart-product";
import { Link } from "react-router";
import OrderSuccess from "./OrderSuccess";

const ShoppingCart = () => {
  const cartProducts = useSelector(
    (state) => state.cartProduct.cartProductsList,
  );
  const dispatch = useDispatch();
  const totalSum = useSelector(selectCartSubtotal);

  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handelSuccess = () => {
    setOrderConfirmed(true);
    // Optionally, you can also clear the cart here if you want to reset it after order confirmation
    dispatch(clearCart());
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
              <table className="table">
                <thead>
                  <tr>
                    <th>Items</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Total Price </th>
                    <th>&nbsp; </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Item Cart */}
                  {cartProducts?.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div className="media">
                          <div className="media-left">
                            <a href="#.">
                              <img
                                className="img-responsive"
                                src={product.imageUrl}
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="media-body">
                            <p>{product.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center padding-top-60">
                        ${product.price?.toFixed(2)}
                      </td>
                      <td className="text-center">
                        <div className="quinty padding-top-20">
                          <div className="qty-control">
                            <button
                              className="btn-round btn-light"
                              onClick={() =>
                                dispatch(decrement({ _id: product._id }))
                              }
                            >
                              -
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              className="btn-round btn-light"
                              onClick={() =>
                                dispatch(increment({ _id: product._id }))
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="text-center padding-top-60">
                        ${(product.price * product.quantity).toFixed(2)}
                      </td>
                      <td className="text-center padding-top-60">
                        <a
                          className="remove"
                          onClick={() => dispatch(removeFromCart(product))}
                        >
                          <i className="fa fa-close"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Promotion */}
              <div className="promo">
                <div className="coupen">
                  <label>
                    {" "}
                    Promotion Code
                    <input type="text" placeholder="Your code here" />
                    <button type="submit">
                      <i className="fa fa-arrow-circle-right"></i>
                    </button>
                  </label>
                </div>

                {/* Grand total */}
                <div className="g-totel">
                  <h5>
                    Grand total: <span>${totalSum.toFixed(2)}</span>
                  </h5>
                </div>
              </div>

              {/* Button */}
              <div className="pro-btn">
                {" "}
                <Link to="/product" className="btn-round btn-light">
                  Continue Shopping
                </Link>
                {cartProducts.length > 0 && (
                  <a onClick={handelSuccess} className="btn-round">
                    Place Order
                  </a>
                )}
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
