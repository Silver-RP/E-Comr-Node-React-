import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import Head from "../components/Head";


const Checkout = () => {
  const cartData = JSON.parse(localStorage.getItem("cart") || "{}");
  const cart = cartData.cart || [];
  const subtotal = cartData.subtotal || 0;
  const total = cartData.total || 0;
  const shippingFee = cartData.shippingFee || 0;

  const { handlePlaceOrder } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("paypal");

  return (
    <>
      <Head title="Checkout" />
      <main className="pt-90">
        <div className="mb-4 pb-4"></div>
        <section className="shop-checkout container">
          <h2 className="page-title">Shipping and Checkout</h2>
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
          </div>
          <form name="checkout-form">
            <div className="checkout-form">
              <div className="billing-info__wrapper">
                <h4>SHIPPING DETAILS</h4>

                <div className="row mt-5">
                  <div className="col-md-6 mb-3">
                    <label>
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>
                      Town / City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>
                      Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label>
                      Address Details <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="address-details"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="checkout__totals-wrapper mt-4">
                <div className="checkout__totals">
                  <h3>Your Order</h3>
                  <table className="checkout-cart-items">
                    <thead>
                      <tr>
                        <th>PRODUCT</th>
                        <th align="right">SUBTOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item: any) => (
                        <tr key={item.productId._id}>
                          <td>
                            {item.productId.name} x {item.quantity}
                          </td>
                          <td align="right">
                            ${item.productId.salePrice * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <table className="checkout-totals">
                    <tbody>
                      <tr>
                        <th>SUBTOTAL</th>
                        <td align="right">${subtotal}</td>
                      </tr>
                      <tr>
                        <th>SHIPPING</th>
                        <td align="right">${shippingFee}</td>
                      </tr>
                      <tr>
                        <th className="fw-bold fs-5">TOTAL</th>
                        <td align="right" className="fw-bold fs-5">
                          ${total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="checkout__payment-methods">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                      id="paypal"
                      checked={selectedPayment === "paypal"}
                      onChange={() => setSelectedPayment("paypal")}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      Direct bank transfer
                      <p>Make your payment directly into our bank account.</p>
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                      id="cash_on_delivery"
                      checked={selectedPayment === "cash_on_delivery"}
                      onChange={() => setSelectedPayment("cash_on_delivery")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="cash_on_delivery"
                    >
                      Cash on delivery
                      <p>Make sure your address is correct.</p>
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="payment_method"
                      id="paypal"
                      checked={selectedPayment === "paypal"}
                      onChange={() => setSelectedPayment("paypal")}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                      <p>Please enter your PayPal email.</p>
                    </label>
                  </div>

                  <div className="policy-text">
                    Your personal data will be used to process your order,
                    support your experience, and for other purposes described in
                    our <a href="terms.html">privacy policy</a>.
                  </div>
                </div>

                <button
                  className="btn bg-black text-white btn-checkout"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePlaceOrder();
                  }}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default Checkout;
