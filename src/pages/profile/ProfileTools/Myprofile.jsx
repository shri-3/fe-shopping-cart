import React, { useEffect, useState } from "react";
import { BE_BASE_URL } from "../../../api/apiService";
import useFetch from "../../../hooks/useFetch";
import { splitDateOfBirth } from "../../../utils/dateUtils";
import { toast } from "react-toastify";

const Myprofile = (props) => {
  const { proData, setProData } = props;
  const [formStatus, setFormStatus] = useState(true);
  const dateValue = { dd: "", mm: "", yyyy: "" };
  const [dobSplit, setDobSplit] = useState(dateValue);

  const {
    data,
    loading,
    error,
    refetch: fetchData,
  } = useFetch(`${BE_BASE_URL}/profile/6a5a18ddc6c2af9485a629b0`, {
    method: "put",
    lazy: true,
  });

  const { day, month, year } = splitDateOfBirth(proData?.dob);

  const handelChangeProfile = (e) => {
    const { name, value } = e.target;
    setProData((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const handelDobChange = (e) => {
    const { name, value } = e.target;
    setDobSplit((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const handelChangeEdit = () => {
    setFormStatus((formStatus) => !formStatus);
    classChange();
  };

  function classChange() {
    if (formStatus) {
      return "form-control";
    } else {
      return "form-control-Edit";
    }
  }

  useEffect(() => {
    if (day || month || year) {
      setDobSplit({
        dd: day || "",
        mm: month || "",
        yyyy: year || "",
      });
    }
  }, [day, month, year]);

  const handelFormSubmit = async (e) => {
    e.preventDefault();

    const { dd, mm, yyyy } = dobSplit;
    if (!dd || !mm || !yyyy) {
      toast.warn("Please fill out your complete date of birth.");
      return;
    }

    const standardDateStr = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
    const isoDobString = new Date(standardDateStr).toISOString();

    const dobPayload = {
      ...proData,
      dob: isoDobString,
    };
    try {
      const result = await fetchData(dobPayload);
      toast.success(result.message);
      setFormStatus(true);
    } catch (err) {
      toast.error("Submission blocked:", err);
    }
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>My Profile</h2>
        <button className="edit-btn" onClick={handelChangeEdit}>
          <i className="fa fa-pencil"></i>
        </button>
      </div>

      <form className="profile-form" onSubmit={handelFormSubmit}>
        {/* Name Row */}
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="firstName">First Name</label>
            <input
              name="firstName"
              type="text"
              id="firstName"
              className={classChange()}
              value={proData?.firstName}
              readOnly={formStatus}
              onChange={handelChangeProfile}
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="lastName">Last Name</label>
            <input
              name="lastName"
              type="text"
              id="lastName"
              className={classChange()}
              value={proData?.lastName}
              readOnly={formStatus}
              onChange={handelChangeProfile}
            />
          </div>
        </div>

        {/* Email and Contact Row */}
        <div className="form-row">
          <div className="form-group col-md-12">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              className={classChange()}
              value={proData?.email}
              readOnly={formStatus}
              onChange={handelChangeProfile}
            />
          </div>
          <div className="form-group col-md-12">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              name="phone"
              type="tel"
              id="contactNumber"
              className={classChange()}
              value={proData?.phone}
              readOnly={formStatus}
              onChange={handelChangeProfile}
            />
          </div>
        </div>

        {/* Birthday Row */}
        <div className="form-row">
          <div className="form-group col-md-12">
            <label>Birthday</label>
            <div className="birthday-inputs">
              <div className="birthday-field">
                <input
                  name="dd"
                  className={classChange()}
                  type="text"
                  placeholder="DD"
                  value={dobSplit.dd}
                  onChange={handelDobChange}
                  readOnly={formStatus}
                />
              </div>
              <div className="birthday-field">
                <input
                  name="mm"
                  className={classChange()}
                  type="text"
                  placeholder="MM"
                  value={dobSplit.mm}
                  onChange={handelDobChange}
                  readOnly={formStatus}
                />
              </div>
              <div className="birthday-field">
                <input
                  name="yyyy"
                  className={classChange()}
                  type="text"
                  placeholder="YYYY"
                  value={dobSplit.yyyy}
                  onChange={handelDobChange}
                  readOnly={formStatus}
                />
              </div>
            </div>
          </div>
          <div className="form-group col-md-12">
            <label>Gender</label>
            <div className="gender-options">
              <div className="gender-option">
                <input
                  name="gender"
                  type="radio"
                  id="male"
                  value="male"
                  checked={proData?.gender === "male"}
                  disabled={formStatus}
                  onChange={handelChangeProfile}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="gender-option">
                <input
                  name="gender"
                  type="radio"
                  id="female"
                  value="female"
                  checked={proData?.gender === "female"}
                  disabled={formStatus}
                  onChange={handelChangeProfile}
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="gender-option">
                <input
                  name="gender"
                  type="radio"
                  id="other"
                  value="other"
                  checked={proData?.gender === "other"}
                  disabled={formStatus}
                  onChange={handelChangeProfile}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>
        </div>
        {!formStatus && (
          <button type="submit" class="btn-round-profile">
            Update
          </button>
        )}
      </form>
    </div>
  );
};

export default Myprofile;
