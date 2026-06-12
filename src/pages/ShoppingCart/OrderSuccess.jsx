import React from "react";
import { Link } from "react-router";

const OrderSuccess = () => {
  return (
    <>
      {/* Order-success */}
      <section>
        <div className="container">
          {/* Payout Method */}

          <div className="order-success">
            {" "}
            <i className="fa fa-check"></i>
            <h6>Congratulation! Your order has been processed</h6>
            <p>
              Thank you for shopping with us! Your order has been successfully
              placed and is now being prepared for shipment. We’ll notify you as
              soon as your package is on its way. You can track your order
              status anytime in your account.
            </p>
            <Link to="/product" className="btn-round">
              Return to Shop
            </Link>{" "}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSuccess;
