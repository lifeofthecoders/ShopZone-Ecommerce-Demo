
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";

type CartPageProps = {
  cart: Product[];
  onRemove: (index: number) => void;
};

function CartPage({ cart, onRemove }: CartPageProps) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      setError("Your cart is empty. Please add products before checkout.");
      return;
    }

    navigate("/checkout");
  };

  return (
    <main className="page-container">
      <h1>Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div data-testid="cart-empty-message" className="empty-cart">
          {error || "Your cart is empty. Add some products to get started."}
        </div>
      ) : (
        <div className="cart-list">
          {cart.map((item, index) => (
            <div
              className="cart-item"
              key={`${item.id}-${index}`}
              data-testid={`cart-item-${item.id}`}
            >
              <span>
                {item.emoji} {item.name}
              </span>

              <div className="cart-item-actions">
                <strong>₹{item.price.toLocaleString("en-IN")}</strong>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => onRemove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="cart-total">
            Total: ₹{total.toLocaleString("en-IN")}
          </h2>
        </div>
      )}

      <button
        type="button"
        className="primary-button"
        data-testid="checkout-button"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>

      <p>
        <a href="/products">← Continue Shopping</a>
      </p>
    </main>
  );
}

export default CartPage;
