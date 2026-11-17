
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { products } from "../data/products";

type Props = {
  cart: Product[];
  addToCart: (product: Product) => void;
  onLogout: () => void;
};

const categories = [
  "All Products",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Accessories",
];

const money = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

export default function ProductsPage({
  cart,
  addToCart,
  onLogout,
}: Props) {
  const [category, setCategory] =
    useState("All Products");

  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const filtered = useMemo(
    () =>
      products.filter((product) =>
        (category === "All Products" ||
          product.category === category) &&
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [category, search]
  );

  const handleAdd = (product: Product) => {
    addToCart(product);

    setToast(
      `${product.name} added to your cart`
    );

    window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="storefront">
      <header className="store-header">
        <Link
          className="brand"
          to="/products"
          aria-label="ShopZone home"
        >
          <span className="brand-mark">▣</span>
          <span>
            SHOP<span className="brand-accent">ZONE</span>
          </span>
        </Link>

        <nav className="main-nav">
          <a className="active" href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#deals">Deals</a>
        </nav>

        <div className="header-actions">
          <label className="header-search">
            <span>⌕</span>
            <input
              aria-label="Search products"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </label>

          <Link
            className="icon-link cart-nav"
            to="/cart"
            data-testid="cart-link"
            aria-label={`Cart, ${cart.length} items`}
          >
            <span>🛒</span>
            {cart.length > 0 && (
              <b>{cart.length}</b>
            )}
          </Link>

          <button
            className="header-user"
            onClick={onLogout}
            data-testid="logout-button"
            title="Logout"
            aria-label="Logout"
          >
            ♙
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero-banner" id="home">
          <div className="hero-copy">
            <span className="hero-kicker">
              NEW COLLECTION · 2026
            </span>

            <h1>
              Electronics
              <br />
              Shopping Simplified.
            </h1>

            <p>
              Discover top brands, best deals,
              and seamless checkout at ShopZone.
            </p>

            <a
              className="primary-cta"
              href="#products"
            >
              Shop Now <span>→</span>
            </a>

            <div className="hero-trust">
              <span>✦ Carefully selected products</span>
              <span>✓ Secure demo checkout</span>
            </div>
          </div>

          <div className="hero-product-wrap">
            <div className="hero-orbit" />

            <img
              className="hero-product"
              src={products[0].image}
              alt="Premium wireless headphones"
            />

            <span className="hero-product-label">
              SOUND THAT MOVES YOU
            </span>
          </div>

          <div className="hero-glow" />
        </section>

        {/* BENEFITS */}
        <section className="benefit-strip">
          <div>
            <span>✦</span>
            <section>
              <strong>Curated quality</strong>
              <small>Products worth discovering</small>
            </section>
          </div>

          <div>
            <span>🚚</span>
            <section>
              <strong>Free shipping</strong>
              <small>On every demo order</small>
            </section>
          </div>

          <div>
            <span>↻</span>
            <section>
              <strong>Easy returns</strong>
              <small>Simple shopping experience</small>
            </section>
          </div>

          <div>
            <span>♡</span>
            <section>
              <strong>Made for you</strong>
              <small>Everyday essentials</small>
            </section>
          </div>
        </section>

        {/* PRODUCT CATALOG */}
        <section
          className="catalog-layout"
          id="products"
        >
          <aside
            className="category-sidebar"
            id="categories"
          >
            <div className="sidebar-title">
              <span>EXPLORE</span>
              <h2>Categories</h2>
            </div>

            <div className="category-list">
              {categories.map((item, index) => (
                <button
                  key={item}
                  className={
                    category === item
                      ? "category-option selected"
                      : "category-option"
                  }
                  onClick={() => setCategory(item)}
                >
                  <span>
                    {["▦", "⌁", "◇", "⌂", "▧"][index]}
                  </span>

                  {item}

                  {category === item && (
                    <i>→</i>
                  )}
                </button>
              ))}
            </div>

            <div className="sidebar-promo">
              <span className="promo-spark">✦</span>
              <strong>
                Find your
                <br />
                next favorite.
              </strong>
              <small>
                Thoughtful picks for everyday life.
              </small>
              <a href="#products">
                Explore collection →
              </a>
            </div>
          </aside>

          <div className="catalog-main">
            <div className="catalog-heading">
              <div>
                <span className="section-kicker">
                  HANDPICKED FOR YOU
                </span>

                <h2>Featured Products</h2>

                <p>
                  Discover the pieces everyone is
                  talking about.
                </p>
              </div>

              <span className="product-count">
                {filtered.length} products
              </span>
            </div>

            <div className="active-filters">
              {category !== "All Products" && (
                <button
                  onClick={() =>
                    setCategory("All Products")
                  }
                >
                  {category} <span>×</span>
                </button>
              )}

              {search && (
                <button onClick={() => setSearch("")}>
                  Search: {search} <span>×</span>
                </button>
              )}
            </div>

            {filtered.length ? (
              <div className="product-grid">
                {filtered.map((product) => (
                  <article
                    className="product-card"
                    key={product.id}
                    data-testid={`product-item-${product.id}`}
                  >
                    <div className="product-photo-wrap">
                      <img
                        className="product-photo"
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />

                      {product.badge && (
                        <span className="product-badge">
                          {product.badge}
                        </span>
                      )}

                      <button
                        className="favorite-button"
                        aria-label={`Save ${product.name}`}
                        onClick={(e) =>
                          e.currentTarget.classList.toggle(
                            "favorited"
                          )
                        }
                      >
                        ♡
                      </button>
                    </div>

                    <div className="product-info">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <h3>{product.name}</h3>

                      <p>{product.description}</p>

                      <div className="product-card-footer">
                        <strong>
                          {money(product.price)}
                        </strong>

                        <button
                          className="add-cart-button"
                          data-testid={`add-to-cart-${product.id}`}
                          onClick={() =>
                            handleAdd(product)
                          }
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <span>+</span>
                          <span className="add-label">
                            Add to Cart
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <span>⌕</span>
                <h3>No products found</h3>
                <p>
                  Try another search or select a
                  different category.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All Products");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* PROMOTIONAL SECTION */}
        <section className="deal-banner" id="deals">
          <div>
            <span>THE EVERYDAY EDIT</span>
            <h2>Good finds. Better prices.</h2>
            <p>
              Explore useful essentials, thoughtfully
              picked for your routine.
            </p>
          </div>

          <a href="#products">
            Explore all products <span>→</span>
          </a>
        </section>
      </main>

      <footer className="store-footer">
        <Link className="brand" to="/products">
          <span className="brand-mark">▣</span>
          <span>
            SHOP<span className="brand-accent">ZONE</span>
          </span>
        </Link>

        <p>
          Discover more. Shop smarter. Live better.
        </p>

        <span>
          © 2026 ShopZone · Demo E-Commerce Experience
        </span>
      </footer>

      {toast && (
        <div className="toast-message" role="status">
          <span>✓</span>
          {toast}
          <Link to="/cart">View cart</Link>
        </div>
      )}
    </div>
  );
}
