
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginPageProps = {
  onLogin: (email: string, password: string) => boolean;
};

function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("testuser@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = onLogin(email, password);

    if (success) {
      navigate("/products");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <a className="logo login-logo" href="/">
          ShopZone<span>.</span>
        </a>

        <h1>Welcome Back!</h1>
        <p>Sign in to continue shopping.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            data-testid="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            data-testid="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
            Sign In
          </button>
        </form>

        <div className="demo-credentials">
          <strong>Demo Login Credentials</strong>
          <p>Email: testuser@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
