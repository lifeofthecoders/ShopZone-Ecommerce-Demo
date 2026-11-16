
import type { Product } from "../types/product";
import { products } from "../data/products";

type ProductsPageProps = {
  cart: Product[];
  addToCart: (product: Product) => void;
  onLogout: () => void;
};

function ProductsPage({
  cart,
  addToCart,
  onLogout,
}: ProductsPageProps) {
  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="/products">
          ShopZone<span>.</span>
        </a>

        <nav>
          <a href="/products">Products</a>

          <a href="/cart" data-testid="cart-link">
            🛒 Cart ({cart.length})
          </a>
        </nav>

        <button
          type="button"
          className="logout-button"
          data-testid="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div>
            <p className="eyebrow">
              YOUR EVERYDAY SHOPPING DESTINATION
            </p>

            <h1>Discover products you'll love.</h1>

            <p className="hero-description">
              Shop quality products at great prices.
              Your next favorite purchase is just a click away.
            </p>

            <a href="#products" className="shop-button">
              Shop Now →
            </a>
          </div>

          <div className="hero-art">🛍️</div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR COLLECTION</p>
              <h2>Featured Products</h2>
            </div>

            <span>{products.length} products available</span>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article
                className="product-card"
                key={product.id}
                data-testid={`product-item-${product.id}`}
              >
                <div className="product-image">
                  {product.emoji}
                </div>

                <p className="category">{product.category}</p>

                <h3>{product.name}</h3>

                <div className="product-footer">
                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>

                  <button
                    type="button"
                    data-testid={`add-to-cart-${product.id}`}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        © 2026 ShopZone. Demo E-commerce Application.
      </footer>
    </div>
  );
}

export default ProductsPage;
