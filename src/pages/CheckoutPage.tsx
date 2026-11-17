
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

export type PaymentMethod = "card" | "cash";

export type CheckoutDetails = {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
};

type Props = {
  onConfirm: (details: CheckoutDetails) => string;
  cart: Product[];
};

const money = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

export default function CheckoutPage({
  onConfirm,
  cart,
}: Props) {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!cart.length) {
      navigate("/cart");
      return;
    }

    if (
      !name.trim() ||
      !email.trim() ||
      !address.trim() ||
      !payment
    ) {
      return;
    }

    const orderId = onConfirm({
      customerName: name.trim(),
      customerEmail: email.trim(),
      shippingAddress: address.trim(),
      paymentMethod: payment,
    });

    navigate("/confirmation", {
      state: { orderId },
    });
  };

  if (!cart.length) {
    return (
      <div className="inner-page">
        <header className="inner-header">
          <Link className="brand" to="/products">
            SHOP<span className="brand-accent">ZONE</span>
          </Link>
        </header>

        <main className="empty-state">
          <h2>Your cart is empty</h2>
          <p>
            Add products before proceeding to checkout.
          </p>
          <Link to="/cart" className="primary-cta">
            Return to Cart
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="inner-page">
      <header className="inner-header">
        <Link className="brand" to="/products">
          <span className="brand-mark">▣</span>
          <span>
            SHOP<span className="brand-accent">ZONE</span>
          </span>
        </Link>

        <span className="checkout-secure">
          ⌑ Secure demo checkout
        </span>
      </header>

      <main className="checkout-layout">
        <div className="checkout-form-column">
          <div className="page-title-row">
            <div>
              <span className="section-kicker">
                ALMOST YOURS
              </span>

              <h1>Checkout</h1>

              <p>
                Just a few details and you're all set.
              </p>
            </div>
          </div>

          <div className="checkout-steps">
            <span className="step-done">
              1 <b>Cart</b>
            </span>
            <i />
            <span className="step-current">
              2 <b>Information</b>
            </span>
            <i />
            <span>
              3 <b>Confirmation</b>
            </span>
          </div>

          <form
            className="modern-checkout-form"
            onSubmit={handleSubmit}
          >
            {/* CONTACT INFORMATION */}
            <section className="form-section">
              <div className="form-section-heading">
                <span>01</span>

                <div>
                  <h2>Contact information</h2>
                  <p>
                    Where can we send your order updates?
                  </p>
                </div>
              </div>

              <label>
                Full name

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  data-testid="customer-name"
                />
              </label>

              <label>
                Email address

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  data-testid="customer-email"
                />
              </label>
            </section>

            {/* DELIVERY ADDRESS */}
            <section className="form-section">
              <div className="form-section-heading">
                <span>02</span>

                <div>
                  <h2>Delivery address</h2>
                  <p>
                    Enter the address where you'd like
                    your order delivered.
                  </p>
                </div>
              </div>

              <label htmlFor="shipping">
                Shipping address

                <textarea
                  id="shipping"
                  data-testid="shipping-address"
                  placeholder="House / flat, street, area, city, state and PIN code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={4}
                />
              </label>
            </section>

            {/* PAYMENT METHOD */}
            <section className="form-section">
              <div className="form-section-heading">
                <span>03</span>

                <div>
                  <h2>Payment method</h2>
                  <p>
                    Choose how you would like to pay.
                    No real payment will be processed.
                  </p>
                </div>
              </div>

              {/* CARD PAYMENT */}
              <label
                className={`payment-choice ${
                  payment === "card" ? "chosen" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  data-testid="payment-method-card"
                  checked={payment === "card"}
                  onChange={() => setPayment("card")}
                  required
                />

                <span className="payment-symbol">▰</span>

                <span>
                  <strong>Credit / Debit Card</strong>
                  <small>
                    Pay using your card. Demo selection only.
                  </small>
                </span>

                <i aria-hidden="true" />
              </label>

              {/* CASH ON DELIVERY */}
              <label
                className={`payment-choice ${
                  payment === "cash" ? "chosen" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  data-testid="payment-method-cash"
                  checked={payment === "cash"}
                  onChange={() => setPayment("cash")}
                />

                <span className="payment-symbol">₹</span>

                <span>
                  <strong>Cash on Delivery</strong>
                  <small>
                    Pay with cash when your order arrives.
                  </small>
                </span>

                <i aria-hidden="true" />
              </label>
            </section>

            {/* PLACE ORDER */}
            <button
              type="submit"
              className="checkout-button confirm-order-button"
              data-testid="confirm-purchase-button"
            >
              Place Demo Order <span>→</span>
            </button>

            <p className="demo-disclaimer">
              This is a simulated purchase. No actual
              card details or payments are collected.
            </p>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <aside className="checkout-summary">
          <span className="section-kicker">
            YOUR ORDER
          </span>

          <h2>Order Summary</h2>

          {cart.map((item, index) => (
            <div
              className="checkout-product"
              key={`${item.id}-${index}`}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <strong>{item.name}</strong>
                <small>{item.category}</small>
              </div>

              <b>{money(item.price)}</b>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong className="free-shipping">
              FREE
            </strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>{money(subtotal)}</strong>
          </div>

          <Link to="/cart" className="edit-cart-link">
            ← Edit cart
          </Link>
        </aside>
      </main>
    </div>
  );
}
