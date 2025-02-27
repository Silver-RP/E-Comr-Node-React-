import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // State to track open menus
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  // Toggle menu function
  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <div className="section-menu-left">
      <div className="box-logo">
        <Link to="/admin" id="site-logo-inner">
          <img
            id="logo_header"
            alt=""
            src={`http://localhost:3000/app/assets/images/logo-clothes.png`}
            width={170}
            style={{ maxHeight: "60px", maxWidth: "180px" }}
          />
        </Link>
        <div className="button-show-hide">
          <i className="icon-menu-left"></i>
        </div>
      </div>
      <div className="center">
        <div className="center-item">
          <div className="center-heading">Main Home</div>
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/admin">
                <div className="icon">
                  <i className="icon-grid"></i>
                </div>
                <div className="text">Dashboard</div>
              </Link>
            </li>
          </ul>
        </div>

        <div className="center-item">
          <ul className="menu-list">
            {/* Products */}
            <li className={`menu-item has-children ${openMenus.products ? "active" : ""}`}>
              <Link 
              to=""
              className="menu-item-button" onClick={() => toggleMenu("products")}>
                <div className="icon">
                  <i className="icon-shopping-cart"></i>
                </div>
                <div className="text">Products</div>
              </Link>
              <ul className="sub-menu" style={{ display: openMenus.products ? "block" : "none" }}>
                <li className="sub-menu-item">
                  <Link to="/admin/add-product">
                    <div className="text">Add Product</div>
                  </Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/admin/products">
                    <div className="text">Products</div>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Category */}
            <li className={`menu-item has-children ${openMenus.category ? "active" : ""}`}>
              <Link 
              to=""
              className="menu-item-button" onClick={() => toggleMenu("category")}>
                <div className="icon">
                  <i className="icon-layers"></i>
                </div>
                <div className="text">Category</div>
              </Link>
              <ul className="sub-menu" style={{ display: openMenus.category ? "block" : "none" }}>
                <li className="sub-menu-item">
                  <Link to="/admin/add-category">
                    <div className="text">New Category</div>
                  </Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/admin/categories">
                    <div className="text">Categories</div>
                  </Link>
                </li>
              </ul>
            </li>
            

            {/* Order */}
            <li className={`menu-item has-children ${openMenus.order ? "active" : ""}`}>
              <Link 
              to=""
              className="menu-item-button" onClick={() => toggleMenu("order")}>
                <div className="icon">
                  <i className="icon-file-plus"></i>
                </div>
                <div className="text">Order</div>
              </Link>
              <ul className="sub-menu" style={{ display: openMenus.order ? "block" : "none" }}>
                <li className="sub-menu-item">
                  <Link to="/admin/orders">
                    <div className="text">Orders</div>
                  </Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/admin/order-tracking">
                    <div className="text">Order tracking</div>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Other Menu Items */}
            <li className="menu-item">
              <Link to="/admin/coupons">
                <div className="icon">
                  <i className="icon-grid"></i>
                </div>
                <div className="text">Coupons</div>
              </Link>
            </li>

            <li className="menu-item">
              <Link to="/admin/users">
                <div className="icon">
                  <i className="icon-user"></i>
                </div>
                <div className="text">User</div>
              </Link>
            </li>

            <li className="menu-item">
              <Link to="/admin/settings">
                <div className="icon">
                  <i className="icon-settings"></i>
                </div>
                <div className="text">Settings</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
