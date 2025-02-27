import { Routes, Route } from "react-router-dom";
import Layout from "../app/Layout";
import Home from "../app/pages/Home";
import Shop from "../app/pages/Shop";
import About from "../app/pages/About";
import Contact from "../app/pages/Contact";
import ProductDetails from "../app/pages/Details";
import CategoryPro from "../app/pages/CategoryPro";
import Cart from "../app/pages/Cart";
import Checkout from "../app/pages/Checkout";
import Login from "../app/pages/Login";
import Register from "../app/pages/Register";
import VerifyEmail from "../app/pages/VerifyEmail";
import ForgotPassword from "../app/pages/ForgotPassword";
import ResetPassword from "../app/pages/ResetPassword";
import Wishlist from "../app/pages/Wishlist";
import MyAccount from "../app/pages/MyAccount";
import OrderConfirm from "../app/pages/OrderConfirm";
import OrderHistory from "../app/pages/OrderHistory";
import OrderDetails from "../app/pages/OrderDatails";
import MyAccountDetails from "../app/pages/MyAccountDetails";

import AdminLayout from "../admin/Layout";
import Dashboard from "../admin/pages/Dashboard";
import AdminProducts from "../admin/pages/Products"
import AdminAddProducts from "../admin/pages/AddProduct"
import AdminCategories from "../admin/pages/Category"
import AdminAddCategory from "../admin/pages/AddCategory"
import AdminOrders from "../admin/pages/Orders"
import AdminUsers from "../admin/pages/Users"
import AdminEditProducts from "../admin/pages/EditProduct" 
import AdminEditCategory from "../admin/pages/EditCategory"
import AdminOrderDetails from "../admin/pages/OrderDetails"
import AdminAddUsers from "../admin/pages/AddUser"
import AdminEditUsers from "../admin/pages/EditUser"

import ProtectedRoute from "../utils/ProtectedRoute";
import Unauthorized from "../app/pages/Unauthorized";



function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/my-account-details" element={<MyAccountDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/category-pro/:id" element={<CategoryPro />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirm />} />
        <Route path="/orders-history" element={<OrderHistory />} />
        <Route path="/order-details/:orderId" element={<OrderDetails />} />

      </Route>

      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AdminAddProducts />} />
          <Route path="edit-product/:id" element={<AdminEditProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="add-category" element={<AdminAddCategory />} />
          <Route path="edit-category/:id" element={<AdminEditCategory />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="order-details/:orderId" element={<AdminOrderDetails />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="add-user" element={<AdminAddUsers />} />
          <Route path="edit-user/:userId" element={<AdminEditUsers />} />

          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />

    </Routes>
  );
}

export default AppRoutes;
