import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProduct } from "../../../api/app";
import "../../../assets/app/css/plugins/swiper.min.css";
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

interface CateName {
  _id: string;
  name: string;
}

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [cateName, setCateName] = useState<CateName | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = async (
    productId: string,
    quantity: number,
    event: React.FormEvent
  ) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add products to cart");
      return;
    }

    console.log(
      "Adding to cart - Product ID:",
      productId,
      "Quantity:",
      quantity
    );

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
    const getProduct = async () => {
      try {
        const data = await fetchProduct(id ?? "");
        setProduct(data.product);
        setCateName(data.productCate ?? []);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) getProduct();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <>
      <div className="mb-md-1 pb-md-3"></div>
      <section className="product-single container">
        <div className="row">
          <div className="col-lg-7">
            <div
              className="product-single__media"
              data-media-type="vertical-thumbnail"
            >
              <div className="product-single__thumbnail">
                <div className="swiper-container p-1">
                  <div className="swiper-wrapper">
                    {product.images.slice(0, 4).map((image, index) => (
                      <div
                        className="swiper-slide product-single__image-item"
                        key={index}
                      >
                        <img
                          loading="lazy"
                          className="h-auto"
                          src={`http://localhost:3000/app/assets/images/products/${image}`}
                          width="104"
                          height="104"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Image Slider */}
              <div className="product-single__image">
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    {product.images.map((image, index) => (
                      <div
                        className="swiper-slide product-single__image-item"
                        key={index}
                      >
                        <img
                          loading="lazy"
                          className="h-auto"
                          src={`http://localhost:3000/app/assets/images/products/${image}`}
                          width="674"
                          height="674"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="swiper-button-prev">
                    <svg
                      width="7"
                      height="11"
                      viewBox="0 0 7 11"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <use href="#icon_prev_sm" />
                    </svg>
                  </div>
                  <div className="swiper-button-next">
                    <svg
                      width="7"
                      height="11"
                      viewBox="0 0 7 11"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <use href="#icon_next_sm" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
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
            </div>
            <h1 className="product-single__name">{product.name}</h1>
            <div className="product-single__rating">
              <div className="reviews-group d-flex">
                <svg
                  className="review-star"
                  viewBox="0 0 9 9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_star" />
                </svg>
                <svg
                  className="review-star"
                  viewBox="0 0 9 9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_star" />
                </svg>
                <svg
                  className="review-star"
                  viewBox="0 0 9 9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_star" />
                </svg>
                <svg
                  className="review-star"
                  viewBox="0 0 9 9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_star" />
                </svg>
                <svg
                  className="review-star"
                  viewBox="0 0 9 9"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_star" />
                </svg>
              </div>
              <span className="reviews-note text-lowercase text-secondary ms-1">
                8k+ reviews
              </span>
            </div>
            <div className="product-single__price">
              <span className="current-price text-danger">
                ${product.salePrice}
              </span>
              <del className="current-price ms-2 text-secondary fs-6">
                ${product.price}
              </del>
            </div>
            <div className="product-single__short-desc">
              <p>
                Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                elementum gravida nec dui. Aenean aliquam varius ipsum, non
                ultricies tellus sodales eu. Donec dignissim viverra nunc, ut
                aliquet magna posuere eget.
              </p>
            </div>
            <form
              name="addtocart-form"
              onSubmit={(event) =>
                handleAddToCart(product?._id, quantity, event)
              }
            >
              <div className="product-single__addtocart">
                <div className="qty-control position-relative">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className=" border-0 bg-white"
                    style={{
                      position: "absolute",
                      top: "17px",
                      left:"10px"
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    min="1"
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="qty-control__number text-center"
                  />
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className=" border-0 bg-white"
                    style={{
                      position: "absolute",
                      top: "17px",
                      right: "20px",
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  type="submit"
                  className="btn btn-dark bg-black btn-addtocart js-open-aside"
                  data-aside="cartDrawer"
                >
                  Add to Cart
                </button>
              </div>
            </form>
            <div className="product-single__addtolinks">
              <a href="#" className="menu-link menu-link_us-s add-to-wishlist mt-3">
              <WishlistButton productId={product._id} />
                <span>Add to Wishlist</span>
              </a>
            </div>
            <div className="product-single__meta-info">
              <div className="meta-item">
                <label>SKU:</label>
                <span>N/A</span>
              </div>
              <div className="meta-item">
                <label>Categories:</label>
                {Array.isArray(cateName) && cateName.length > 0 ? (
                  cateName.map((cate, index) => (
                    <span key={index}>{cate.name}</span>
                  ))
                ) : (
                  <span>No categories available</span>
                )}
              </div>
              <div className="meta-item">
                <label>Tags:</label>
                <span>biker, black, bomber, leather</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-single__details-tab">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link nav-link_underscore active text-black"
                id="tab-description-tab"
                data-bs-toggle="tab"
                href="#tab-description"
                role="tab"
                aria-controls="tab-description"
                aria-selected="true"
              >
                Description
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className=" text-black nav-link nav-link_underscore"
                id="tab-additional-info-tab"
                data-bs-toggle="tab"
                href="#tab-additional-info"
                role="tab"
                aria-controls="tab-additional-info"
                aria-selected="false"
              >
                Additional Information
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className=" text-black nav-link nav-link_underscore"
                id="tab-reviews-tab"
                data-bs-toggle="tab"
                href="#tab-reviews"
                role="tab"
                aria-controls="tab-reviews"
                aria-selected="false"
              >
                Reviews (2)
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="tab-description"
              role="tabpanel"
              aria-labelledby="tab-description-tab"
            >
              <div className="product-single__description">
                <h3 className="block-title mb-4">
                  Sed do eiusmod tempor incididunt ut labore
                </h3>
                <p className="content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo.
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <h3 className="block-title">Why choose product?</h3>
                    <ul className="list text-list">
                      <li>Creat by cotton fibric with soft and smooth</li>
                      <li>
                        Simple, Configurable (e.g. size, color, etc.), bundled
                      </li>
                      <li>Downloadable/Digital Products, Virtual Products</li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <h3 className="block-title">Sample Number List</h3>
                    <ol className="list text-list">
                      <li>Create Store-specific attrittbutes on the fly</li>
                      <li>
                        Simple, Configurable (e.g. size, color, etc.), bundled
                      </li>
                      <li>Downloadable/Digital Products, Virtual Products</li>
                    </ol>
                  </div>
                </div>
                <h3 className="block-title mb-0">Lining</h3>
                <p className="content">100% Polyester, Main: 100% Polyester.</p>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab-additional-info"
              role="tabpanel"
              aria-labelledby="tab-additional-info-tab"
            >
              <div className="product-single__addtional-info">
                <div className="item">
                  <label className="h6">Weight</label>
                  <span>1.25 kg</span>
                </div>
                <div className="item">
                  <label className="h6">Dimensions</label>
                  <span>90 x 60 x 90 cm</span>
                </div>
                <div className="item">
                  <label className="h6">Size</label>
                  <span>XS, S, M, L, XL</span>
                </div>
                <div className="item">
                  <label className="h6">Color</label>
                  <span>Black, Orange, White</span>
                </div>
                <div className="item">
                  <label className="h6">Storage</label>
                  <span>Relaxed fit shirt-style dress with a rugged</span>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab-reviews"
              role="tabpanel"
              aria-labelledby="tab-reviews-tab"
            >
              <h2 className="product-single__reviews-title">Reviews</h2>
              <div className="product-single__reviews-list">
                <div className="product-single__reviews-item">
                  <div className="customer-avatar">
                    <img loading="lazy" src="assets/images/avatar.jpg" alt="" />
                  </div>
                  <div className="customer-review">
                    <div className="customer-name">
                      <h6>Janice Miller</h6>
                      <div className="reviews-group d-flex">
                        <svg
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                        <svg
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                        <svg
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                        <svg
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                        <svg
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                      </div>
                    </div>
                    <div className="review-date">April 06, 2023</div>
                    <div className="review-text">
                      <p>
                        Nam libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil impedit quo minus id quod maxime placeat
                        facere possimus, omnis voluptas assumenda est…
                      </p>
                    </div>
                  </div>
                </div>
                <div className="product-single__reviews-item">
                  <div className="customer-avatar">
                    <img loading="lazy" src="assets/images/avatar.jpg" alt="" />
                  </div>
                  <div className="customer-review">
                    <div className="customer-name">
                      <h6>Benjam Porter</h6>
                      <div className="reviews-group d-flex">
                        <svg
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                        <svg
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                        <svg
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                        <svg
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                        <svg
                          className="review-star"
                          viewBox="0 0 9 9"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_star" />
                        </svg>
                      </div>
                    </div>
                    <div className="review-date">April 06, 2023</div>
                    <div className="review-text">
                      <p>
                        Nam libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil impedit quo minus id quod maxime placeat
                        facere possimus, omnis voluptas assumenda est…
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-single__review-form">
                <form name="customer-review-form">
                  <h5>Be the first to review “Message Cotton T-Shirt”</h5>
                  <p>
                    Your email address will not be published. Required fields
                    are marked *
                  </p>
                  <div className="select-star-rating">
                    <label>Your rating *</label>
                    <span className="star-rating">
                      <svg
                        className="star-rating__star-icon"
                        width="12"
                        height="12"
                        fill="#ccc"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
                      </svg>
                      <svg
                        className="star-rating__star-icon"
                        width="12"
                        height="12"
                        fill="#ccc"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
                      </svg>
                      <svg
                        className="star-rating__star-icon"
                        width="12"
                        height="12"
                        fill="#ccc"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
                      </svg>
                      <svg
                        className="star-rating__star-icon"
                        width="12"
                        height="12"
                        fill="#ccc"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
                      </svg>
                      <svg
                        className="star-rating__star-icon"
                        width="12"
                        height="12"
                        fill="#ccc"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.1429 5.04687C11.1429 4.84598 10.9286 4.76562 10.7679 4.73884L7.40625 4.25L5.89955 1.20312C5.83929 1.07589 5.72545 0.928571 5.57143 0.928571C5.41741 0.928571 5.30357 1.07589 5.2433 1.20312L3.73661 4.25L0.375 4.73884C0.207589 4.76562 0 4.84598 0 5.04687C0 5.16741 0.0870536 5.28125 0.167411 5.3683L2.60491 7.73884L2.02902 11.0871C2.02232 11.1339 2.01563 11.1741 2.01563 11.221C2.01563 11.3951 2.10268 11.5558 2.29688 11.5558C2.39063 11.5558 2.47768 11.5223 2.56473 11.4754L5.57143 9.89509L8.57813 11.4754C8.65848 11.5223 8.75223 11.5558 8.84598 11.5558C9.04018 11.5558 9.12054 11.3951 9.12054 11.221C9.12054 11.1741 9.12054 11.1339 9.11384 11.0871L8.53795 7.73884L10.9688 5.3683C11.0558 5.28125 11.1429 5.16741 11.1429 5.04687Z" />
                      </svg>
                    </span>
                    <input type="hidden" id="form-input-rating" value="" />
                  </div>
                  <div className="mb-4">
                    <textarea
                      id="form-input-review"
                      className="form-control form-control_gray"
                      placeholder="Your Review"
                      cols={30}
                      rows={8}
                    ></textarea>
                  </div>
                  <div className="form-label-fixed mb-4">
                    <label htmlFor="form-input-name" className="form-label">
                      Name *
                    </label>
                    <input
                      id="form-input-name"
                      className="form-control form-control-md form-control_gray"
                    />
                  </div>
                  <div className="form-label-fixed mb-4">
                    <label htmlFor="form-input-email" className="form-label">
                      Email address *
                    </label>
                    <input
                      id="form-input-email"
                      className="form-control form-control-md form-control_gray"
                    />
                  </div>
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input form-check-input_fill"
                      type="checkbox"
                      value=""
                      id="remember_checkbox"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="remember_checkbox"
                    >
                      Save my name, email, and website in this browser for the
                      next time I comment.
                    </label>
                  </div>
                  <div className="form-action">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Details;
