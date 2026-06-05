import { useState } from "react";
import { Link } from "react-router-dom";

function Checkout() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hospital: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod",
    upiId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });
  const [ordered, setOrdered] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalAmount = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      userId: user?.id || 0,
      totalAmount: totalAmount || 0,
      paymentMethod: form.payment,
      deliveryAddress: `${form.address}, ${form.city} - ${form.pincode}`,
      hospitalName: form.hospital,
      items:
        cartItems.length > 0
          ? cartItems.map((i) => ({
              productId: i.id || 0,
              productName: i.name,
              quantity: i.qty,
              price: i.price,
            }))
          : [],
    };

    try {
      const res = await fetch("http://localhost:5188/api/Order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderNumber(data.orderNumber);
        localStorage.removeItem("cart");
        setOrdered(true);
      } else {
        alert("Order failed! Try again.");
      }
    } catch (err) {
      alert("Server se connect nahi ho paya.");
    } finally {
      setLoading(false);
    }
  };

  if (ordered)
    return (
      <div style={styles.success}>
        <div style={styles.successIcon}>✅</div>
        <h2 style={styles.successTitle}>Order Placed Successfully!</h2>
        <p style={styles.successDesc}>
          Your order has been confirmed. Expected delivery in 4-6 hours.
        </p>
        <div style={styles.orderNum}>Order #{orderNumber}</div>
        <Link to="/" style={styles.homeBtn}>
          Back to Home
        </Link>
      </div>
    );

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Checkout</h2>

      <div style={styles.steps}>
        {["Delivery", "Payment", "Review"].map((s, i) => (
          <div key={i} style={styles.stepItem}>
            <div
              style={{
                ...styles.stepCircle,
                ...(step >= i + 1 ? styles.stepActive : {}),
              }}
            >
              {i + 1}
            </div>
            <span
              style={{
                ...styles.stepLabel,
                ...(step >= i + 1 ? { color: "#0F6E56" } : {}),
              }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>

      <div style={styles.layout}>
        <div style={styles.formBox}>

          {/* ───── STEP 1: DELIVERY ───── */}
          {step === 1 && (
            <div>
              <h3 style={styles.stepTitle}>Delivery Details</h3>
              <div style={styles.grid2}>
                <div style={styles.field}>
                  <label style={styles.label}>Full Name</label>
                  <input style={styles.input} name="name" value={form.name} onChange={handle} placeholder="Dr. Rahul Sharma" />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Phone</label>
                  <input style={styles.input} name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" />
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input style={styles.input} name="email" value={form.email} onChange={handle} placeholder="doctor@hospital.com" />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Hospital Name</label>
                <input style={styles.input} name="hospital" value={form.hospital} onChange={handle} placeholder="City General Hospital" />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Address</label>
                <input style={styles.input} name="address" value={form.address} onChange={handle} placeholder="Building, Street, Area" />
              </div>
              <div style={styles.grid2}>
                <div style={styles.field}>
                  <label style={styles.label}>City</label>
                  <input style={styles.input} name="city" value={form.city} onChange={handle} placeholder="Mumbai" />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Pincode</label>
                  <input style={styles.input} name="pincode" value={form.pincode} onChange={handle} placeholder="400001" />
                </div>
              </div>
              <button style={styles.nextBtn} onClick={() => setStep(2)}>
                Continue to Payment →
              </button>
            </div>
          )}

          {/* ───── STEP 2: PAYMENT ───── */}
          {step === 2 && (
            <div>
              <h3 style={styles.stepTitle}>Payment Method</h3>

              {/* Payment Options */}
              {[
                { value: "cod",  label: "💵 Cash on Delivery" },
                { value: "upi",  label: "📱 UPI Payment" },
                { value: "card", label: "💳 Credit / Debit Card" },
                { value: "neft", label: "🏦 NEFT / Bank Transfer" },
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setForm({ ...form, payment: opt.value })}
                  style={{
                    ...styles.payOption,
                    ...(form.payment === opt.value ? styles.payActive : {}),
                  }}
                >
                  <div style={styles.radio}>
                    {form.payment === opt.value && <div style={styles.radioDot} />}
                  </div>
                  {opt.label}
                </div>
              ))}

              {/* ── UPI Section ── */}
              {form.payment === "upi" && (
                <div style={styles.payDetails}>
                  {/* QR Code Image */}
                  <div style={{ textAlign: "center", marginBottom: "16px" }}>
                    <img
                      src="/scanner_shakil.jpeg"
                      alt="UPI QR Code"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "contain",
                        borderRadius: "10px",
                        border: "2px solid #c3e8dc",
                      }}
                    />
                    <p style={styles.upiIdText}>📱 UPI ID: 9102535315@ptaxis</p>
                    <p style={styles.upiHint}>
                      Scan karo aur payment karo, phir Transaction ID neeche enter karo
                    </p>
                  </div>

                  {/* Transaction ID Input */}
                  <div style={styles.field}>
                    <label style={styles.label}>UPI Transaction ID *</label>
                    <input
                      style={styles.input}
                      name="upiId"
                      value={form.upiId}
                      onChange={handle}
                      placeholder="e.g. 123456789012"
                    />
                  </div>
                </div>
              )}

              {/* ── Card Section ── */}
              {form.payment === "card" && (
                <div style={styles.payDetails}>
                  <div style={styles.field}>
                    <label style={styles.label}>Card Number *</label>
                    <input
                      style={styles.input}
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={(e) =>
                        setForm({ ...form, cardNumber: e.target.value.replace(/\D/g, "").slice(0, 16) })
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                    />
                  </div>
                  <div style={styles.grid2}>
                    <div style={styles.field}>
                      <label style={styles.label}>Expiry Date *</label>
                      <input
                        style={styles.input}
                        name="cardExpiry"
                        value={form.cardExpiry}
                        onChange={handle}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div style={styles.field}>
                      <label style={styles.label}>CVV *</label>
                      <input
                        style={styles.input}
                        name="cardCvv"
                        value={form.cardCvv}
                        onChange={(e) =>
                          setForm({ ...form, cardCvv: e.target.value.replace(/\D/g, "").slice(0, 3) })
                        }
                        placeholder="123"
                        type="password"
                        maxLength={3}
                      />
                    </div>
                  </div>
                  <div style={styles.field}>
                    <label style={styles.label}>Cardholder Name *</label>
                    <input
                      style={styles.input}
                      name="cardName"
                      value={form.cardName}
                      onChange={handle}
                      placeholder="Name as on card"
                    />
                  </div>
                </div>
              )}

              {/* ── NEFT Section ── */}
              {form.payment === "neft" && (
                <div style={styles.payDetails}>
                  <p style={{ fontSize: "14px", color: "#555", marginBottom: "8px" }}>
                    Bank transfer ke liye yeh details use karein:
                  </p>
                  <div style={styles.neftRow}><span>Bank</span><span>Axis Bank</span></div>
                  <div style={styles.neftRow}><span>Account No.</span><span>9102535315</span></div>
                  <div style={styles.neftRow}><span>IFSC</span><span>UTIB0000001</span></div>
                  <div style={styles.neftRow}><span>Name</span><span>Md Shakil Ansari</span></div>
                </div>
              )}

              {/* Buttons */}
              <div style={styles.btnRow}>
                <button style={styles.backBtn} onClick={() => setStep(1)}>← Back</button>
                <button
                  style={styles.nextBtn}
                  onClick={() => {
                    if (form.payment === "upi" && !form.upiId) {
                      alert("Please enter UPI Transaction ID");
                      return;
                    }
                    if (form.payment === "card" && (!form.cardNumber || !form.cardExpiry || !form.cardCvv || !form.cardName)) {
                      alert("Please fill all card details");
                      return;
                    }
                    setStep(3);
                  }}
                >
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* ───── STEP 3: REVIEW ───── */}
          {step === 3 && (
            <div>
              <h3 style={styles.stepTitle}>Review Order</h3>
              <div style={styles.reviewBox}>
                <div style={styles.reviewRow}><span>Name</span><span>{form.name || "N/A"}</span></div>
                <div style={styles.reviewRow}><span>Hospital</span><span>{form.hospital || "N/A"}</span></div>
                <div style={styles.reviewRow}>
                  <span>Address</span>
                  <span>{form.address}, {form.city} - {form.pincode}</span>
                </div>
                <div style={styles.reviewRow}><span>Phone</span><span>{form.phone || "N/A"}</span></div>
                <div style={styles.reviewRow}>
                  <span>Payment</span>
                  <span style={{ textTransform: "uppercase", color: "#0F6E56", fontWeight: "600" }}>
                    {form.payment}
                  </span>
                </div>
                {form.payment === "upi" && form.upiId && (
                  <div style={styles.reviewRow}>
                    <span>UPI Transaction ID</span>
                    <span>{form.upiId}</span>
                  </div>
                )}
                {form.payment === "card" && form.cardNumber && (
                  <div style={styles.reviewRow}>
                    <span>Card</span>
                    <span>**** **** **** {form.cardNumber.slice(-4)}</span>
                  </div>
                )}
              </div>
              <div style={styles.btnRow}>
                <button style={styles.backBtn} onClick={() => setStep(2)}>← Back</button>
                <button style={styles.placeBtn} onClick={placeOrder} disabled={loading}>
                  {loading ? "Placing Order..." : "✅ Place Order"}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ORDER SUMMARY */}
        <div style={styles.summary}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item, i) => (
              <div key={i} style={styles.summaryRow}>
                <span>{item.name} x{item.qty}</span>
                <span>₹{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))
          ) : (
            <div style={styles.summaryRow}>
              <span style={{ color: "#888" }}>Cart mein koi item nahi</span>
            </div>
          )}
          <div style={styles.divider} />
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ color: "#0F6E56" }}>FREE</span>
          </div>
          <div style={{ ...styles.summaryRow, fontWeight: "700", fontSize: "17px" }}>
            <span>Total</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "32px" },
  title: { fontSize: "24px", fontWeight: "600", marginBottom: "28px", color: "#222" },
  steps: { display: "flex", gap: "32px", marginBottom: "32px" },
  stepItem: { display: "flex", alignItems: "center", gap: "8px" },
  stepCircle: { width: "32px", height: "32px", borderRadius: "50%", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "600", color: "#aaa" },
  stepActive: { background: "#0F6E56", color: "#fff" },
  stepLabel: { fontSize: "13px", color: "#aaa", fontWeight: "500" },
  layout: { display: "grid", gridTemplateColumns: "1fr 300px", gap: "32px" },
  formBox: { background: "#fff", border: "1px solid #eee", borderRadius: "12px", padding: "28px" },
  stepTitle: { fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#222" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  field: { marginBottom: "16px" },
  label: { display: "block", fontSize: "13px", color: "#555", marginBottom: "6px", fontWeight: "500" },
  input: { width: "100%", padding: "10px 14px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" },
  nextBtn: { background: "#0F6E56", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", marginTop: "8px" },
  backBtn: { background: "#f5f5f5", color: "#555", border: "1px solid #ddd", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" },
  placeBtn: { background: "#0F6E56", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer" },
  btnRow: { display: "flex", gap: "12px", marginTop: "20px" },
  payOption: { display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "12px", cursor: "pointer", fontSize: "14px" },
  payActive: { border: "2px solid #0F6E56", background: "#f0faf6" },
  radio: { width: "18px", height: "18px", borderRadius: "50%", border: "2px solid #0F6E56", display: "flex", alignItems: "center", justifyContent: "center" },
  radioDot: { width: "8px", height: "8px", borderRadius: "50%", background: "#0F6E56" },
  payDetails: { marginTop: "4px", marginBottom: "8px", padding: "16px", background: "#f0faf6", borderRadius: "10px", border: "1px solid #c3e8dc" },
  upiIdText: { fontSize: "14px", color: "#0F6E56", fontWeight: "700", marginTop: "10px", marginBottom: "4px" },
  upiHint: { fontSize: "12px", color: "#777", marginBottom: "12px" },
  neftRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#444", padding: "8px 0", borderBottom: "1px solid #dce8e4" },
  reviewBox: { background: "#f9f9f9", borderRadius: "10px", padding: "20px", marginBottom: "20px" },
  reviewRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555", marginBottom: "12px" },
  summary: { background: "#fff", border: "1px solid #eee", borderRadius: "12px", padding: "24px", height: "fit-content" },
  summaryTitle: { fontSize: "17px", fontWeight: "600", marginBottom: "16px", color: "#222" },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#555", marginBottom: "10px" },
  divider: { borderTop: "1px solid #eee", margin: "14px 0" },
  success: { textAlign: "center", padding: "80px 32px" },
  successIcon: { fontSize: "64px", marginBottom: "16px" },
  successTitle: { fontSize: "28px", fontWeight: "700", color: "#0F6E56", marginBottom: "12px" },
  successDesc: { fontSize: "15px", color: "#666", marginBottom: "16px" },
  orderNum: { background: "#f0faf6", color: "#0F6E56", padding: "10px 24px", borderRadius: "8px", display: "inline-block", fontWeight: "600", marginBottom: "24px" },
  homeBtn: { display: "inline-block", background: "#0F6E56", color: "#fff", padding: "12px 32px", borderRadius: "8px", textDecoration: "none", fontWeight: "600" },
};

export default Checkout;
