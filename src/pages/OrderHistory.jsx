import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const statusColor = {
  Delivered: { bg: "#e8f8f0", color: "#0F6E56" },
  Cancelled: { bg: "#fef0f0", color: "#e53935" },
  Processing: { bg: "#fff8e1", color: "#f57c00" },
  Shipped: { bg: "#e3f2fd", color: "#1976d2" },
};

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch(`http://localhost:5188/api/Order/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📦 Order History</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div style={styles.empty}>
          <div style={{ fontSize: "60px" }}>📦</div>
          <h3>No orders yet</h3>
          <Link to="/products" style={styles.shopBtn}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div style={styles.list}>
          {orders.map((order) => (
            <div key={order.id} style={styles.card}>
              <div style={styles.header}>
                <div>
                  <div style={styles.orderId}>{order.orderNumber}</div>
                  <div style={styles.orderDate}>
                    Placed on {formatDate(order.createdAt)}
                  </div>
                </div>
                <div style={styles.right}>
                  <div
                    style={{
                      ...styles.statusBadge,
                      background: statusColor[order.status]?.bg,
                      color: statusColor[order.status]?.color,
                    }}
                  >
                    {order.status}
                  </div>
                  <div style={styles.orderTotal}>
                    ₹{order.totalAmount?.toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={styles.items}>
                {order.orderItems?.map((item, i) => (
                  <div key={i} style={styles.item}>
                    <span style={styles.itemName}>{item.productName}</span>
                    <span style={styles.itemQty}>x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={styles.actions}>
                {order.status === "Delivered" && (
                  <button style={styles.reorderBtn}>🔄 Reorder</button>
                )}
                <Link to="/products" style={styles.browseBtn}>
                  Browse Similar
                </Link>
              </div>
            </div>
          ))}
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
  list: { display: "flex", flexDirection: "column", gap: "16px" },
  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "14px",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "16px",
  },
  orderId: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "4px",
  },
  orderDate: { fontSize: "12px", color: "#888" },
  right: { textAlign: "right" },
  statusBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "6px",
  },
  orderTotal: { fontSize: "16px", fontWeight: "700", color: "#0F6E56" },
  items: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    background: "#f9f9f9",
    borderRadius: "10px",
    padding: "14px",
    marginBottom: "16px",
  },
  item: { display: "flex", alignItems: "center", gap: "10px" },
  itemName: { flex: 1, fontSize: "14px", color: "#333" },
  itemQty: { fontSize: "13px", color: "#888", fontWeight: "500" },
  actions: { display: "flex", gap: "10px" },
  reorderBtn: {
    padding: "8px 18px",
    background: "#0F6E56",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  browseBtn: {
    padding: "8px 18px",
    background: "#f5f5f5",
    color: "#555",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "13px",
    textDecoration: "none",
  },
};

export default OrderHistory;
