import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartSubtotal,
  selectCartProducts,
  clearCart,
} from "../../redux/slices/cart-product";
import { Link } from "react-router";
import { BE_BASE_URL } from "../../api/apiService";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";

const Checkout = ({ onOrderPlaced, setCurrentPage }) => {
  const cartProducts = useSelector(selectCartProducts);
  const totalSum = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const blankAddress = {
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    country: "",
  };
  const [newAddress, setNewAddress] = useState(blankAddress);

  // Fetch user profile data including addresses
  const {
    data: profileData,
    loading: profileLoading,
    refetch,
  } = useFetch(`${BE_BASE_URL}/profile/6a5a18ddc6c2af9485a629b0`);

  const addresses = profileData?.data?.address || [];

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddress =
        profileData?.data?.primaryAddress || addresses[0]?._id;

      if (defaultAddress) {
        setSelectedAddressId(defaultAddress);
      }
    }
  }, [addresses, profileData?.data?.primaryAddress]);

  const handleAddressChange = (addressId) => {
    setSelectedAddressId(addressId);
    setShowNewAddressForm(false);
    handleAddNewAddress(null, addressId, true);
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewAddress = async (
    e = null,
    targetAddressId = null,
    isSelectingExisting = false,
  ) => {
    if (e) e.preventDefault();

    let finalizedPayload = {};

    if (!isSelectingExisting) {
      if (!newAddress.name || !newAddress.street || !newAddress.city) {
        toast.error("Please fill in all required fields");
        return;
      }

      let updatedAddresses = [...addresses, newAddress];

      finalizedPayload = {
        ...profileData?.data,
        address: updatedAddresses,
      };
    } else {
      const activeId = targetAddressId || selectedAddressId;

      finalizedPayload = {
        ...profileData?.data,
        primaryAddress: activeId,
      };
    }

    try {
      const response = await fetch(
        `${BE_BASE_URL}/profile/6a5a18ddc6c2af9485a629b0`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalizedPayload),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      const result = await response.json();
      refetch();
      if (newAddress.name || newAddress.street || newAddress.city) {
        toast.success("Address added successfully");
      } else {
        toast.success("Shipping address selected successfully");
      }
      setSelectedAddressId(result._id);
      setShowNewAddressForm(false);
      setNewAddress(blankAddress);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    if (cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        userId: "6a5a18ddc6c2af9485a629b0",
        addressId: selectedAddressId,
        products: cartProducts,
        totalAmount: totalSum + 5, // Including shipping
      };

      const response = await fetch(`${BE_BASE_URL}/order-history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to place order");
      }

      const result = await response.json();
      toast.success("Order Placed Successfully!");
      dispatch(clearCart());

      if (onOrderPlaced) {
        onOrderPlaced();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedAddress = addresses.find(
    (addr) => addr._id === selectedAddressId,
  );

  return (
    <div id="content">
      {/* Ship Process */}
      <div className="ship-process padding-top-30 padding-bottom-30">
        <div className="container">
          <ul className="row">
            <li className="col-sm-3">
              <div className="media-left">
                <i className="flaticon-shopping"></i>
              </div>
              <div className="media-body">
                <span></span>
                <h6>Shopping Cart</h6>
              </div>
            </li>
            <li className="col-sm-3 current">
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

      {/* Checkout Section */}
      <section className="checkout-section padding-top-60 padding-bottom-60">
        <div className="container">
          <div className="checkout-wrapper">
            {/* Left Side - Delivery Address */}
            <div className="checkout-left">
              <div className="checkout-card">
                <h3 className="checkout-title">Delivery Address</h3>

                {/* Existing Addresses */}
                {!showNewAddressForm && addresses.length > 0 && (
                  <div className="addresses-list">
                    {addresses.map((address) => (
                      <div
                        key={address._id}
                        className={`address-option ${selectedAddressId === address._id ? "selected" : ""}`}
                        onClick={() => handleAddressChange(address._id)}
                      >
                        <div className="address-radio">
                          <input
                            type="radio"
                            name="address"
                            value={address._id}
                            checked={selectedAddressId === address._id}
                            onChange={() => handleAddressChange(address._id)}
                          />
                        </div>
                        <div className="address-details">
                          <h5>{address.name}</h5>
                          <p>{address.street}</p>
                          <p>
                            {address.city}
                            {address.state && `, ${address.state}`}
                            {address.country && `, ${address.country}`}
                          </p>
                          <p>{address.zipCode}</p>
                          {address.phone && (
                            <p className="phone">📞 {address.phone}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* New Address Form */}
                {showNewAddressForm && (
                  <div className="new-address-form">
                    <div className="form-row">
                      <input
                        type="text"
                        name="name"
                        placeholder="Address Label (e.g., Home)"
                        value={newAddress.name}
                        onChange={handleNewAddressChange}
                      />
                      <input
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        value={newAddress.street}
                        onChange={handleNewAddressChange}
                      />
                    </div>
                    <div className="form-row">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={handleNewAddressChange}
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State/Province"
                        value={newAddress.state}
                        onChange={handleNewAddressChange}
                      />
                    </div>
                    <div className="form-row">
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="Zip/Postal Code"
                        value={newAddress.zipCode}
                        onChange={handleNewAddressChange}
                      />
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={newAddress.country}
                        onChange={handleNewAddressChange}
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={newAddress.phone}
                      onChange={handleNewAddressChange}
                    />
                    <div className="form-buttons">
                      <button
                        className="btn-save"
                        onClick={(e) => handleAddNewAddress(e, null, false)}
                      >
                        Save Address
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => setShowNewAddressForm(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Add New Address Button */}
                {!showNewAddressForm && (
                  <button
                    className="btn-add-address"
                    onClick={() => setShowNewAddressForm(true)}
                  >
                    + Add New Address
                  </button>
                )}
              </div>

              {/* Cart Summary */}
              <div className="checkout-card">
                <h3 className="checkout-title">Order Items</h3>
                <div className="items-summary">
                  {cartProducts.map((product) => (
                    <div key={product._id} className="item-row">
                      <div className="item-name">
                        {product.name} x {product.quantity}
                      </div>
                      <div className="item-price">
                        ${(product.price * product.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="checkout-right">
              <div className="order-summary">
                <h3 className="checkout-title">Order Summary</h3>

                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${totalSum.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>$5.00</span>
                </div>

                <div className="summary-row">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${(totalSum + 5).toFixed(2)}</span>
                </div>

                {/* Selected Address Summary */}
                {selectedAddress && (
                  <div className="selected-address-box">
                    <h5>Delivering To:</h5>
                    <p>{selectedAddress.name}</p>
                    <p>{selectedAddress.street}</p>
                    <p>
                      {selectedAddress.city}
                      {selectedAddress.state && `, ${selectedAddress.country}`}
                    </p>
                    <p>{selectedAddress.zipCode}</p>
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  className="btn-place-order"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || cartProducts.length === 0}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </button>

                {/* Back Button */}
                <a onClick={() => setCurrentPage("cart")} className="btn-back">
                  ← Back to Cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
