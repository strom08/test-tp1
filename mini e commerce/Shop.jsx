import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decreaseStock, increaseStock } from "../store/slices/productSlice";
import { addToCart, removeFromCart, deleteItem, clearCart } from "../store/slices/cartSlice";
import { login, logout } from "../store/slices/userSlice";
import "./Shop.css";

function Shop() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [loginName, setLoginName] = useState("");

  // ── Handlers ──────────────────────────────────────────
  function handleAddToCart(product) {
    if (product.stock === 0) return;
    dispatch(addToCart(product));
    dispatch(decreaseStock(product.id));
  }

  function handleRemoveFromCart(item) {
    dispatch(removeFromCart(item.id));
    dispatch(increaseStock(item.id));
  }

  function handleDeleteItem(item) {
    for (let i = 0; i < item.quantity; i++) {
      dispatch(increaseStock(item.id));
    }
    dispatch(deleteItem(item.id));
  }

  function handleClearCart() {
    cartItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        dispatch(increaseStock(item.id));
      }
    });
    dispatch(clearCart());
  }

  function handleLogin() {
    const name = loginName.trim() || "Guest";
    dispatch(login(name));
    setLoginName("");
  }

  function handleLogout() {
    dispatch(logout());
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ── Render ─────────────────────────────────────────────
  return (
    <div className="shop">

      {/* User Section */}
      <section className="section user-section">
        <h2>Account</h2>
        {user.isLoggedIn ? (
          <div className="user-info">
            <div className="avatar">{user.name.slice(0, 2).toUpperCase()}</div>
            <div>
              <p className="user-name">{user.name}</p>
              <p className="user-status">Logged in</p>
            </div>
            <button className="btn btn-danger" onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          <div className="login-form">
            <input
              type="text"
              placeholder="Enter your name"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button className="btn btn-primary" onClick={handleLogin}>
              Log in
            </button>
          </div>
        )}
      </section>

      {/* Products Section */}
      <section className="section">
        <h2>Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="price">₹{product.price.toLocaleString()}</p>
                <span className={`stock-badge ${product.stock === 0 ? "out" : ""}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>
              <button
                className="btn btn-success"
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                + Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Section */}
      <section className="section">
        <div className="cart-header">
          <h2>Cart {totalItems > 0 && <span className="cart-count">{totalItems}</span>}</h2>
          {cartItems.length > 0 && (
            <button className="btn btn-danger btn-sm" onClick={handleClearCart}>
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <p className="cart-item-title">{item.title}</p>
                  <p className="cart-item-price">₹{item.price.toLocaleString()} × {item.quantity}</p>
                </div>
                <div className="cart-item-controls">
                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      −
                    </button>
                    <span className="qty">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => {
                        const p = products.find((x) => x.id === item.id);
                        if (p) handleAddToCart(p);
                      }}
                      disabled={products.find((x) => x.id === item.id)?.stock === 0}
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-total">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="total-row">
              <span>Total</span>
              <span className="total-price">₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Shop;
