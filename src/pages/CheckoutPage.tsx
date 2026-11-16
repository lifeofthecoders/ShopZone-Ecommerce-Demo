
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CheckoutPageProps = {
  onConfirm: () => void;
};

function CheckoutPage({ onConfirm }: CheckoutPageProps) {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!address.trim() || !payment.trim()) {
      return;
    }

    onConfirm();
    navigate("/confirmation");
  };

  return (
    <main className="page-container">
      <h1>Checkout</h1>
      <p>Complete your shipping and payment details.</p>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label htmlFor="shipping">Shipping Address</label>

        <textarea
          id="shipping"
          data-testid="shipping-address"
          placeholder="Enter your shipping address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        />

        <label htmlFor="payment">Payment Information</label>

        <input
          id="payment"
          data-testid="payment-info"
          type="text"
          placeholder="Enter demo payment information"
          value={payment}
          onChange={(event) => setPayment(event.target.value)}
          required
        />

        <button
          type="submit"
          className="primary-button"
          data-testid="confirm-purchase-button"
        >
          Confirm Purchase
        </button>
      </form>
    </main>
  );
}

export default CheckoutPage;
