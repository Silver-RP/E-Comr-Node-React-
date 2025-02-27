import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import { getHomeProducts } from "../../../api/app";
import { useCart } from "../../../context/CartContext";
import WishlistButton  from "../../../app/components/common/WishlistButton";

interface Product {
  _id: string;
  name: string;
  price: string;
  salePrice: string;
  images: string[];
  isWishlisted: boolean;
}

interface CountdownProps {
  targetDate: string;
}
const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="d-flex text-center pt-4 mb-3">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="countdown-unit mx-2">
          <span className="countdown-num d-block">{value}</span>
          <span className="countdown-word text-uppercase text-secondary">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
};

const HotDealsSection: React.FC = () => {
  const [hotDeals, setHotDeals] = useState<Product[]>([]);
  const { addToCart } = useCart();

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
    const fetchHotDeals = async () => {
      try {
        const response = await getHomeProducts();
        setHotDeals(response.productsHot);
      } catch (error) {
        console.error("Error fetching hot deals:", error);
      }
    };
    fetchHotDeals();
  }, []);

  return (
    <section className="hot-deals container">
      <h2 className="section-title text-center mb-3 pb-xl-3 mb-xl-4">
        Hot Deals
      </h2>
      <div className="row">
        <div className="col-md-6 col-lg-4 col-xl-3 d-flex flex-column align-items-center py-4">
          <h2>Summer Sale</h2>
          <h2 className="fw-bold">Up to 60% Off</h2>
          <Countdown targetDate="2025-12-31T23:59:59" />
          <a
            href="#"
            className="btn-link default-underline text-uppercase fw-medium mt-3"
          >
            View All
          </a>
        </div>
        <div className="col-md-6 col-lg-8 col-xl-9 ">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 14 },
              768: { slidesPerView: 2, slidesPerGroup: 3, spaceBetween: 24 },
              992: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 30 },
              1200: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 30 },
            }}
          >
            {hotDeals.map((product, index) => (
              <SwiperSlide
                key={index}
                className="product-card product-card_style3"
              >
                <div className="pc__img-wrapper-home rounded-3">
                  <Link to={`/details/${product._id}`}>
                    <img
                      loading="lazy"
                      src={`http://localhost:3000/app/assets/images/products/${product.images[0]}`}
                      width={258}
                      height={313}
                      alt={product.name}
                    />
                  </Link>
                </div>
                <div className="pc__info position-relative">
                  <h6 className="pc__title">
                    <Link to={`/details/${product._id}`} className="text-black">
                      {product.name}
                    </Link>
                  </h6>
                  <div className="product-card__price d-flex">
                    <span className="money price text-danger fw-semibold">
                      ${product.salePrice}
                    </span>
                    <del className="money price text-secondary ms-2">
                      ${product.price}
                    </del>
                  </div>
                  <div className="anim_appear-bottom position-absolute bottom-0 start-0 d-none d-sm-flex align-items-center bg-body">
                    <button
                      onClick={() => handleAddToCart(product._id, 1)}
                      className="btn-link btn-link_lg me-4 text-uppercase fw-medium js-add-cart js-open-aside"
                      title="Add To Cart"
                    >
                      Add To Cart
                    </button>
                    <WishlistButton productId={product._id} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HotDealsSection;
