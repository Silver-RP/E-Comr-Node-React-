import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCategoryProducts } from "../../../api/app";
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

interface Category {
  id: string;
  name: string;
}

const CategoryProComponent = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = async (productId: string, quantity: number) => {
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
      try {
        if (!id) return;
        const response = await fetchCategoryProducts(id);
        setProducts(response.products);
        setCategory(response.productCate);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="shop-list flex-grow-1">
      <div className="d-flex justify-content-between mb-4 pb-md-2">
        <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
          <Link
            to="/"
            className="menu-link menu-link_us-s text-uppercase fw-medium"
          >
            Category:
          </Link>
          <Link
            to="/shop"
            className="menu-link menu-link_us-s text-uppercase fw-medium"
          >
            {category?.name || "Category"}
          </Link>
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
                      {product.images.slice(0, 2).map((image, index) => (
                        <div className="swiper-slide" key={index}>
                          <Link to={`/details/${product._id}`}>
                            <img
                              loading="lazy"
                              src={`http://localhost:3000/app/assets/images/products/${image[0]}`}
                              width="330"
                              height="400"
                              alt={product.name}
                              className="pc__img"
                            />
                          </Link>
                        </div>
                      ))}
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
                    <p className="pc__category">{product.cateName}</p>
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
    </div>
  );
};

export default CategoryProComponent;
