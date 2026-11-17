
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  onLogin: (email: string, password: string) => boolean;
};

export default function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState(
    "testuser@example.com"
  );

  const [password, setPassword] = useState(
    "password123"
  );

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (onLogin(email, password)) {
      navigate("/products");
    } else {
      setError(
        "Invalid email or password. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-showcase">
        <Link
          className="brand login-brand"
          to="/login"
        >
          <span className="brand-mark">▣</span>
          <span>
            SHOP<span className="brand-accent">ZONE</span>
          </span>
        </Link>

        <div className="login-showcase-copy">
          <span>YOUR NEXT FAVORITE THING</span>

          <h1>
            Good finds.
            <br />
            Great everyday.
          </h1>

          <p>
            Discover thoughtfully selected essentials,
            all in one place.
          </p>
        </div>

        <div className="login-showcase-art">
          <div className="showcase-ring" />

          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85"
            alt="Wireless headphones"
          />
        </div>

        <small>
          SHOP SMARTER · LIVE BETTER
        </small>
      </div>

      <div className="login-panel">
        <div className="login-card">
          <span className="section-kicker">
            WELCOME BACK
          </span>

          <h2>Sign in to ShopZone</h2>

          <p>
            Enter your details to continue shopping.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              data-testid="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              data-testid="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              data-testid="login-submit"
              className="login-submit"
            >
              Sign In <span>→</span>
            </button>
          </form>

          <div className="demo-credentials">
            <strong>DEMO ACCESS</strong>

            <p>
              <span>Email</span>
              testuser@example.com
            </p>

            <p>
              <span>Password</span>
              password123
            </p>
          </div>

          <small className="login-legal">
            This is a demonstration e-commerce application.
          </small>
        </div>
      </div>
    </div>
  );
}
