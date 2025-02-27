import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPlaceOrder } from "../../api/app";
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

interface Order {
  _id: string;
  createdAt: string;
  totalAmount: number;
  totalOrderValue: number;
  paymentMethod: string;
  shippingFee: number | null;
  shippingMethod: string;
  items: OrderItem[];
}

const OrderConfirm = () => {
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
      <>
      <Head title="Order Confirm" />

        <main className="pt-90">
          <section className="shop-checkout container">
            <h2 className="page-title">Error</h2>
            <p className="text-red-500">
              {error || "Failed to load order details"}
            </p>
            <Link to="/cart" className="text-blue-500 hover:underline">
              Return to Cart
            </Link>
          </section>
        </main>
      </>
    );
  }

  // Calculate subtotal from items
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.productId.salePrice * item.quantity,
    0
  );

  return (
    <>
      <Head title="Order Confirm" />

      <main className="pt-90">
        <section className="shop-checkout container">
          <h2 className="page-title">Order Received</h2>
          <div className="checkout-steps">
            <Link to="/cart" className="checkout-steps__item active">
              <span className="checkout-steps__item-number text-black">01</span>
              <span className="checkout-steps__item-title">
                <span className="text-black">Shopping Bag</span>
                <em>Manage Your Items List</em>
              </span>
            </Link>
            <Link to="/checkout" className="checkout-steps__item active">
              <span className="checkout-steps__item-number text-black">02</span>
              <span className="checkout-steps__item-title">
                <span className="text-black">Shipping and Checkout</span>
                <em>Checkout Your Items List</em>
              </span>
            </Link>
            <Link
              to="/order-confirmation"
              className="checkout-steps__item active"
            >
              <span className="checkout-steps__item-number text-black">03</span>
              <span className="checkout-steps__item-title">
                <span className="text-black">Confirmation</span>
                <em>Review And Submit Your Order</em>
              </span>
            </Link>
          </div>

          <div className="order-complete">
            <div className="order-complete__message">
              <h3>Your order is completed!</h3>
              <p>Thank you. Your order has been received.</p>
            </div>

            <div className="order-info">
              <div className="order-info__item">
                <label>Order Number</label>
                <span>{order._id.slice(-6).toLocaleUpperCase()}</span>
              </div>
              <div className="order-info__item">
                <label>Date</label>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="order-info__item">
                <label>Total</label>
                <span>${order.totalOrderValue}</span>
              </div>
              <div className="order-info__item">
                <label>Payment Method</label>
                <span>{order.paymentMethod.toLocaleUpperCase()}</span>
              </div>
            </div>

            <div className="checkout__totals-wrapper">
              <div className="checkout__totals">
                <h3>Order Details</h3>
                <table className="checkout-cart-items">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => {
                      const itemTotal =
                        item.productId.salePrice * item.quantity;
                      return (
                        <tr key={item.productId._id} className="ps-5">
                          <td className="ps-3 fs-6">
                            {item.productId.name} x {item.quantity}
                          </td>
                          <td className="pe-5 fs-6">${itemTotal}</td>
                          <td></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <table className="checkout-totals ">
                  <tbody>
                    <tr>
                      <th>TOTAL PRODUCTS</th>
                      <td className=" fs-6">
                        {order.totalAmount}
                        <span>
                          {" "}
                          {order.totalAmount > 1 ? "items" : "item"}{" "}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>SUBTOTAL PRODUCTS</th>
                      <td className=" fs-6">${subtotal}</td>
                    </tr>
                    <tr>
                      <th>SHIPPING</th>
                      <td className=" fs-6">
                        {order.shippingFee
                          ? `${order.shippingMethod} ($${order.shippingFee})`
                          : "Free shipping"}
                      </td>
                    </tr>
                    <tr>
                      <th className=" fs-6 fw-semibold">TOTAL</th>
                      <td className=" fs-6">${order.totalOrderValue}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OrderConfirm;
