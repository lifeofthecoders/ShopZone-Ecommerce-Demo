
import { Link } from "react-router-dom";

function readOrder(): { orderId?: string } | null {
  try {
    return JSON.parse(
      localStorage.getItem("shopzone_last_order") ||
      "null"
    ) as { orderId?: string } | null;
  } catch {
    return null;
  }
}

export default function ConfirmationPage() {
  const order = readOrder();

  return (
    <div className="confirmation-shell">
      <header className="inner-header">
        <Link className="brand" to="/products">
          <span className="brand-mark">▣</span>
          <span>
            SHOP<span className="brand-accent">ZONE</span>
          </span>
        </Link>
      </header>

      <main className="confirmation-card">
        <div
          className="confirmation-confetti"
          aria-hidden="true"
        >
          ✦　 ·　 ✧　 ·　 ✦
        </div>

        <div className="confirmation-icon">✓</div>

        <span className="section-kicker">
          THANK YOU FOR SHOPPING WITH US
        </span>

        <h1>Order Confirmed!</h1>

        <p
          data-testid="order-confirmation-message"
          className="confirmation-message"
        >
          Thank you for your purchase. Your order
          has been placed successfully.
        </p>

        <div className="order-id-box">
          <span>ORDER ID</span>
          <strong>
            {order?.orderId || "SZ-DEMO-ORDER"}
          </strong>
        </div>

        <div className="confirmation-details">
          <span>✓</span>
          <p>
            Your demo order has been recorded in this
            browser. No real payment was processed.
          </p>
        </div>

        <Link
          to="/products"
          className="checkout-button continue-button"
        >
          Continue Shopping <span>→</span>
        </Link>

        <Link
          to="/products"
          className="confirmation-back"
        >
          Back to ShopZone
        </Link>
      </main>
    </div>
  );
}
