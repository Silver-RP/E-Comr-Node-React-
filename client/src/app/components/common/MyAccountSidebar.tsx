import { Link } from "react-router-dom"
import { logoutUser } from "../../../api/auth";


const MyAccountSidebar = () =>{

    const handleLogout = async () => {
      try {
          const response = await logoutUser(); 
          if (response?.success) {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("wishlist");
              window.location.href = "/login"; 
          } else {
              console.error("Error logging out:", response?.message);
              alert("Error logging out: " + response?.message);
          }
      } catch (error) {
          console.error("Unexpected error during logout:", error);
          alert("An unexpected error occurred. Please try again.");
      }
  };

    return(
        <div className="col-lg-3">
        <ul className="account-nav">
          <li>
            <Link
              to="/my-account"
              className="menu-link menu-link_us-s"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/orders-history"
              className="menu-link menu-link_us-s"
            >
              Orders
            </Link>
          </li>
          <li>
            <a
              href="account-address.html"
              className="menu-link menu-link_us-s"
            >
              Addresses
            </a>
          </li>
          <li>
            <Link
              to="/my-account-details"
              className="menu-link menu-link_us-s"
            >
              Account Details
            </Link>
          </li>
          <li>
            <Link
              to="/wishlist"
              className="menu-link menu-link_us-s"
            >
              Wishlist
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="btn btn-logout mt-5 bg-black text-white" style={{ width:"100px"}}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
}

export default MyAccountSidebar;