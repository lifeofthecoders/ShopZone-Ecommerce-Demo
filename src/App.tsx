
import { useEffect, useState, type ReactNode } from "react";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import type { Product } from "./types/product";
import type { CheckoutDetails } from "./pages/CheckoutPage";

import "./App.css";

import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";

const CART_STORAGE_KEY = "shopzone_cart";
const ORDER_STORAGE_KEY = "shopzone_last_order";

// Check whether the user has an active session.
function hasSession(): boolean {
  return document.cookie
    .split("; ")
    .some((cookie) => cookie === "shopzone_session=active");
}

// Create a session after successful login.
function saveSession(): void {
  document.cookie =
    "shopzone_session=active; Path=/; SameSite=Lax";
}

// Remove the session during logout.
function removeSession(): void {
  document.cookie =
    "shopzone_session=; Max-Age=0; Path=/; SameSite=Lax";
}

// Load cart contents from localStorage.
function loadCart(): Product[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed: unknown = JSON.parse(saved);

    return Array.isArray(parsed)
      ? (parsed as Product[])
      : [];
  } catch {
    return [];
  }
}

// Protect routes that require authentication.
function ProtectedRoute({
  authenticated,
  children,
}: {
  authenticated: boolean;
  children: ReactNode;
}) {
  return authenticated && hasSession() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
}

// Main ShopZone application.
function ShopZoneApp() {
  const [authenticated, setAuthenticated] =
    useState<boolean>(hasSession);

  const [cart, setCart] =
    useState<Product[]>(loadCart);

  // Persist cart changes.
  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );
  }, [cart]);

  // Login validation.
  const login = (
    email: string,
    password: string
  ): boolean => {
    if (
      email.trim().toLowerCase() !==
        "testuser@example.com" ||
      password !== "password123"
    ) {
      return false;
    }

    saveSession();
    setAuthenticated(true);

    return true;
  };

  // Logout.
  const logout = (): void => {
    removeSession();
    setAuthenticated(false);
  };

  // Add a product to the cart.
  const addToCart = (product: Product): void => {
    setCart((current) => [
      ...current,
      product,
    ]);
  };

  // Remove a product from the cart.
  const removeFromCart = (index: number): void => {
    setCart((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  // Update product quantity.
  const updateQuantity = (
    productId: string,
    change: number
  ): void => {
    setCart((current) => {
      if (change > 0) {
        const existing = current.find(
          (item) => item.id === productId
        );

        return existing
          ? [...current, existing]
          : current;
      }

      const index = current.findIndex(
        (item) => item.id === productId
      );

      return index < 0
        ? current
        : current.filter((_, i) => i !== index);
    });
  };

  // Save a completed order.
  const confirmOrder = (
    details: CheckoutDetails
  ): string => {
    const orderId = `SZ-${Date.now()}`;

    const total = cart.reduce(
      (sum, item) => sum + item.price,
      0
    );

    const order = {
      orderId,

      customerName: details.customerName,
      customerEmail: details.customerEmail,

      shippingAddress: details.shippingAddress,

      paymentMethod: details.paymentMethod,

      items: [...cart],

      total,

      createdAt: new Date().toISOString(),
    };

    // Save the order before clearing the cart.
    localStorage.setItem(
      ORDER_STORAGE_KEY,
      JSON.stringify(order)
    );

    // Clear the cart after successful order creation.
    setCart([]);

    return orderId;
  };

  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          <Navigate
            to={
              authenticated
                ? "/products"
                : "/login"
            }
            replace
          />
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          hasSession() ? (
            <Navigate
              to="/products"
              replace
            />
          ) : (
            <LoginPage onLogin={login} />
          )
        }
      />

      {/* Products */}
      <Route
        path="/products"
        element={
          <ProtectedRoute
            authenticated={authenticated}
          >
            <ProductsPage
              cart={cart}
              addToCart={addToCart}
              onLogout={logout}
            />
          </ProtectedRoute>
        }
      />

      {/* Cart */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute
            authenticated={authenticated}
          >
            <CartPage
              cart={cart}
              onRemove={removeFromCart}
              onQuantityChange={updateQuantity}
            />
          </ProtectedRoute>
        }
      />

      {/* Checkout */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute
            authenticated={authenticated}
          >
            <CheckoutPage
              cart={cart}
              onConfirm={confirmOrder}
            />
          </ProtectedRoute>
        }
      />

      {/* Order Confirmation */}
      <Route
        path="/confirmation"
        element={
          <ProtectedRoute
            authenticated={authenticated}
          >
            <ConfirmationPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

// Application entry point.
export default function App() {
  return (
    <BrowserRouter>
      <ShopZoneApp />
    </BrowserRouter>
  );
}
