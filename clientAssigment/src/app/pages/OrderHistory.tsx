import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaceOrders } from "../../api/app";
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
  images: ProductImages[][];
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
  _id: string;
  createdAt: string;
  totalAmount: number;
  totalOrderValue: number;
  paymentMethod: string;
  shippingFee: number | null;
  shippingMethod: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  status: string; // Add status if it exists in your API
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Changed to array type
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getPlaceOrders();
        if (!response?.orders) {
          throw new Error("Invalid order data received");
        }
        setOrders(response.orders);
      } catch (error) {
        setError("Failed to fetch order details. Please try again later.");
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []); // Removed orderId dependency as it's not needed

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

  if (error || !orders.length) {
    return (
      <main className="pt-90">
        <section className="shop-checkout container">
          <h2 className="page-title">Error</h2>
          <p className="text-red-500">{error || "No orders found"}</p>
          <Link to="/cart" className="text-blue-500 hover:underline">
            Return to Cart
          </Link>
        </section>
      </main>
    );
  }

  console.log("Orders:", orders);

  return (
    <>
      <Head title="Order History" />
      <main className="">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <h2 className="page-title">Orders</h2>
          <div className="row">
            <MyAccountSidebar />
            <div className="col-lg-9">
              <div className="wg-table table-all-user">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th style={{ width: 80, backgroundColor: "#064944" }}>
                          OrderNo
                        </th>
                        <th style={{ backgroundColor: "#064944" }}>
                          Recipient name
                        </th>
                        <th
                          style={{ backgroundColor: "#064944" }}
                          className="text-center"
                        >
                          Phone
                        </th>
                        <th
                          style={{ backgroundColor: "#064944" }}
                          className="text-center"
                        >
                          Items
                        </th>
                        <th
                          style={{ backgroundColor: "#064944" }}
                          className="text-center"
                        >
                          Subtotal
                        </th>
                        <th
                          style={{ backgroundColor: "#064944" }}
                          className="text-center"
                        >
                          Shipping
                        </th>
                        <th
                          style={{ backgroundColor: "#064944" }}
                          className="text-center"
                        >
                          Total
                        </th>
                        <th
                          style={{ backgroundColor: "#064944" }}
                          className="text-center"
                        >
                          Status
                        </th>
                        <th
                          style={{ backgroundColor: "#064944" }}
                          className="text-center"
                        >
                          Order Date
                        </th>
                        <th style={{ backgroundColor: "#064944" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        // Calculate subtotal for each order
                        // const subtotal = order.items.reduce(
                        //   (sum, item) =>
                        //     sum + item.productId.salePrice * item.quantity,
                        //   0
                        // );

                        return (
                          <tr key={order._id}>
                            <td className="text-center">
                              {order._id.slice(-6).toUpperCase()}
                            </td>
                            <td>{order.shippingInfo.name}</td>
                            <td className="text-center">
                              {order.shippingInfo.phone}
                            </td>
                            <td className="text-center">
                              {order.items.length}
                            </td>
                            <td className="text-center">
                              {/* ${subtotal.toFixed(2)} */}
                            </td>
                            <td className="text-center">
                              {order.shippingFee
                                ? `$${order.shippingFee.toFixed(2)}`
                                : "Free"}
                            </td>
                            <td className="text-center">
                              ${order.totalOrderValue.toFixed(2)}
                            </td>
                            <td className="text-center">
                              <span
                                className={`text-center p-2 rounded ${
                                  statusClasses[order.status] ||
                                  "text-black bg-light"
                                }`}
                              >
                                {order.status || "Processing"}
                              </span>
                            </td>

                            <td className="text-center">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="text-center">
                              <Link to={`/order-details/${order._id}`}>
                                <div
                                  className="p-2 rounded"
                                  style={{
                                    backgroundColor: "#125954",
                                    color: "#ffffff",
                                  }}
                                >
                                  Show details
                                </div>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="divider"></div>
              <div className="flex items-center justify-between flex-wrap gap10 wgp-pagination"></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OrderHistory;
