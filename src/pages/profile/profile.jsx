import React, { useEffect, useState } from "react";
import "./profile.css";
import Myprofile from "./ProfileTools/Myprofile";
import AddressSection from "./ProfileTools/AddressSection/AddressSection";
import { BE_BASE_URL } from "../../api/apiService";
import useFetch from "../../hooks/useFetch";

const Profile = () => {
  const { data, loading, error, refetch } = useFetch(
    `${BE_BASE_URL}/profile/6a5890cc341bcd26277aac5f`,
  );
  const [proData, setProData] = useState(null);

  useEffect(() => {
    if (data && data.data) {
      setProData(data.data);
    }
  }, [data]);

  return (
    <div id="content">
      <section class="skills padding-top-60 padding-bottom-60">
        <div class="container">
          <div class="heading">
            <h2>Profile Information</h2>
            <hr />
          </div>
          <div className="profile-container">
            <Myprofile proData={proData} setProData={setProData} />
            <AddressSection proData={proData} setProData={setProData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
