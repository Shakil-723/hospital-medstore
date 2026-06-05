import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hospital: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          navigate("/");
        } else {
          setError(res.message || "Login failed");
        }
      } else {
        const res = await registerUser({
          name: form.name,
          email: form.email,
          phone: form.phone,
          hospitalName: form.hospital,
          password: form.password,
        });
        if (res.message === "Registration successful") {
          setIsLogin(true);
          setError("Registration successful! Please login.");
        } else {
          setError(res.message || "Registration failed");
        }
      }
    } catch (err) {
      setError("Connection error. Is backend running?");
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={{ fontSize: "48px" }}>🏥</div>
          <div style={styles.logoText}>MediStore</div>
          <div style={styles.logoSub}>Hospital Procurement Portal</div>
        </div>

        <div style={styles.tabs}>
          <button
            style={{ ...styles.tab, ...(isLogin ? styles.tabActive : {}) }}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            style={{ ...styles.tab, ...(!isLogin ? styles.tabActive : {}) }}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {isLogin && (
          <div>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                name="email"
                value={form.email}
                onChange={handle}
                placeholder="doctor@hospital.com"
                type="email"
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                name="password"
                value={form.password}
                onChange={handle}
                placeholder="Enter password"
                type="password"
              />
            </div>
            <button
              style={styles.submitBtn}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to MediStore"}
            </button>
            <p style={styles.switchText}>
              Don't have an account?{" "}
              <span style={styles.switchLink} onClick={() => setIsLogin(false)}>
                Register here
              </span>
            </p>
          </div>
        )}

        {!isLogin && (
          <div>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                name="name"
                value={form.name}
                onChange={handle}
                placeholder="Dr. Rahul Sharma"
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <input
                style={styles.input}
                name="email"
                value={form.email}
                onChange={handle}
                placeholder="doctor@hospital.com"
                type="email"
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Phone Number</label>
              <input
                style={styles.input}
                name="phone"
                value={form.phone}
                onChange={handle}
                placeholder="+91 98765 43210"
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Hospital Name</label>
              <input
                style={styles.input}
                name="hospital"
                value={form.hospital}
                onChange={handle}
                placeholder="City General Hospital"
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                name="password"
                value={form.password}
                onChange={handle}
                placeholder="Create password"
                type="password"
              />
            </div>
            <button
              style={styles.submitBtn}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
            <p style={styles.switchText}>
              Already have an account?{" "}
              <span style={styles.switchLink} onClick={() => setIsLogin(true)}>
                Login here
              </span>
            </p>
          </div>
        )}

        <div style={styles.trust}>
          <span>🔒 Secure</span>
          <span>✅ CDSCO</span>
          <span>🏥 Hospital Only</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
    padding: "32px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  logo: { textAlign: "center", marginBottom: "28px" },
  logoText: { fontSize: "22px", fontWeight: "700", color: "#0F6E56" },
  logoSub: { fontSize: "12px", color: "#888", marginTop: "4px" },
  tabs: {
    display: "flex",
    background: "#f5f5f5",
    borderRadius: "10px",
    padding: "4px",
    marginBottom: "24px",
  },
  tab: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "transparent",
    fontSize: "14px",
    fontWeight: "500",
    color: "#888",
    cursor: "pointer",
  },
  tabActive: {
    background: "#fff",
    color: "#0F6E56",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  },
  error: {
    background: "#fef0f0",
    color: "#e53935",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
  },
  field: { marginBottom: "16px" },
  label: {
    display: "block",
    fontSize: "13px",
    color: "#555",
    marginBottom: "6px",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%",
    padding: "13px",
    background: "#0F6E56",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "16px",
  },
  switchText: { textAlign: "center", fontSize: "13px", color: "#888" },
  switchLink: { color: "#0F6E56", cursor: "pointer", fontWeight: "500" },
  trust: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid #eee",
    fontSize: "11px",
    color: "#aaa",
  },
};

export default Login;
