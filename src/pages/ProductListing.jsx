import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "ECG Monitor Pro X3",
    price: 84500,
    oldPrice: 92000,
    category: "Equipment",
    badge: "In Stock",
    icon: "🫀",
  },
  {
    id: 2,
    name: "Insulin Syringes 100pk",
    price: 320,
    oldPrice: 380,
    category: "Injectables",
    badge: "Rx Only",
    icon: "💉",
  },
  {
    id: 3,
    name: "Surgical Gloves L Box",
    price: 1150,
    oldPrice: 1400,
    category: "Disposables",
    badge: "Bulk Deal",
    icon: "🧤",
  },
  {
    id: 4,
    name: "Digital Thermometer",
    price: 2800,
    oldPrice: 3200,
    category: "Equipment",
    badge: "New",
    icon: "🌡️",
  },
  {
    id: 5,
    name: "Paracetamol 500mg",
    price: 45,
    oldPrice: 60,
    category: "Medicines",
    badge: "In Stock",
    icon: "💊",
  },
  {
    id: 6,
    name: "Blood Glucose Meter",
    price: 1800,
    oldPrice: 2200,
    category: "Diagnostics",
    badge: "In Stock",
    icon: "🔬",
  },
  {
    id: 7,
    name: "IV Drip Set 50pk",
    price: 650,
    oldPrice: 800,
    category: "Disposables",
    badge: "Bulk Deal",
    icon: "🧪",
  },
  {
    id: 8,
    name: "Stethoscope Pro",
    price: 3200,
    oldPrice: 3800,
    category: "Equipment",
    badge: "In Stock",
    icon: "🩺",
  },
];

const categories = [
  "All",
  "Medicines",
  "Equipment",
  "Diagnostics",
  "Disposables",
  "Injectables",
];

function ProductListing() {
  const [selected, setSelected] = useState("All");

  const addToCart = (e, product) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        icon: product.icon,
        qty: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} cart mein add ho gaya! ✅`);
  };

  const filtered =
    selected === "All"
      ? products
      : products.filter((p) => p.category === selected);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>All Products</h2>

      <div style={styles.filters}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            style={{
              ...styles.filterBtn,
              ...(selected === cat ? styles.active : {}),
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filtered.map((p) => (
          <Link to={`/product/${p.id}`} key={p.id} style={styles.card}>
            <div style={styles.imgBox}>{p.icon}</div>
            <div style={styles.badge}>{p.badge}</div>
            <div style={styles.body}>
              <div style={styles.name}>{p.name}</div>
              <div style={styles.footer}>
                <div>
                  <div style={styles.price}>₹{p.price.toLocaleString()}</div>
                  <div style={styles.oldPrice}>
                    ₹{p.oldPrice.toLocaleString()}
                  </div>
                </div>
                <button style={styles.addBtn} onClick={(e) => addToCart(e, p)}>
                  +
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "32px" },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#222",
  },
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    color: "#555",
  },
  active: { background: "#0F6E56", color: "#fff", border: "1px solid #0F6E56" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" },
  card: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "12px",
    overflow: "hidden",
    textDecoration: "none",
    color: "#333",
    position: "relative",
  },
  imgBox: {
    height: "130px",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
  },
  badge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "#5DCAA5",
    color: "#04342C",
    fontSize: "10px",
    padding: "3px 10px",
    borderRadius: "20px",
    fontWeight: "600",
  },
  body: { padding: "14px" },
  name: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#222",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { fontSize: "16px", fontWeight: "700", color: "#0F6E56" },
  oldPrice: { fontSize: "11px", color: "#999", textDecoration: "line-through" },
  addBtn: {
    background: "#0F6E56",
    color: "#fff",
    border: "none",
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default ProductListing;
