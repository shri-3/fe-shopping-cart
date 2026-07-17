import React from "react";
import img1 from "../../../assets/template-assets/images/c-img-1.png";
import img2 from "../../../assets/template-assets/images/c-img-2.png";
import img3 from "../../../assets/template-assets/images/c-img-3.png";
import img4 from "../../../assets/template-assets/images/c-img-4.png";
import img5 from "../../../assets/template-assets/images/c-img-5.png";

const ClientsSupport = () => {
  return (
    <>
      {/* <!-- Newslatter --> */}
      <section className="newslatter">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>
                Subscribe our Newsletter{" "}
                <span>
                  Get <strong>25% Off</strong> first purchase!
                </span>
              </h3>
            </div>
            <div className="col-md-6">
              <form>
                <input type="email" placeholder="Your email address here..." />
                <button type="submit">Subscribe!</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientsSupport;
