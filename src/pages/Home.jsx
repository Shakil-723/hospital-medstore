import { Link } from "react-router-dom";
import { FaShippingFast, FaBoxOpen, FaHeadset } from "react-icons/fa";

function Home() {
    const categories = [
        { name: "Medicines", icon: "💊", count: "1200+ items" },
        { name: "Equipment", icon: "🏥", count: "340+ items" },
        { name: "Diagnostics", icon: "🔬", count: "228+ items" },
        { name: "Disposables", icon: "🧤", count: "180+ items" },
        { name: "Injectables", icon: "💉", count: "512+ items" },
        { name: "Lab Supplies", icon: "🧪", count: "430+ items" },
    ];

    return (
        <div>
            {/* HERO */}
            <div style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        Hospital Medical{" "}
                        <span style={{ color: "#5DCAA5" }}>Supply Store</span>
                    </h1>
                    <p style={styles.heroDesc}>
                        Medicines, Equipment & Supplies — delivered fast to your hospital.
                    </p>
                    <Link to="/products" style={styles.heroBtn}>
                        Shop Now →
                    </Link>
                </div>
                <div style={styles.heroStats}>
                    <div style={styles.statBox}>
                        <div style={styles.statNum}>12,400+</div>
                        <div style={styles.statLabel}>Products</div>
                    </div>
                    <div style={styles.statBox}>
                        <div style={styles.statNum}>850+</div>
                        <div style={styles.statLabel}>Hospitals</div>
                    </div>
                    <div style={styles.statBox}>
                        <div style={styles.statNum}>4 hrs</div>
                        <div style={styles.statLabel}>Dispatch</div>
                    </div>
                    <div style={styles.statBox}>
                        <div style={styles.statNum}>98.6%</div>
                        <div style={styles.statLabel}>Fulfillment</div>
                    </div>
                </div>
            </div>

            {/* CATEGORIES */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Browse Categories</h2>
                <div style={styles.catGrid}>
                    {categories.map((cat, i) => (
                        <Link to="/products" key={i} style={styles.catCard}>
                            <div style={styles.catIcon}>{cat.icon}</div>
                            <div style={styles.catName}>{cat.name}</div>
                            <div style={styles.catCount}>{cat.count}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* FEATURES */}
            <div style={styles.features}>
                <div style={styles.featureCard}>
                    <FaShippingFast size={32} color="#0F6E56" />
                    <h3>Fast Delivery</h3>
                    <p>Same day dispatch for urgent orders</p>
                </div>
                <div style={styles.featureCard}>
                    <FaBoxOpen size={32} color="#0F6E56" />
                    <h3>Bulk Orders</h3>
                    <p>Save up to 30% on bulk purchases</p>
                </div>
                <div style={styles.featureCard}>
                    <FaHeadset size={32} color="#0F6E56" />
                    <h3>24/7 Support</h3>
                    <p>Dedicated hospital support team</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    hero: {
        background: "#085041",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "48px 32px",
        gap: "24px",
        flexWrap: "wrap",
    },
    heroContent: { flex: 1 },
    heroTitle: {
        fontSize: "36px",
        fontWeight: "700",
        color: "#fff",
        marginBottom: "12px",
    },
    heroDesc: { fontSize: "16px", color: "#9FE1CB", marginBottom: "24px" },
    heroBtn: {
        background: "#5DCAA5",
        color: "#04342C",
        padding: "12px 28px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "600",
        fontSize: "15px",
    },
    heroStats: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
    statBox: {
        background: "rgba(255,255,255,0.1)",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
    },
    statNum: { fontSize: "24px", fontWeight: "700", color: "#5DCAA5" },
    statLabel: { fontSize: "12px", color: "#9FE1CB", marginTop: "4px" },
    section: { padding: "40px 32px" },
    sectionTitle: {
        fontSize: "22px",
        fontWeight: "600",
        marginBottom: "24px",
        color: "#222",
    },
    catGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "16px",
    },
    catCard: {
        background: "#f8f8f8",
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "20px 12px",
        textAlign: "center",
        textDecoration: "none",
        color: "#333",
    },
    catIcon: { fontSize: "32px", marginBottom: "8px" },
    catName: { fontSize: "13px", fontWeight: "600", color: "#222" },
    catCount: { fontSize: "11px", color: "#888", marginTop: "4px" },
    features: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "20px",
        padding: "0 32px 40px",
    },
    featureCard: {
        background: "#f0faf6",
        border: "1px solid #c8ead8",
        borderRadius: "12px",
        padding: "28px",
        textAlign: "center",
    },
};

export default Home;
