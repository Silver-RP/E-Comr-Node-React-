import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"; 
import { getShopProducts } from "../../../api/app";
import Pagination from "../../components/common/Pagination";
import { useCart } from "../../../context/CartContext";
import WishlistButton  from "../../../app/components/common/WishlistButton";

interface Product {
  id: number;
  _id: string;
  name: string;
  cateName: string;
  salePrice: number;
  price: number;
  images: string[];
}

const ProductsGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const {addToCart}= useCart();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 1,
    nextPage: 2,
  });

  const [searchParams, setSearchParams] = useSearchParams(); 
  const handleAddToCart = async (
    productId: string,
    quantity: number,
   
  ) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add products to cart");
      return;
    }

    try {
      const response = await addToCart(productId, token, quantity);
      if (response?.success) {
        console.log("Product added to cart successfully");
      } else {
        alert("Failed to add product to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding to cart");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const page = parseInt(searchParams.get("page") || "1", 10);
      const sort = searchParams.get("sort") || "default"; // 👈 Get sort from URL

      try {
        const response = await getShopProducts(page, sort);
        setProducts(response.products);
        setPagination({
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          hasPrevPage: response.hasPrevPage,
          hasNextPage: response.hasNextPage,
          prevPage: response.prevPage,
          nextPage: response.nextPage,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <>
      <div className="shop-list flex-grow-1">
        <div className="d-flex justify-content-between mb-4 pb-md-2">
          <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
            <a
              href="#"
              className="menu-link menu-link_us-s text-uppercase fw-medium"
            >
              Home
            </a>
            <span className="breadcrumb-separator menu-link fw-medium ps-1 pe-1">
              /
            </span>
            <a
              href="#"
              className="menu-link menu-link_us-s text-uppercase fw-medium"
            >
              The Shop
            </a>
          </div>

          <div className="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
            <form method="GET" action="/shop" id="sort-form">
              <select
                className="shop-acs__select form-select w-auto border-0 py-0 order-1 order-md-0"
                aria-label="Sort Items"
                name="sort"
                id="sort-select"
                defaultValue="default"
                onChange={(event) =>
                  event.target.form && event.target.form.submit()
                }
              >
                <option value="default">Default Sorting</option>
                <option value="featured">Featured</option>
                <option value="name_asc">Name: A-Z</option>
                <option value="name_desc">Name: Z-A</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </form>

            <div className="shop-asc__seprator  bg-light d-none d-md-block order-md-0"></div>

            <div className="shop-filter d-flex align-items-center order-0 order-md-3 d-lg-none">
              <button
                className="btn-link btn-link_f d-flex align-items-center ps-0 js-open-aside"
                data-aside="shopFilter"
              >
                <svg
                  className="d-inline-block align-middle me-2"
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_filter" />
                </svg>
                <span className="text-uppercase fw-medium d-inline-block align-middle">
                  Filter
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          className="products-grid row row-cols-2 row-cols-md-3"
          id="products-grid"
        >
          {products.map((product) => (
            <div className="product-card-wrapper" key={product._id}>
              <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                <div className="pc__img-wrapper">
                  <div
                    className="swiper-container background-img js-swiper-slider"
                    data-settings='{"resizeObserver": true}'
                  >
                    <div className="swiper-wrapper">
                        <div className="swiper-slide" >
                          <Link to={`/details/${product._id}`}>
                            <img
                              loading="lazy"
                              src={`http://localhost:3000/app/assets/images/products/${product.images[0]}`}
                              width="330"
                              height="400"
                              alt={product.name}
                              className="pc__img"
                            />
                          </Link>
                        </div>
                    </div>
                    {/* <span className="pc__img-prev">
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_prev_sm" />
                      </svg>
                    </span> */}
                    {/* <span className="pc__img-next">
                      <svg
                        width="7"
                        height="11"
                        viewBox="0 0 7 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_next_sm" />
                      </svg>
                    </span> */}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product._id, 1)}
                    className="pc__atc btn anim_appear-bottom position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
                    data-aside="cartDrawer"
                    title="Add To Cart"
                  >
                    Add To Cart
                  </button>

                </div>

                <div className="pc__info position-relative">
                  <div className="product-item">
                    <p className="pc__category">{product.cateName} </p>
                  </div>

                  <h6 className="pc__title">
                    <Link to={`/details/${product._id}`} className="text-black">
                      {product.name}
                    </Link>
                    <span className="ms-3">
                      <WishlistButton productId={product._id} />
                    </span>
                  </h6>
                  <div className="product-card__price d-flex">
                    <span className="money price text-red">
                      ${product.salePrice}
                    </span>
                    <del className="ms-3 text-secondary">${product.price}</del>
                  </div>
                  <div className="product-card__review d-flex align-items-center">
                    <div className="reviews-group d-flex">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          className="review-star"
                          key={index}
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                      ))}
                    </div>
                    <span className="reviews-note text-lowercase text-secondary ms-1">
                      8k+ reviews
                    </span>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(newPage) => {
            setSearchParams({ page: newPage.toString(), sort: searchParams.get("sort") || "default" }); // 👈 Preserve sort
          }}
        />
      </div>
    </>
  );
};

export default ProductsGrid;
