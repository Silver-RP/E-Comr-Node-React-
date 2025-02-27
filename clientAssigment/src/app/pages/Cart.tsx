import Head from "../components/Head";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, loadCart, updateCartQuantity, handleRemoveItem } = useCart();
  const [shipping, setShipping] = useState({ method: "Free shipping", fee: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadCart(token);
    }
  }, []);

  const subtotal = cart
  .filter((item: any) => item?.productId?.salePrice)
  .reduce((acc: number, item: any) => acc + item.productId.salePrice * item.quantity, 0);

  
  const total = subtotal + shipping.fee;
  
  const cartData = { cart, subtotal, total, shippingMethod: shipping.method, shippingFee: shipping.fee };
  localStorage.setItem("cart", JSON.stringify(cartData));

  const increaseQuantity = (productId: any, currentQuantity: number) => {
    if (currentQuantity >= 100) {
      alert(
        "Maximum quantity reached (100). Please contact us if you need to order a large number!"
      );
      return;
    }
    updateCartQuantity(productId, currentQuantity + 1);
  };

  const decreaseQuantity = (productId: any, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateCartQuantity(productId, currentQuantity - 1);
    }
  };

  const handleShippingChange = (method: string, fee: number) => {
    setShipping({ method, fee });
  };

  return (
    <>
      <Head title="Cart" />
      <main className="pt-60">
        <div className="mb-4 pb-4"></div>
        <section className="shop-checkout container">
          <h2 className="page-title">Cart</h2>
          <div className="checkout-steps">
            <Link to="/cart" className="checkout-steps__item active">
              <span className="checkout-steps__item-number text-black">01</span>
              <span className="checkout-steps__item-title">
                <span className="text-black">Shopping Bag</span>
                <em>Manage Your Items List</em>
              </span>
            </Link>
          </div>
          <div className="shopping-cart">
            <div className="cart-table__wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th></th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length > 0 ? (
                    cart.map((item: any) => (
                      <tr key={item.productId._id}>
                        <td>
                          <div className="shopping-cart__product-item">
                            <img
                              loading="lazy"
                              src={`http://localhost:3000/app/assets/images/products/${item.productId.images[0]}`}
                              width="120"
                              height="120"
                              alt={item.name}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="shopping-cart__product-item__detail">
                            <h4>{item.productId.name}</h4>
                            <ul className="shopping-cart__product-item__options">
                              <li>Color: Yellow</li>
                              <li>Size: L</li>
                            </ul>
                          </div>
                        </td>
                        <td>
                          <span className="shopping-cart__product-price text-danger">
                            ${item.productId.salePrice}
                          </span>
                          <del className="shopping-cart__product-price fs-6">
                            ${item.productId.price}
                          </del>
                        </td>
                        <td>
                          <div className="product-single__addtocart">
                            <div className="qty-control position-relative">
                              <button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(
                                    item.productId._id,
                                    item.quantity
                                  )
                                }
                                className="qty-control__reduce border-0 bg-white me-2"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                min="1"
                                onChange={(e) =>
                                  updateCartQuantity(
                                    item.productId._id,
                                    Math.min(
                                      100,
                                      Math.max(1, parseInt(e.target.value) || 1)
                                    )
                                  )
                                }
                                className="qty-control__number text-center"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  increaseQuantity(
                                    item.productId._id,
                                    item.quantity
                                  );
                                }}
                                className="qty-control__increase border-0 bg-white"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="shopping-cart__subtotal">
                            ${item.productId.salePrice * item.quantity}
                          </span>
                        </td>

                        {/* Remove product button */}
                        <td>
                          <a
                            href="#"
                            className="remove-cart"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveItem(item.productId._id);
                            }}
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="#767676"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M0.259435 8.85506L9.11449 0L10 0.885506L1.14494 9.74056L0.259435 8.85506Z" />
                              <path d="M0.885506 0.0889838L9.74057 8.94404L8.85506 9.82955L0 0.97449L0.885506 0.0889838Z" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        Your cart is empty.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="cart-table-footer">
                <form action="#" className="position-relative bg-body">
                  <input
                    className="form-control"
                    type="text"
                    name="coupon_code"
                    placeholder="Coupon Code"
                  />
                  <input
                    className="btn-link fw-medium position-absolute top-0 end-0 h-100 px-4"
                    type="submit"
                    value="APPLY COUPON"
                  />
                </form>
                <button className="btn btn-dark bg-black">UPDATE CART</button>
              </div>
            </div>
            <div className="shopping-cart__totals-wrapper">
              <div className="sticky-content">
                <div className="shopping-cart__totals">
                  <h3>Cart Totals</h3>
                  <table className="cart-totals">
                    <tbody>
                      <tr>
                        <th>Subtotal</th>
                        <td>${subtotal}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="shipping"
                              id="free_shipping"
                              checked={shipping.fee === 0}
                              onChange={() =>
                                handleShippingChange("Free shipping", 0)
                              }
                            />
                            <label htmlFor="free_shipping">Free shipping</label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="shipping"
                              id="flat_rate"
                              checked={shipping.fee === 12}
                              onChange={() =>
                                handleShippingChange("Flat rate", 12)
                              }
                            />
                            <label htmlFor="flat_rate">Flat rate: $12</label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="shipping"
                              id="local_pickup"
                              checked={shipping.fee === 8}
                              onChange={() =>
                                handleShippingChange("Local pickup", 8)
                              }
                            />
                            <label htmlFor="local_pickup">
                              Local pickup: $8
                            </label>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <th>Total</th>
                        <td>${total}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mobile_fixed-btn_wrapper">
                  <div className="button-wrapper container">
                    <Link
                      to="/checkout"
                      className="btn btn-primary btn-checkout bg-black text-center pt-3"
                    >
                      PROCEED TO CHECKOUT
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Cart;
