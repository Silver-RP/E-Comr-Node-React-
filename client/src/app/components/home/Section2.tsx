import React, { useEffect, useState } from "react";
import { getHomeProducts } from "../../../api/app"; 

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

interface Category{
  _id: string,
  name: string,
  image: string

}

const CategoryCarousel = () => {
  const [categories, setCategories] = useState<Category[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string>("");         

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cateData = await getHomeProducts();
        setCategories(cateData.categories); 
        setLoading(false); 
      } catch (error) {
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="category-carousel container">
      <h2 className="section-title text-center mb-3 pb-xl-2 mb-xl-4">
        You Might Like
      </h2>

      <div className="position-relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 5000 }}
          loop={true}
          navigation={{
            nextEl: ".products-carousel__next-1",
            prevEl: ".products-carousel__prev-1",
          }}
          breakpoints={{
            320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 15 },
            768: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 30 },
            992: { slidesPerView: 6, slidesPerGroup: 1, spaceBetween: 45 },
            1200: { slidesPerView: 8, slidesPerGroup: 1, spaceBetween: 60 },
          }}
          className="swiper-container"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <Link to={`/category-pro/${category._id}`} className="menu-link fw-medium" style={{ textDecoration: "none" }}>
                <img
                  loading="lazy"
                  className="w-100 h-auto mb-3"
                  src={`http://localhost:3000/app/assets/images/home/demo3/${category.image}`}
                  width="124"
                  height="124"
                  alt={category.name}
                />
                <div className="text-center">
                  {category.name} {/* No need to use `split(" ")` */}
                </div>
              </Link>
            </SwiperSlide>
          ))}

        </Swiper>

        {/* Navigation buttons */}
        <div className="products-carousel__prev products-carousel__prev-1 position-absolute top-50 d-flex align-items-center justify-content-center">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <use href="#icon_prev_md" />
          </svg>
        </div>
        <div className="products-carousel__next products-carousel__next-1 position-absolute top-50 d-flex align-items-center justify-content-center">
          <svg width="25" height="25" viewBox="0 0 25 25">
            <use href="#icon_next_md" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
