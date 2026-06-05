import { useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty } : item,
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal;

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div style={styles.empty}>
          <div style={{ fontSize: "60px" }}>🛒</div>
          <h3>Your cart is empty</h3>
          <Link to="/products" style={styles.shopBtn}>
            Browse Products
          </Link>
        </div>
      ) : (
        <div style={styles.layout}>
          <div style={styles.items}>
            {cart.map((item) => (
              <div key={item.id} style={styles.card}>
                <div style={styles.icon}>{item.icon || "💊"}</div>
                <div style={styles.info}>
                  <div style={styles.name}>{item.name}</div>
                  <div style={styles.price}>
                    ₹{item.price?.toLocaleString()} each
                  </div>
                </div>
                <div style={styles.qtyRow}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQty(item.id, item.qty - 1)}
                  >
                    −
                  </button>
                  <span style={styles.qtyNum}>{item.qty}</span>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <div style={styles.itemTotal}>
                  ₹{(item.price * item.qty).toLocaleString()}
                </div>
                <button
                  style={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span style={{ color: "#0F6E56" }}>FREE</span>
            </div>
            <div style={styles.divider} />
            <div
              style={{
                ...styles.summaryRow,
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <Link to="/checkout" style={styles.checkoutBtn}>
              Proceed to Checkout →
            </Link>
            <Link to="/products" style={styles.continueBtn}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "32px" },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "24px",
    color: "#222",
  },
  empty: { textAlign: "center", padding: "60px", color: "#888" },
  shopBtn: {
    display: "inline-block",
    marginTop: "16px",
    background: "#0F6E56",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
  layout: { display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px" },
  items: { display: "flex", flexDirection: "column", gap: "14px" },
  card: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "16px",
  },
  icon: { fontSize: "40px", minWidth: "56px", textAlign: "center" },
  info: { flex: 1 },
  name: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#222",
    marginBottom: "4px",
  },
  price: { fontSize: "13px", color: "#888" },
  qtyRow: { display: "flex", alignItems: "center", gap: "10px" },
  qtyBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "#f5f5f5",
    fontSize: "16px",
    cursor: "pointer",
  },
  qtyNum: {
    fontSize: "15px",
    fontWeight: "600",
    minWidth: "20px",
    textAlign: "center",
  },
  itemTotal: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#0F6E56",
    minWidth: "80px",
    textAlign: "right",
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "#ccc",
    fontSize: "16px",
    cursor: "pointer",
    padding: "4px",
  },
  summary: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "12px",
    padding: "24px",
    height: "fit-content",
  },
  summaryTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#222",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#555",
    marginBottom: "12px",
  },
  divider: { borderTop: "1px solid #eee", margin: "16px 0" },
  checkoutBtn: {
    display: "block",
    background: "#0F6E56",
    color: "#fff",
    padding: "14px",
    borderRadius: "10px",
    textDecoration: "none",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "15px",
    marginTop: "20px",
  },
  continueBtn: {
    display: "block",
    textAlign: "center",
    marginTop: "12px",
    color: "#0F6E56",
    textDecoration: "none",
    fontSize: "13px",
  },
};

export default Cart;
