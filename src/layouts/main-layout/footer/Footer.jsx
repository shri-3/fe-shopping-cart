import React from "react";
import ClientsSupport from "./ClientsSupport";

const Footer = () => {
  return (
    <>
      <ClientsSupport />
      {/* <!-- Footer --> */}

      {/* <!-- Rights --> */}
      <div className="rights">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <p>Copyright © 2026 All rights reserved</p>
            </div>
            <div className="col-sm-6 text-right">
              <img src="images/card-icon.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* <!-- End Footer --> */}

      {/* <!-- GO TO TOP  -->  */}
      <a href="#" className="cd-top">
        <i className="fa fa-angle-up"></i>
      </a>
      {/* <!-- GO TO TOP End --> */}
    </>
  );
};

export default Footer;
