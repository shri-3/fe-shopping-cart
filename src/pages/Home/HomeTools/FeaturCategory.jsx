import React, { useEffect, useState } from "react";
import { BE_BASE_URL } from "../../../api/apiService";
import useFetch from "../../../hooks/useFetch";
import { setCategoryResults } from "../../../redux/slices/search-product";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const FeatureCategory = () => {
  const { data, loading } = useFetch(`${BE_BASE_URL}/category`);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectCat, setSelectCat] = useState([]);

  const handelCategoryClick = (catId) => {
    if (!catId) return;
    setSelectCat([...selectCat, catId]);
  };

  useEffect(() => {
    if (selectCat.length > 0) {
      dispatch(setCategoryResults(selectCat));
      navigate("/product");
    }
  }, [selectCat, dispatch]);

  return (
    <>
      <section class="shipping-info shipping-featur-info featur-tabs padding-top-60 padding-bottom-60">
        <div class="container">
          <ul className="nav nav-tabs nav-pills -mb-6" role="tablist">
            <li
              role="presentation"
              className="active header-tab"
              style={{ width: `25% !important` }}
            >
              <a
                href="#featur"
                aria-controls="featur"
                role="tab"
                data-toggle="tab"
              >
                Featured Category
              </a>
            </li>
          </ul>
          <ul className="catlog">
            {data?.map((categorys, index) => (
              <li
                onClick={() => handelCategoryClick(categorys._id)}
                key={index}
              >
                <div class="media-body">
                  <h5>{categorys.name}</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default FeatureCategory;
