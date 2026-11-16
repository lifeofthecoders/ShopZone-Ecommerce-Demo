
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";

import type { Product } from "./types/product";

import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";

// Cart storage key
const CART_STORAGE_KEY = "shopzone_cart";

// Authentication helpers
function hasSession(): boolean {
  return document.cookie
    .split("; ")
    .some((cookie) => cookie === "shopzone_session=active");
}

function saveSession(): void {
  document.cookie = "shopzone_session=active; Path=/; SameSite=Lax";
}

function removeSession(): void {
  document.cookie =
    "shopzone_session=; Max-Age=0; Path=/; SameSite=Lax";
}

// Cart storage helper
function loadCart(): Product[] {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? (JSON.parse(savedCart) as Product[]) : [];
  } catch {
    return [];
  }
}

// Protected Route
function ProtectedRoute({
  authenticated,
  children,
}: {
  authenticated: boolean;
  children: React.ReactNode;
}) {
  const sessionValid = authenticated && hasSession();

  return sessionValid ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
}

// Main ShopZone Application
function ShopZoneApp() {
  const [authenticated, setAuthenticated] = useState(hasSession);
  const [cart, setCart] = useState<Product[]>(loadCart);

  // Persist cart in local storage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Login
  const login = (email: string, password: string): boolean => {
    if (
      email.trim().toLowerCase() === "testuser@example.com" &&
      password === "password123"
    ) {
      saveSession();
      setAuthenticated(true);
      return true;
    }

    return false;
  };

  // Logout
  const logout = () => {
    removeSession();
    setAuthenticated(false);
  };

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((current) => [...current, product]);
  };

  // Remove product from cart
  const removeFromCart = (index: number) => {
    setCart((current) => current.filter((_, i) => i !== index));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={authenticated ? "/products" : "/login"}
            replace
          />
        }
      />

      <Route
        path="/login"
        element={
          hasSession() ? (
            <Navigate to="/products" replace />
          ) : (
            <LoginPage onLogin={login} />
          )
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute authenticated={authenticated}>
            <ProductsPage
              cart={cart}
              addToCart={addToCart}
              onLogout={logout}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute authenticated={authenticated}>
            <CartPage
              cart={cart}
              onRemove={removeFromCart}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute authenticated={authenticated}>
            <CheckoutPage onConfirm={() => {}} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/confirmation"
        element={
          <ProtectedRoute authenticated={authenticated}>
            <ConfirmationPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

// Application Entry
function App() {
  return (
    <BrowserRouter>
      <ShopZoneApp />
    </BrowserRouter>
  );
}

export default App;
