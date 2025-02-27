import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchCategoryProducts } from "../../../api/app";

interface Category {
  _id: string;
  name: string;
}

const ShopSidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategoryProducts(
          "6788d0f493d6c92b2a848cf2"
        );

        if (response.categories && Array.isArray(response.categories)) {
          setCategories(response.categories);
        } else {
          console.warn("No categories found in response");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="shop-sidebar side-sticky bg-body" id="shopFilter">
      <div className="aside-header d-flex d-lg-none align-items-center">
        <h3 className="text-uppercase fs-6 mb-0">Filter By</h3>
        <button className="btn-close-lg js-close-aside btn-close-aside ms-auto"></button>
      </div>

      <div className="pt-4 pt-lg-0"></div>

      <div className="accordion" id="categories-list">
        <div className="accordion-item mb-4 pb-3">
          <h5 className="accordion-header" id="accordion-heading-1">
            <button
              className="accordion-button p-0 border-0 fs-5 text-uppercase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-1"
              aria-expanded="true"
              aria-controls="accordion-filter-1"
            >
              Product Categories
            </button>
          </h5>
          <div
            id="accordion-filter-1"
            className="accordion-collapse collapse show border-0"
            aria-labelledby="accordion-heading-1"
            data-bs-parent="#categories-list"
          >
            <div className="accordion-body px-0 pb-0 pt-3">
              <ul className="list list-inline mb-0 ms-2">
                {categories.length > 0 ? (
                  categories.map((cate) => (
                    <li key={cate._id} className="list-item">
                      <Link
                        to={`/category-pro/${cate._id}`}
                        className="menu-link py-1"
                      >
                        {cate.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-muted">No categories available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion" id="color-filters">
        <div className="accordion-item mb-4 pb-3">
          <h5 className="accordion-header" id="accordion-heading-1">
            <button
              className="accordion-button p-0 border-0 fs-5 text-uppercase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-2"
              aria-expanded="true"
              aria-controls="accordion-filter-2"
            >
              Color
              <svg
                className="accordion-button__icon type2"
                viewBox="0 0 10 6"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </button>
          </h5>
          <div
            id="accordion-filter-2"
            className="accordion-collapse collapse show border-0"
            aria-labelledby="accordion-heading-1"
            data-bs-parent="#color-filters"
          >
            <div className="accordion-body px-0 pb-0">
              <div className="d-flex flex-wrap">
                <a
                  href="#"
                  className="swatch-color js-filter"
                  style={{ color: "#0a2472" }}
                ></a>
                <a
                  href="#"
                  className="swatch-color js-filter"
                  style={{ color: "#d7bb4f" }}
                ></a>
                <a
                  href="#"
                  className="swatch-color js-filter"
                  style={{ color: "#282828" }}
                ></a>
                <a
                  href="#"
                  className="swatch-color js-filter"
                  style={{ color: "#b1d6e8" }}
                ></a>
                <a
                  href="#"
                  className="swatch-color js-filter"
                  style={{ color: "#9c7539" }}
                ></a>
                <a
                  href="#"
                  className="swatch-color js-filter"
                  style={{ color: "#d29b48" }}
                ></a>
                <a
                  href="#"
                  className="swatch-color js-filter"
                  style={{ color: "#e6ae95" }}
                ></a>
                <a
                  href="#"
                  className="swatch-color js-filter"
                  style={{ color: "#d76b67" }}
                ></a>
                <a
                  href="#"
                  className="swatch-color swatch_active js-filter"
                  style={{ color: "#bababa" }}
                ></a>
                <a
                  href="#"
                  className="swatch-color js-filter"
                  style={{ color: "#bfdcc4" }}
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion" id="size-filters">
        <div className="accordion-item mb-4 pb-3">
          <h5 className="accordion-header" id="accordion-heading-size">
            <button
              className="accordion-button p-0 border-0 fs-5 text-uppercase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-size"
              aria-expanded="true"
              aria-controls="accordion-filter-size"
            >
              Sizes
              <svg
                className="accordion-button__icon type2"
                viewBox="0 0 10 6"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </button>
          </h5>
          <div
            id="accordion-filter-size"
            className="accordion-collapse collapse show border-0"
            aria-labelledby="accordion-heading-size"
            data-bs-parent="#size-filters"
          >
            <div className="accordion-body px-0 pb-0">
              <div className="d-flex flex-wrap">
                <a
                  href="#"
                  className="swatch-size btn btn-sm btn-outline-secondary text-black mb-3 me-3 js-filter"
                >
                  XS
                </a>
                <a
                  href="#"
                  className="swatch-size btn btn-sm  btn-outline-secondary text-black mb-3 me-3 js-filter"
                >
                  S
                </a>
                <a
                  href="#"
                  className="swatch-size btn btn-sm  btn-outline-secondary text-black mb-3 me-3 js-filter"
                >
                  M
                </a>
                <a
                  href="#"
                  className="swatch-size btn btn-sm  btn-outline-secondary text-black mb-3 me-3 js-filter"
                >
                  L
                </a>
                <a
                  href="#"
                  className="swatch-size btn btn-sm  btn-outline-secondary text-black mb-3 me-3 js-filter"
                >
                  XL
                </a>
                <a
                  href="#"
                  className="swatch-size btn btn-sm  btn-outline-secondary text-black mb-3 me-3 js-filter"
                >
                  XXL
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion" id="price-filters">
        <div className="accordion-item mb-4">
          <h5 className="accordion-header mb-2" id="accordion-heading-price">
            <button
              className="accordion-button p-0 border-0 fs-5 text-uppercase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-price"
              aria-expanded="true"
              aria-controls="accordion-filter-price"
            >
              Price
              <svg
                className="accordion-button__icon type2"
                viewBox="0 0 10 6"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
            </button>
          </h5>
          <div
            id="accordion-filter-price"
            className="accordion-collapse collapse show border-0"
            aria-labelledby="accordion-heading-price"
            data-bs-parent="#price-filters"
          >
            <input
              className="price-range-slider"
              type="text"
              name="price_range"
              value=""
              data-slider-min="10"
              data-slider-max="1000"
              data-slider-step="5"
              data-slider-value="[250,450]"
              data-currency="$"
            />
            <div className="price-range__info d-flex align-items-center mt-2">
              <div className="me-auto">
                <span className="text-secondary">Min Price: </span>
                <span className="price-range__min">$0</span>
              </div>
              <div>
                <span className="text-secondary">Max Price: </span>
                <span className="price-range__max">$1000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
