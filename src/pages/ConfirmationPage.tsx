
function ConfirmationPage() {
  return (
    <main className="page-container confirmation-page">
      <div className="confirmation-icon">✓</div>

      <h1>Order Confirmed!</h1>

      <p
        data-testid="order-confirmation-message"
        className="confirmation-message"
      >
        Thank you for your purchase! Your order has been placed successfully.
      </p>

      <a href="/products" className="primary-button">
        Continue Shopping
      </a>
    </main>
  );
}

export default ConfirmationPage;
