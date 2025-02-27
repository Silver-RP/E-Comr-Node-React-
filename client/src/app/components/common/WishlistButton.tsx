import React, { useState, useEffect } from "react";
import { useNotification } from "../../../context/NotificationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as lightHeart } from "@fortawesome/free-regular-svg-icons";
import { toggleWishlist } from "../../../api/app";

const WishlistButton = ({ productId }: { productId: string }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const { showNotification } = useNotification() as unknown as { showNotification: (message: string) => void };

  // Function to check wishlist from localStorage
  const updateWishlistState = () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "{}");
    setWishlisted(!!storedWishlist[productId]); // Convert to boolean
  };

  // ✅ Listen for localStorage changes (e.g., after login)
  useEffect(() => {
    updateWishlistState(); // Check initial state

    // Listen for localStorage updates
    const handleStorageChange = () => {
      updateWishlistState();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [productId]);

  const handleWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add products to your wishlist.");
      return;
    }

    const response = await toggleWishlist(productId);

    if (response.success) {
      const newWishlistState = !wishlisted;
      setWishlisted(newWishlistState);

      // Update localStorage
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "{}");
      if (newWishlistState) {
        storedWishlist[productId] = true;
        showNotification("Added to wishlist! ❤️");
      } else {
        delete storedWishlist[productId];
        showNotification("Removed from wishlist. ❌");
      }
      localStorage.setItem("wishlist", JSON.stringify(storedWishlist));

      // ✅ Trigger event to notify all components
      window.dispatchEvent(new Event("storage"));
    } else {
      alert(response.message);
    }
  };

  return (
    <button
      className="wishlist-btn border-0 bg-transparent"
      onClick={handleWishlist}
      style={{
        color: wishlisted ? "red" : "gray",
      }}
    >
      <FontAwesomeIcon
        style={{
          width: "18px",
          height: "18px",
        }}
        icon={wishlisted ? solidHeart : lightHeart}
      />
    </button>
  );
};

export default WishlistButton;
