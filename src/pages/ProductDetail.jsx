import { useParams, Link } from "react-router-dom";
import { useState } from "react";

const products = [
    {
        id: 1,
        name: "ECG Monitor Pro X3",
        price: 84500,
        oldPrice: 92000,
        category: "Equipment",
        badge: "In Stock",
        icon: "🫀",
        brand: "Philips Healthcare",
        desc: "Professional ECG monitor with 12-lead display, touch screen interface and wireless connectivity for ICU and cardiac care units.",
    },
    {
        id: 2,
        name: "Insulin Syringes 100pk",
        price: 320,
        oldPrice: 380,
        category: "Injectables",
        badge: "Rx Only",
        icon: "💉",
        brand: "BD Medical",
        desc: "Ultra fine insulin syringes with 31G needle. Pack of 100. Sterile and individually wrapped for safe single use.",
    },
    {
        id: 3,
        name: "Surgical Gloves L Box",
        price: 1150,
        oldPrice: 1400,
        category: "Disposables",
        badge: "Bulk Deal",
        icon: "🧤",
        brand: "Ansell",
        desc: "Latex surgical gloves, powder free, sterile. Box of 50 pairs. Size Large. Ideal for OT and surgical procedures.",
    },
    {
        id: 4,
        name: "Digital Thermometer",
        price: 2800,
        oldPrice: 3200,
        category: "Equipment",
        badge: "New",
        icon: "🌡️",
        brand: "Omron",
        desc: "Non-contact infrared thermometer with 1 second reading. Memory for last 30 readings. FDA approved.",
    },
    {
        id: 5,
        name: "Paracetamol 500mg",
        price: 45,
        oldPrice: 60,
        category: "Medicines",
        badge: "In Stock",
        icon: "💊",
        brand: "Abbott",
        desc: "Paracetamol 500mg tablets. Strip of 10. For fever and mild to moderate pain relief.",
    },
    {
        id: 6,
        name: "Blood Glucose Meter",
        price: 1800,
        oldPrice: 2200,
        category: "Diagnostics",
        badge: "In Stock",
        icon: "🔬",
        brand: "Accu-Chek",
        desc: "Digital blood glucose monitoring system with 500 memory slots and average readings over 7, 14, 30 days.",
    },
    {
        id: 7,
        name: "IV Drip Set 50pk",
        price: 650,
        oldPrice: 800,
        category: "Disposables",
        badge: "Bulk Deal",
        icon: "🧪",
        brand: "B.Braun",
        desc: "Standard IV infusion set with flow regulator, 150cm tube and luer lock connector. Pack of 50. Sterile.",
    },
    {
        id: 8,
        name: "Stethoscope Pro",
        price: 3200,
        oldPrice: 3800,
        category: "Equipment",
        badge: "In Stock",
        icon: "🩺",
        brand: "3M Littmann",
        desc: "Dual head stethoscope with tunable diaphragm. Ideal for physicians, nurses and medical students.",
    },
];

function ProductDetail() {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product)
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                Product not found. <Link to="/products">Go back</Link>
            </div>
        );

    const handleAdd = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div style={styles.page}>
            <Link to="/products" style={styles.back}>
                ← Back to Products
            </Link>

            <div style={styles.container}>
                {/* LEFT - Image */}
                <div style={styles.imgBox}>
                    <div style={styles.icon}>{product.icon}</div>
                    <div style={styles.badge}>{product.badge}</div>
                </div>

                {/* RIGHT - Details */}
                <div style={styles.details}>
                    <div style={styles.category}>{product.category}</div>
                    <h1 style={styles.name}>{product.name}</h1>
                    <div style={styles.brand}>by {product.brand}</div>
                    <p style={styles.desc}>{product.desc}</p>

                    <div style={styles.priceRow}>
                        <div style={styles.price}>₹{product.price.toLocaleString()}</div>
                        <div style={styles.oldPrice}>
                            ₹{product.oldPrice.toLocaleString()}
                        </div>
                        <div style={styles.discount}>
                            {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                        </div>
                    </div>

                    {/* QTY */}
                    <div style={styles.qtyRow}>
                        <span style={styles.qtyLabel}>Quantity:</span>
                        <button
                            style={styles.qtyBtn}
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                        >
                            −
                        </button>
                        <span style={styles.qtyNum}>{qty}</span>
                        <button style={styles.qtyBtn} onClick={() => setQty((q) => q + 1)}>
                            +
                        </button>
                    </div>

                    <div style={styles.btnRow}>
                        <button style={styles.addCart} onClick={handleAdd}>
                            {added ? "✓ Added to Cart!" : "🛒 Add to Cart"}
                        </button>
                        <Link to="/checkout" style={styles.buyNow}>
                            Buy Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: { padding: "32px" },
    back: {
        color: "#0F6E56",
        textDecoration: "none",
        fontSize: "14px",
        marginBottom: "24px",
        display: "inline-block",
    },
    container: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        marginTop: "20px",
    },
    imgBox: {
        background: "#f5f5f5",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "320px",
        position: "relative",
    },
    icon: { fontSize: "100px" },
    badge: {
        position: "absolute",
        top: "16px",
        left: "16px",
        background: "#5DCAA5",
        color: "#04342C",
        fontSize: "12px",
        padding: "4px 12px",
        borderRadius: "20px",
        fontWeight: "600",
    },
    details: { padding: "8px 0" },
    category: {
        fontSize: "12px",
        color: "#0F6E56",
        fontWeight: "600",
        textTransform: "uppercase",
        marginBottom: "8px",
    },
    name: {
        fontSize: "26px",
        fontWeight: "700",
        color: "#222",
        marginBottom: "6px",
    },
    brand: { fontSize: "14px", color: "#888", marginBottom: "16px" },
    desc: {
        fontSize: "14px",
        color: "#555",
        lineHeight: "1.7",
        marginBottom: "24px",
    },
    priceRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px",
    },
    price: { fontSize: "28px", fontWeight: "700", color: "#0F6E56" },
    oldPrice: { fontSize: "16px", color: "#999", textDecoration: "line-through" },
    discount: {
        background: "#e8f8f0",
        color: "#0F6E56",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
    },
    qtyRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px",
    },
    qtyLabel: { fontSize: "14px", color: "#555" },
    qtyBtn: {
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        background: "#fff",
        fontSize: "18px",
        cursor: "pointer",
        color: "#333",
    },
    qtyNum: {
        fontSize: "16px",
        fontWeight: "600",
        minWidth: "24px",
        textAlign: "center",
    },
    btnRow: { display: "flex", gap: "12px" },
    addCart: {
        flex: 1,
        padding: "14px",
        background: "#0F6E56",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
    },
    buyNow: {
        flex: 1,
        padding: "14px",
        background: "#085041",
        color: "#fff",
        borderRadius: "10px",
        fontSize: "15px",
        fontWeight: "600",
        textDecoration: "none",
        textAlign: "center",
    },
};

export default ProductDetail;
