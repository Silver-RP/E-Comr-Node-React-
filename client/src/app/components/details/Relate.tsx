import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProduct } from "../../../api/app";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCart } from "../../../context/CartContext";
import WishlistButton  from "../../../app/components/common/WishlistButton";

interface Product {
  id: number;
  _id: string;
  name: string;
  images: string[][]; 
  salePrice: number;
  price: number;
  productCate: string;
}

const Relate = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
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
    const fetchProducts = async () => {
      try {
        const response = await fetchProduct(id ?? "");
        setProducts(response.relatedProducts ?? []);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (id) fetchProducts();
  }, [id]);

  if (!products.length) return <p>Loading related products...</p>;

  return (
    <section className="products-carousel container">
      <h2 className="h3 text-uppercase mb-4 pb-xl-2 mb-xl-4">
        Related <strong>Products</strong>
      </h2>

      <div id="related_products" className="position-relative">
        <Swiper
          modules={[Navigation, Pagination]}
          autoplay={false}
          slidesPerView={4}
          slidesPerGroup={4}
          loop={true}
          navigation={{
            nextEl: ".products-carousel__next",
            prevEl: ".products-carousel__prev",
          }}
          pagination={{ el: ".products-pagination", clickable: true }}
          breakpoints={{
            320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 14 },
            768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
            992: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 30 },
          }}
          className="js-swiper-slider"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="product-card">
              <div className="pc__img-wrapper">
                <Link to={`/details/${product._id}`}>
                  <img
                    loading="lazy"
                    src={
                      product.images[0]?.[0]
                        ? `http://localhost:3000/app/assets/images/products/${product.images[0]}`
                        : "/default-image.jpg"
                    }
                    width="330"
                    height="400"
                    alt={product.name}
                    className="pc__img"
                  />
                  {product.images[1]?.[0] && (
                    <img
                      loading="lazy"
                      src={`http://localhost:3000/app/assets/images/products/${product.images[0]}`}

                      width="330"
                      height="400"
                      alt={product.name}
                      className="pc__img pc__img-second"
                    />
                  )}
                </Link>
                <button
                  onClick={() => handleAddToCart(product._id, 1)}
                  className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium"
                  title="Add To Cart"
                >
                  Add To Cart
                </button>
              </div>
              <div className="pc__info position-relative">
                <p className="pc__category">{product.productCate}</p>
                <h6 className="pc__title text-dark">
                  <Link to={`/details/${product._id}`} className="pc__title text-dark">
                    {product.name}
                  </Link>
                </h6>
                <div className="product-card__price d-flex">
                  <span className="money price text-danger">${product.salePrice}</span>
                  {product.salePrice < product.price && <del className="ms-3">${product.price}</del>}
                  <span className="ms-5"> <WishlistButton productId={product._id} /> </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="products-carousel__prev position-absolute top-50 d-flex align-items-center justify-content-center">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <use href="#icon_prev_md" />
          </svg>
        </div>

        <div className="products-carousel__next position-absolute top-50 d-flex align-items-center justify-content-center">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <use href="#icon_next_md" />
          </svg>
        </div>

        <div className="products-pagination mt-4 mb-5 d-flex align-items-center justify-content-center"></div>
      </div>
    </section>
  );
};

export default Relate;
