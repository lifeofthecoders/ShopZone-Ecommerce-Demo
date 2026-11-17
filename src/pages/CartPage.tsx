
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

type Props = {
  cart: Product[];
  onRemove: (index: number) => void;
  onQuantityChange: (
    productId: string,
    change: number
  ) => void;
};

const money = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

export default function CartPage({
  cart,
  onRemove,
  onQuantityChange,
}: Props) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const grouped = cart.reduce<
    Array<{
      product: Product;
      quantity: number;
      firstIndex: number;
    }>
  >((items, product, index) => {
    const existing = items.find(
      (item) => item.product.id === product.id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        product,
        quantity: 1,
        firstIndex: index,
      });
    }

    return items;
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="inner-page">
      <header className="inner-header">
        <Link className="brand" to="/products">
          <span className="brand-mark">▣</span>
          <span>
            SHOP<span className="brand-accent">ZONE</span>
          </span>
        </Link>

        <Link to="/products" className="back-link">
          ← Continue shopping
        </Link>
      </header>

      <main className="cart-page-content">
        <div className="page-title-row">
          <div>
            <span className="section-kicker">
              YOUR SELECTION
            </span>

            <h1>
              Your Cart
              <span>
                ({cart.length}{" "}
                {cart.length === 1 ? "item" : "items"})
              </span>
            </h1>

            <p>
              Review your items before you check out.
            </p>
          </div>

          <span className="secure-note">
            ⌑ Secure demo checkout
          </span>
        </div>

        {cart.length === 0 ? (
          <div
            className="empty-state"
            data-testid="empty-cart-message"
          >
            <span>🛒</span>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added anything yet.
              Discover something you love.
            </p>

            <Link
              className="primary-cta"
              to="/products"
            >
              Discover products <span>→</span>
            </Link>

            <button
              type="button"
              className="checkout-button empty-checkout-button"
              data-testid="checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Checkout <span>→</span>
            </button>
          </div>
        ) : (
          <div className="cart-columns">
            <section className="cart-items-panel">
              {grouped.map(
                ({ product, quantity, firstIndex }) => (
                  <article
                    className="cart-line-item"
                    key={product.id}
                    data-testid={`cart-item-${product.id}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <div className="cart-line-details">
                      <span>{product.category}</span>

                      <h3>{product.name}</h3>

                      <p>{product.description}</p>

                      <div className="quantity-control">
                        <button
                          type="button"
                          aria-label={`Decrease ${product.name} quantity`}
                          onClick={() =>
                            onQuantityChange(product.id, -1)
                          }
                        >
                          −
                        </button>

                        <strong>{quantity}</strong>

                        <button
                          type="button"
                          aria-label={`Increase ${product.name} quantity`}
                          onClick={() =>
                            onQuantityChange(product.id, 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-line-price">
                      <strong>
                        {money(product.price * quantity)}
                      </strong>

                      <button
                        type="button"
                        className="remove-item"
                        aria-label={`Remove ${product.name}`}
                        onClick={() =>
                          onRemove(firstIndex)
                        }
                      >
                        ⌫
                      </button>
                    </div>
                  </article>
                )
              )}
            </section>

            <aside className="order-summary">
              <span className="section-kicker">
                SUMMARY
              </span>

              <h2>Order Summary</h2>

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

              <div className="summary-row">
                <span>Tax</span>
                <strong>Included</strong>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>{money(subtotal)}</strong>
              </div>

              <button
                type="button"
                className="checkout-button"
                data-testid="checkout-button"
                onClick={handleCheckout}
              >
                Proceed to Checkout <span>→</span>
              </button>

              <p className="summary-footnote">
                Demo checkout · No real payment will be charged.
              </p>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
