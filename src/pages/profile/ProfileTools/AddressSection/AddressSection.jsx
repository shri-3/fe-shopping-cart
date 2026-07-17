import React, { useState } from "react";
import "./AddressSection.css";
import useFetch from "../../../../hooks/useFetch";
import { BE_BASE_URL } from "../../../../api/apiService";
import { toast } from "react-toastify";

const AddressSection = (props) => {
  const { proData, setProData } = props;

  const {
    data,
    loading,
    error,
    refetch: fetchData,
  } = useFetch(`${BE_BASE_URL}/profile/6a5890cc341bcd26277aac5f`, {
    method: "put",
    lazy: true,
  });

  const blankAddress = {
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    country: "",
  };

  const [addressForm, setAddressForm] = useState(blankAddress);
  const [activeAddressId, setActiveAddressId] = useState(null);
  const [newForm, setNewform] = useState(false);

  const addresses = [
    {
      id: 1,
      name: "Abra Cadabra",
      street: "32 Naim",
      apartment: "#300",
      location: "Yitc, US-AR, US",
      postal: "12345",
      phone: "555-555-234",
    },
    {
      id: 2,
      name: "Zack Receiver",
      street: "23 Main",
      location: "Main, CA-BC, CA",
      postal: "H0H 0H0",
      phone: "555-555-5555",
    },
  ];

  const startEditing = (targetAddress) => {
    setActiveAddressId(targetAddress._id); // Lock in the edit identity token
    setAddressForm({
      name: targetAddress.name || "",
      street: targetAddress.street || "",
      city: targetAddress.city || "",
      state: targetAddress.state || "",
      zipCode: targetAddress.zipCode || "",
      phone: targetAddress.phone || "",
      country: targetAddress.country || "",
    });
  };

  const handleInputChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const cancelEditingMode = () => {
    setActiveAddressId(null);
    setAddressForm(blankAddress);
  };

  const handelNewForm = () => {
    cancelEditingMode();
    setNewform(true);
  };

  const handelCloseNewForm = () => {
    cancelEditingMode();
    setNewform(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let updatedAddresses = [];

    if (activeAddressId) {
      updatedAddresses = proData.address.map((addr) =>
        addr._id === activeAddressId ? { ...addr, ...addressForm } : addr,
      );
    } else {
      const newAddressEntry = {
        ...addressForm,
        // _id: `temp_${Date.now()}`, // Temporary ID for browser mapping stability
      };

      // Push the new item
      updatedAddresses = [...proData.address, newAddressEntry];
    }
    const finalizedPayload = {
      ...proData,
      address: updatedAddresses,
    };
    setProData(finalizedPayload);

    try {
      const newData = await fetchData(finalizedPayload);
      setProData(newData.data);
      handelCloseNewForm();
      toast.success("Address update successfully");
    } catch (error) {
      toast.error("Database save failed:", error);
      alert(
        "Could not save address to database. Please check your connection.",
      );
    }
  };

  const handleDeleteAddress = async (addressIdToDelete) => {
    const filteredAddresses = proData.address.filter(
      (addr) => addr._id !== addressIdToDelete,
    );

    const addDeletePayload = {
      ...proData,
      address: filteredAddresses,
    };

    try {
      const newData = await fetchData(addDeletePayload);
      setProData(newData.data);
      toast.success("Address delete successfully");
    } catch (error) {
      toast.error("Database save failed:", error);
      alert(
        "Could not save address to database. Please check your connection.",
      );
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>Shipping Address</h2>
        <button className="edit-btn" onClick={handelNewForm}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="address-container">
        <div className="addresses-grid">
          {proData?.address?.map((addres, index) => (
            <div key={index} className="address-card">
              <div className="profile-add-card">
                <div className="address-content">
                  <h3 className="address-name">{addres.name}</h3>
                  <p className="address-line">{addres.street}</p>
                  {/* {address.apartment && (
                  <p className="address-line">{address.apartment}</p>
                )} */}
                  <p className="address-line">
                    {addres.city}, {addres.state}, {addres.country}
                  </p>
                  <p className="address-line">{addres.zipCode}</p>
                  <p className="address-phone">{addres.phone}</p>
                </div>
                <button className="edit-btn edit-btn-gap">
                  <i
                    className="fa fa-pencil"
                    onClick={() => startEditing(addres)}
                  ></i>
                  <i
                    className="fa fa-trash"
                    onClick={() => handleDeleteAddress(addres._id)}
                  ></i>
                </button>
              </div>

              <div className="address-footer">
                <a href="#" className="ship-link">
                  Ship To This Address
                </a>
              </div>
            </div>
          ))}

          {(activeAddressId != null || newForm) && (
            <div className="address-card">
              <div className="address-content">
                <div className="profile-header">
                  <h3 className="address-name">
                    {activeAddressId
                      ? "Modify Address Details"
                      : "Register New Address Location"}
                  </h3>
                  <button className="edit-btn" onClick={handelCloseNewForm}>
                    <i className="fa fa-close"></i>
                  </button>
                </div>

                <form onSubmit={handleFormSubmit}>
                  <input
                    type="text"
                    name="name"
                    className="form-control-Edit"
                    placeholder="Label Name (e.g. Home)"
                    value={addressForm.name}
                    onChange={handleInputChange}
                    required
                  />

                  <input
                    type="text"
                    name="street"
                    className="form-control-Edit"
                    placeholder="Street Path"
                    value={addressForm.street}
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="city"
                    className="form-control-Edit"
                    placeholder="City"
                    value={addressForm.city}
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="state"
                    className="form-control-Edit"
                    placeholder="State/Province"
                    value={addressForm.state}
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="zipCode"
                    className="form-control-Edit"
                    placeholder="Zip/Postal Code"
                    value={addressForm.zipCode}
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="phone"
                    className="form-control-Edit"
                    placeholder="Contact Phone"
                    value={addressForm.phone}
                    onChange={handleInputChange}
                  />

                  <input
                    type="text"
                    name="country"
                    className="form-control-Edit"
                    placeholder="Country"
                    value={addressForm.country}
                    onChange={handleInputChange}
                  />

                  <button
                    type="submit"
                    style={{
                      backgroundColor: activeAddressId ? "#ffa500" : "#008cba",
                      color: "white",
                    }}
                  >
                    {activeAddressId
                      ? "Apply Modifications"
                      : "Save New Location"}
                  </button>

                  {activeAddressId && (
                    <button type="button" onClick={cancelEditingMode}>
                      Switch to New Address
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressSection;
