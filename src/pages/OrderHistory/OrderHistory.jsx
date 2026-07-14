import React from "react";
import { useSelector } from "react-redux";
import { selectCartProducts } from "../../redux/slices/cart-product";
import { BE_BASE_URL } from "../../api/apiService";
import useFetch from "../../hooks/useFetch";

const OrderHistory = () => {
  const { data, loading } = useFetch(`${BE_BASE_URL}/order-history`);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div id="content">
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
                  <h6>Order History</h6>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <section className="shopping-cart padding-bottom-60">
          <div className="container">
            <table className="table">
              <thead>
                <tr>
                  <th>Items</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Total Price </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((proData) => {
                  return proData.products.map((product) => (
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
                            <span>{product.quantity}</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center padding-top-60">
                        ${(product.price * product.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderHistory;
