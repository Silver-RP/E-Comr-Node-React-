import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getPlaceOrder, cancelOrder } from "../../api/app";
import { updateOrderStatus } from "../../api/admin";
import React from "react";
import Head from "../components/Head";

// Constants
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

interface ProductImages {
  url: string;
}

interface Product {
  _id: string;
  name: string;
  cateName: string;
  price: number;
  salePrice: number;
  SKU: string;
  cateId: string;
  description: string;
  featured: boolean;
  hot: boolean;
  images: ProductImages[];
  quantity: number;
  saledQuantity: number;
  shortDescription: string;
}

interface OrderItem {
  productId: Product;
  quantity: number;
}

interface ShippingInfo {
  name: string;
  phone: string;
  city: string;
  address: string;
  addressDetails: string;
}

type OrderStatus =
  | "pending"
  | "shipping"
  | "completed"
  | "cancelled"
  | "returned";

interface Order {
  _id: string;
  createdAt: string;
  totalAmount: number;
  totalOrderValue: number;
  paymentMethod: string;
  shippingFee: number | null;
  shippingMethod: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  cancelledAt: string;
  status: OrderStatus;
  completedAt: string;
}

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided");
      setIsLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await getPlaceOrder(orderId);
        if (!response?.order) {
          throw new Error("Invalid order data received");
        }

        setOrder(response.order);
      } catch (error) {
        setError("Failed to fetch order details. Please try again later.");
        console.error("Error fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleCancelOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!order) return;

    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await cancelOrder(order._id);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to cancel order");
      }

      alert("Order has been canceled successfully!");
      navigate("/admin/orders");
    } catch (error: any) {
      setError(error.message || "An error occurred while canceling the order.");
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString();
  };

  const statusClasses: Record<string, string> = {
    pending: "text-white bg-primary",
    shipping: "text-white bg-warning",
    completed: "text-white bg-success",
    cancelled: "text-white bg-danger",
    refunded: "text-white bg-dark",
  };

  const STATUS_FLOW: Record<OrderStatus, OrderStatus[]> = {
    pending: ["cancelled", "shipping"],
    shipping: ["completed", "returned"],
    completed: [],
    cancelled: [],
    returned: [],
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const currentStatus = order?.status as OrderStatus;

    if (!STATUS_FLOW[currentStatus]?.includes(newStatus)) {
      alert("Cannot change this status!");
      return;
    }

    updateOrderStatus(orderId, newStatus)
      .then(() => {
        alert("Update status succesfully!");
        window.location.reload();
      })
      .catch((err: any) => {
        console.error("Error while update:", err);
        alert("Error while update status!");
      });
  };

  if (isLoading) {
    return (
      <main className="pt-90">
        <section className="shop-checkout container">
          <div className="flex flex-col items-center justify-center min-h-50">
            <h2 className="page-title mb-4">Loading Order Details...</h2>
            <div className="loader-spinner"></div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="pt-90">
        <section className="shop-checkout container">
          <h2 className="page-title">Error</h2>
          <p className="text-red-500">{error || "No orders found"}</p>
          <Link to="/admin" className="text-blue-500 hover:underline">
            Return to Dashboard
          </Link>
        </section>
      </main>
    );
  }

  const subtotalOrder = order.items.reduce(
    (sum, item) => sum + item.productId.salePrice * item.quantity,
    0
  );

  return (
    <>
      <Head title="Order Details" />

      <div className="main-content-inner">
        <div className="main-content-wrap">
          <div className="flex items-center flex-wrap justify-between gap20 mb-27">
            <h3>Order Details</h3>
            <ul className="breadcrumbs flex items-center flex-wrap justify-start gap10">
              <li>
                <Link to="/dashboard">
                  <div className="text-tiny">Dashboard</div>
                </Link>
              </li>
              <li>
                <i className="icon-chevron-right"></i>
              </li>
              <li>
                <div className="text-tiny">Order Items</div>
              </li>
            </ul>
          </div>

          <div className="wg-box">
            <div className="flex items-center justify-between gap10 flex-wrap">
              <div className="wg-filter flex-grow">
                <h5>Ordered Items</h5>
              </div>
              <Link className="tf-button style-1 w208" to="/orders">
                Back
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center fs-5">Name</th>
                    <th className="text-center fs-5">Price</th>
                    <th className="text-center fs-5">Sale Price</th>
                    <th className="text-center fs-5">Quantity</th>
                    <th className="text-center fs-5">SKU</th>
                    <th className="text-center fs-5">Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.length > 0 ? (
                    order.items.map((item) => (
                      <tr key={item.productId._id}>
                        <td className="pname">
                          <div className="image">
                            {item.productId.images[0] ? (
                              <img
                                src={`http://localhost:3000/app/assets/images/products/${item.productId.images[0]}`}
                                alt={item.productId.name}
                              />
                            ) : (
                              <div className="no-image">No image</div>
                            )}
                          </div>
                          <div className="name">
                            <Link
                              to={`/product/${item.productId._id}`}
                              className="body-title-2"
                            >
                              {item.productId.name}
                            </Link>
                          </div>
                        </td>
                        <td className="text-center">
                          ${item.productId.price.toFixed(2)}
                        </td>
                        <td className="text-center">
                          ${item.productId.salePrice.toFixed(2)}
                        </td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-center">{item.productId.SKU}</td>
                        <td className="text-center ">
                          ${item.productId.salePrice * item.quantity}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No items in this order
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="divider"></div>
            <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination">
              {order?.status === "pending" ? (
                <button
                  onClick={handleCancelOrder}
                  className="tf-button style-1 bg-danger text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Cancel Order"}
                </button>
              ) : (
                <button
                  className="tf-button style-1 bg-secondary text-white cursor-not-allowed"
                  disabled
                >
                  {isLoading
                    ? "Processing..."
                    : order?.status || "Unknown Status"}
                </button>
              )}
            </div>
          </div>

          <div className="wg-box mt-5">
            <h5>Shipping Address</h5>
            <div className="my-account__address-item col-md-6">
              <div className="my-account__address-item__detail">
                <p>{order.shippingInfo.name}</p>
                <p>{order.shippingInfo.phone}</p>
                <p>{order.shippingInfo.city}</p>
                <p>{order.shippingInfo.address || ""}</p>
                <p>{order.shippingInfo.addressDetails}</p>
              </div>
            </div>
          </div>

          <div className="wg-box mt-5">
            <h5>Transactions</h5>
            <table className="table table-striped table-bordered table-transaction">
              <tbody>
                <tr>
                  <th className="fs-5">Subtotal</th>
                  <td>${subtotalOrder.toFixed(2)}</td>
                  <th className="fs-5">Shipping</th>
                  <td className="">
                    {order.shippingFee
                      ? `${order.shippingMethod} ($${order.shippingFee.toFixed(
                          2
                        )})`
                      : "Free shipping"}
                  </td>
                  <th className="fs-5">Discount</th>
                  <td>$0.00</td>
                </tr>
                <tr>
                  <th className="fs-5">Total</th>
                  <td>${order.totalOrderValue.toFixed(2)}</td>
                  <th className="fs-5">Payment Mode</th>
                  <td>{order.paymentMethod}</td>
                  <th className="fs-5">Status</th>
                  <td>
                    <span
                      className={`ms-1 px-2 py-1 rounded ${
                        statusClasses[order.status.toLowerCase()] ||
                        "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                    <br />
                    Can change to:
                    <span>
                      <select
                        className="form-select fs-5"
                        defaultValue="" 
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value as OrderStatus
                          )
                        }
                      >
                        <option value="" disabled>
                          -- Select Status --
                        </option>
                        {STATUS_FLOW[
                          order?.status as keyof typeof STATUS_FLOW
                        ]?.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="fs-5">Order Date</th>
                  <td>{formatDate(order.createdAt)}</td>
                  <th className="fs-5">Delivered Date</th>
                  <td>{formatDate(order.completedAt)}</td>
                  <th className="fs-5">Canceled Date</th>
                  <td>{formatDate(order.cancelledAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
