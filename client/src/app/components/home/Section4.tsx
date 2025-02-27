import React from "react";

const CategoryBanner: React.FC = () => {
  const categories = [
    {
      image: "assets/app/images/home/demo3/category_9.jpg",
      title: "Blazers",
      price: "$19",
    },
    {
      image: "assets/app/images/home/demo3/category_10.jpg",
      title: "Sportswear",
      price: "$19",
    },
  ];

  return (
    <section className="category-banner container">
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-6" key={index}>
            <div className="category-banner__item border-radius-10 mb-5">
              <img
                loading="lazy"
                className="h-auto"
                src={category.image}
                width={690}
                height={665}
                alt={category.title}
              />
              <div className="category-banner__item-mark">
                Starting at {category.price}
              </div>
              <div className="category-banner__item-content">
                <h3 className="mb-0">{category.title}</h3>
                <a
                  href="#"
                  className="btn-link default-underline text-uppercase fw-medium"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryBanner;
