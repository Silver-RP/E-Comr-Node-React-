import React, { useEffect, useState } from "react";
import { getHomeProducts } from "../../../api/app"; 
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import WishlistButton  from "../../../app/components/common/WishlistButton";


interface Product {
  _id: number;
  name: string;
  salePrice: number;
  price: number;
  images: string[];
}


const Section5: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
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
        setFeaturedProducts(response.productsFeatured); // Assuming the API response contains products
      } catch (error) {
        console.error("Error fetching hot deals:", error);
      }
    };
    fetchHotDeals();
  }, []);

  return (
    <section className="products-grid container">
      <h2 className="section-title text-center mb-3 pb-xl-3 mb-xl-4">Featured Products</h2>
      <div className="row">
        {featuredProducts.map((product) => (
          <div key={product._id} className="col-6 col-md-4 col-lg-3">
            <div className="product-card product-card_style3 mb-3 mb-md-4 mb-xxl-5">
              <div className="pc__img-wrapper">
                <Link to={`/details/${product._id}`}>
                  <img
                    loading="lazy"
                    src={`http://localhost:3000/app/assets/images/products/${product.images.length > 0 ? product.images[0] : ''}`}
                    width="330"
                    height="400"
                    alt={product.name}
                    className="pc__img"
                  />
                </Link>
              </div>

              <div className="pc__info position-relative">
                <h6 className="pc__title">
                  <Link to={`/details/${product._id}`}  style={{ textDecoration: "none" }} className="text-black">{product.name}</Link>
                </h6>
                <div className="product-card__price d-flex align-items-center">
                  <span className="money price text-danger fw-normal">${product.salePrice}</span>
                  <del className="money price text-secondary ms-2">${product.price}</del>
                </div>

                <div className="anim_appear-bottom position-absolute bottom-0 start-0 d-none d-sm-flex align-items-center bg-body">
                  <button
                    onClick={() => handleAddToCart(product._id.toString(), 1)}
                    className="btn-link btn-link_lg me-4 text-uppercase fw-medium js-add-cart js-open-aside"
                    data-aside="cartDrawer"
                    title="Add To Cart"
                  >
                    Add To Cart
                  </button>
                  
                  <WishlistButton productId={product._id.toString()} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section5;

