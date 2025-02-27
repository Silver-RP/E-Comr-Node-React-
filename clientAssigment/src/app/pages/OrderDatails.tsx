import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlaceOrder, cancelOrder } from "../../api/app";
import React from "react";
import MyAccountSidebar from "../components/common/MyAccountSidebar";
import Head from "../components/Head";

interface ProductImages {
  url: string;
}

interface Product {
  _id: string;
  name: string;
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

interface Order {
  map(
    arg0: (ord: any) => import("react/jsx-runtime").JSX.Element
  ): React.ReactNode;
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
  status: string;
}

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
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
      setOrder(response.order);
      window.location.href = "/orders-history";
    } catch (error: any) {
      setError(error.message || "An error occurred while canceling the order.");
    } finally {
      setIsLoading(false);
    }
  };

  const statusClasses: Record<string, string> = {
    pending: "text-white bg-primary",
    shipping: "text-white bg-warning",
    completed: "text-white bg-success",
    cancelled: "text-white bg-danger",
    refunded: "text-white bg-dark",
  };

  if (isLoading) {
    return (
      <main className="pt-90">
        <section className="shop-checkout container">
          <h2 className="page-title">Loading Order Details...</h2>
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
          <Link to="/my-account" className="text-blue-500 hover:underline">
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
      <Head title="Order Datails" />
      <main className="pt-60" style={{ paddingTop: 0 }}>
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <h2 className="page-title">Order's Details</h2>
          <div className="row">
            <MyAccountSidebar />

            <div className="col-lg-9">
              <div className="wg-box mt-5 mb-5">
                <div className="row">
                  <div className="col-6">
                    <h5>Ordered Details</h5>
                  </div>
                  <div className="col-6 text-right">
                    <Link
                      className="btn btn-sm bg-black text-white mb-3"
                      to="/orders-history"
                    >
                      Back
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-transaction">
                    <tbody>
                      <React.Fragment key={order._id}>
                        <tr>
                          <th style={{ backgroundColor: "#064944" }}>
                            Order No
                          </th>
                          <td>{order._id.slice(-6).toUpperCase()}</td>
                          <th style={{ backgroundColor: "#064944" }}>
                            Recipient name
                          </th>
                          <td>{order.shippingInfo.name || "N/A"}</td>
                          <th style={{ backgroundColor: "#064944" }}>Mobile</th>
                          <td>{order.shippingInfo.phone || "N/A"}</td>
                        </tr>
                        <tr>
                          <th style={{ backgroundColor: "#064944" }}>
                            Order Date
                          </th>
                          <td>
                            {" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <th style={{ backgroundColor: "#064944" }}>
                            Delivered Date
                          </th>
                          <td></td>
                          <th style={{ backgroundColor: "#064944" }}>
                            Canceled Date
                          </th>
                          <td>
                            {order.cancelledAt
                              ? new Date(order.cancelledAt).toLocaleDateString()
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th style={{ backgroundColor: "#064944" }}>
                            Order Status
                          </th>
                          <td colSpan={5}>
                            <span
                              className={`text-center p-2 rounded ${
                                statusClasses[order.status] ||
                                "text-black bg-light"
                              }`}
                            >
                              {order.status || "Processing"}
                            </span>
                          </td>
                        </tr>
                      </React.Fragment>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="wg-box wg-table table-all-user">
                <div className="row">
                  <div className="col-6">
                    <h5>Ordered Items</h5>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: "#064944" }}></th>
                        <th style={{ backgroundColor: "#064944" }}>Name</th>
                        <th
                          style={{ backgroundColor: "#064944" }}
                          className="text-center"
                        >
                          Price
                        </th>
                        <th
                          style={{ backgroundColor: "#064944" }}
                          className="text-center"
                        >
                          Quantity
                        </th>
                        <th
                          style={{ backgroundColor: "#064944" }}
                          className="text-center"
                        >
                          Sub Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.productId._id}>
                          <td className="pname">
                            <div className="image">
                              <img
                                src={`http://localhost:3000/app/assets/images/products/${item.productId.images[0]}`}
                                alt={item.productId.name}
                                width={100}
                                height={100}
                              />
                            </div>
                          </td>
                          <td className="pname">
                            <div className="name">
                              <Link
                                to={`/details/${item.productId._id}`}
                                target="_blank"
                                className="body-title-2"
                              >
                                {item.productId.name}
                              </Link>
                            </div>
                          </td>
                          <td className="text-center">
                            ${item.productId.salePrice}
                          </td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-center">
                            ${item.quantity * item.productId.salePrice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="wg-box mt-5">
                <h5>Shipping Address</h5>
                <div className="my-account__address-item col-md-6">
                  <div className="my-account__address-item__detail">
                    <p className="m-2 fs-6">{order.shippingInfo.name}</p>
                    <p className="m-2 fs-6">{order.shippingInfo.phone}</p>
                    <p className="m-2 fs-6">{order.shippingInfo.city}</p>
                    <p className="m-2 fs-6">
                      {order.shippingInfo.addressDetails}
                    </p>
                    <br />
                  </div>
                </div>
              </div>

              <div className="wg-box mt-5">
                <h5>Transactions</h5>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered table-transaction">
                    <tbody>
                      <tr>
                        <th style={{ backgroundColor: "#064944" }}>Subtotal</th>
                        <td>${subtotalOrder}</td>
                        <th style={{ backgroundColor: "#064944" }}>Shipping</th>
                        <td className=" fs-6">
                          {order.shippingFee
                            ? `${order.shippingMethod} ($${order.shippingFee})`
                            : "Free shipping"}
                        </td>
                        <th style={{ backgroundColor: "#064944" }}>Discount</th>
                        <td>$0.00</td>
                      </tr>
                      <tr>
                        <th style={{ backgroundColor: "#064944" }}>Total</th>
                        <td>${order.totalOrderValue}</td>
                        <th style={{ backgroundColor: "#064944" }}>
                          Payment Method
                        </th>
                        <td>{order.paymentMethod}</td>
                        <th style={{ backgroundColor: "#064944" }}>Status</th>
                        <td>
                          <span
                            className={`text-center p-2 rounded ${
                              statusClasses[order.status] ||
                              "text-black bg-light"
                            }`}
                          >
                            {order.status || "Processing"}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="wg-box mt-5 text-right">
                <span></span>
                <form action="/account-order" method="POST">
                  <input
                    type="hidden"
                    name="_token"
                    value="3v611ELheIo6fqsgspMOk0eiSZjncEeubOwUa6YT"
                    autoComplete="off"
                  />
                  <input type="hidden" name="_method" value="PUT" />
                  {order?.status === "pending" ? (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleCancelOrder}
                      disabled={isLoading}
                    >
                      {isLoading ? "Canceling..." : "Cancel Order"}
                    </button>
                  ) : order?.status === "cancelled" ? (
                    <p className="text-danger mt-2">
                      Your order has been cancelled.
                    </p>
                  ) : (
                    <p className="text-danger mt-2">
                      ❌ You can only cancel an order when its status is
                      pending.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OrderDetails;
