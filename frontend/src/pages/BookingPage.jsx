import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#0061a5";
const PRIMARY_DARK = "#004d82";

const VEHICLES = [
  { icon: "🚗", label: "Sedan/Hatchback" },
  { icon: "🚙", label: "SUV/Crossover" },
  { icon: "🚐", label: "Bán tải/Van" },
  { icon: "🏍️", label: "Xe máy" },
];

const SERVICES = [
  {
    id: "standard",
    name: "Rửa cơ bản (Standard)",
    price: 150000,
    desc: "Rửa ngoài, hút bụi, lau kính, làm bóng lốp.",
    popular: false,
  },
  {
    id: "premium",
    name: "Chăm sóc chuyên sâu (Premium)",
    price: 450000,
    desc: "Standard + Tẩy nhựa đường, vệ sinh khoang máy, dưỡng nhựa nội thất.",
    popular: true,
  },
  {
    id: "ceramic",
    name: "Toàn diện (Ceramic Plus)",
    price: 1200000,
    desc: "Premium + Phủ Ceramic nhanh, khử mùi Ozone, vệ sinh gầm chi tiết.",
    popular: false,
  },
];

const TIME_SLOTS = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];

const PAYMENTS = [
  { id: "wallet", label: "Ví autoWash" },
  { id: "cash", label: "Tiền mặt tại quầy" },
  { id: "transfer", label: "Chuyển khoản (VNPay/Momo)" },
];

const STEPS = ["Chọn xe", "Dịch vụ", "Thời gian", "Thanh toán"];

const formatPrice = (n) => n.toLocaleString("vi-VN") + "đ";

export default function BookingPage() {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(0);
  const [service, setService] = useState("premium");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("09:30");
  const [payment, setPayment] = useState("wallet");

  const selectedService = SERVICES.find((s) => s.id === service);

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: 8,
    border: "1px solid #bfc7d5",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
    transition: "border 0.2s",
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#f7f9fb",
        minHeight: "100vh",
        color: "#191c1e",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e0e3e5",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 48px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            onClick={() => navigate("/")}
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: PRIMARY,
              cursor: "pointer",
            }}
          >
            autoWash
          </div>

          <div style={{ display: "flex", gap: 28 }}>
            {["Home", "Booking", "History", "Profile", "Rewards"].map(
              (item, i) => (
                <span
                  key={item}
                  onClick={() => {
                    if (item === "Home") navigate("/");
                    if (item === "Booking") navigate("/booking");
                    if (item === "Profile") navigate("/profile");
                  }}
                  style={{
                    color: i === 1 ? PRIMARY : "#6b7280",
                    fontWeight: i === 1 ? 700 : 400,
                    fontSize: 15,
                    borderBottom: i === 1 ? `2px solid ${PRIMARY}` : "none",
                    paddingBottom: 2,
                    cursor: "pointer",
                  }}
                >
                  {item}
                </span>
              ),
            )}
          </div>

          <button
            onClick={() => navigate("/booking")}
            style={{
              background: "#0d99ff",
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "8px 24px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Đặt lịch ngay
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 48px" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: PRIMARY,
              marginBottom: 12,
            }}
          >
            Đặt lịch dịch vụ
          </h1>
          <p style={{ fontSize: 18, color: "#6b7280" }}>
            Chọn các tùy chọn phù hợp để chiếc xe của bạn luôn sáng bóng.
          </p>
        </div>

        {/* PROGRESS STEPS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
            marginBottom: 48,
            flexWrap: "wrap",
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: i === 0 ? PRIMARY : "#e6e8ea",
                    color: i === 0 ? "#fff" : "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {i + 1}
                </div>
                <span
                  style={{
                    fontWeight: i === 0 ? 700 : 400,
                    color: i === 0 ? PRIMARY : "#6b7280",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: 48, height: 1, background: "#bfc7d5" }} />
              )}
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Vehicle */}
            <section
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 32,
                boxShadow: "0 4px 20px rgba(13,153,255,0.05)",
              }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: PRIMARY,
                  marginBottom: 24,
                }}
              >
                🚗 Chọn loại xe của bạn
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                }}
              >
                {VEHICLES.map((v, i) => (
                  <div
                    key={v.label}
                    onClick={() => setVehicle(i)}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      textAlign: "center",
                      cursor: "pointer",
                      border: `2px solid ${vehicle === i ? PRIMARY : "#bfc7d5"}`,
                      background: vehicle === i ? "#d2e4ff30" : "#fff",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: 36, marginBottom: 8 }}>
                      {v.icon}
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: vehicle === i ? PRIMARY : "#3f4753",
                      }}
                    >
                      {v.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Services */}
            <section
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 32,
                boxShadow: "0 4px 20px rgba(13,153,255,0.05)",
              }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: PRIMARY,
                  marginBottom: 24,
                }}
              >
                📋 Gói dịch vụ
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {SERVICES.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setService(s.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: 16,
                      borderRadius: 12,
                      cursor: "pointer",
                      border: `2px solid ${service === s.id ? PRIMARY : "#bfc7d5"}`,
                      background: service === s.id ? "#d2e4ff15" : "#fff",
                      transition: "all 0.2s",
                    }}
                  >
                    <input
                      type="radio"
                      name="service"
                      checked={service === s.id}
                      onChange={() => setService(s.id)}
                      style={{
                        accentColor: PRIMARY,
                        width: 18,
                        height: 18,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 4,
                        }}
                      >
                        <span style={{ fontWeight: 700, fontSize: 15 }}>
                          {s.name}
                        </span>
                        <span
                          style={{
                            fontWeight: 700,
                            color: PRIMARY,
                            fontSize: 15,
                          }}
                        >
                          {formatPrice(s.price)}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#6b7280",
                          marginBottom: s.popular ? 8 : 0,
                        }}
                      >
                        {s.desc}
                      </p>
                      {s.popular && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#10B981",
                            border: "1px solid #10B98130",
                            borderRadius: 4,
                            padding: "2px 8px",
                            background: "#d1fae510",
                          }}
                        >
                          PHỔ BIẾN NHẤT
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Date & Time */}
            <section
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 32,
                boxShadow: "0 4px 20px rgba(13,153,255,0.05)",
              }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: PRIMARY,
                  marginBottom: 24,
                }}
              >
                🕐 Ngày & Giờ
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#6b7280",
                      marginBottom: 8,
                    }}
                  >
                    Chọn ngày
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
                    onBlur={(e) => (e.target.style.borderColor = "#bfc7d5")}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#6b7280",
                      marginBottom: 8,
                    }}
                  >
                    Chọn khung giờ
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 8,
                    }}
                  >
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTimeSlot(t)}
                        style={{
                          padding: "8px 0",
                          fontSize: 13,
                          fontWeight: 600,
                          borderRadius: 6,
                          cursor: "pointer",
                          border: `1px solid ${timeSlot === t ? PRIMARY : "#bfc7d5"}`,
                          background: timeSlot === t ? "#0d99ff" : "#fff",
                          color: timeSlot === t ? "#fff" : "#3f4753",
                          transition: "all 0.2s",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 32,
                boxShadow: "0 4px 20px rgba(13,153,255,0.05)",
              }}
            >
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: PRIMARY,
                  marginBottom: 24,
                }}
              >
                💳 Thanh toán
              </h2>
              <div
                style={{
                  background: "#d2e4ff20",
                  borderRadius: 12,
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>👛</span>
                  <div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        marginBottom: 2,
                      }}
                    >
                      Số dư ví autoWash
                    </p>
                    <p style={{ fontSize: 22, fontWeight: 700 }}>750.000đ</p>
                  </div>
                </div>
                <button
                  style={{
                    background: PRIMARY,
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  + Nạp tiền
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {PAYMENTS.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setPayment(p.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: 16,
                      borderRadius: 12,
                      cursor: "pointer",
                      border: `2px solid ${payment === p.id ? PRIMARY : "#bfc7d5"}`,
                      background: "#fff",
                      transition: "all 0.2s",
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === p.id}
                      onChange={() => setPayment(p.id)}
                      style={{
                        accentColor: PRIMARY,
                        width: 16,
                        height: 16,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontWeight: 700, fontSize: 14 }}>
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ position: "sticky", top: 88 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid #e0e3e5",
                borderRadius: 20,
                padding: 24,
                boxShadow: "0 8px 32px rgba(0,97,165,0.08)",
              }}
            >
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: PRIMARY,
                  marginBottom: 24,
                }}
              >
                Tóm tắt đơn hàng
              </h3>

              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: 24,
                  height: 150,
                }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuApBaoOniRyUxecZixfWiqlJEGutYjsF-aGNhWAjH-CBhMvE-s8NYboFKV74A6qV472gnBZ2YrzJH5X76FsrIv-JYMq-OvdKfWWNeRL5CySiAZfqnazqcBZTTozuxWsk2X3YGXUJF4FVYJLUMjma51gTiKdk2LQ4FfOHwwVZKj41OlCaAPzv3CZhLd0LSrE1Bzgd18r4KKj2B5OWTj9xnW1jVN9kNZ7hYbvgLnHW4HRzXkHis6k02hlVaa4eGzPyAA2p3YZHM1OYWo"
                  alt="Car wash"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {[
                  { label: "Loại xe", value: VEHICLES[vehicle].label },
                  {
                    label: "Gói dịch vụ",
                    value: selectedService?.name.split(" (")[0],
                  },
                  {
                    label: "Thời gian",
                    value: timeSlot
                      ? `${timeSlot}${date ? ", " + date : ""}`
                      : "Chưa chọn",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingBottom: 12,
                      borderBottom: "1px solid #e0e3e580",
                    }}
                  >
                    <span style={{ color: "#6b7280", fontSize: 14 }}>
                      {row.label}:
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        textAlign: "right",
                        maxWidth: 160,
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    fontSize: 14,
                    color: "#6b7280",
                  }}
                >
                  <span>Tạm tính</span>
                  <span>{formatPrice(selectedService?.price || 0)}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "#6b7280" }}>Giảm giá</span>
                  <span style={{ color: "#10B981" }}>-0đ</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 16,
                    borderTop: `1px solid ${PRIMARY}30`,
                    fontSize: 20,
                    fontWeight: 700,
                    color: PRIMARY,
                  }}
                >
                  <span>Tổng cộng</span>
                  <span>{formatPrice(selectedService?.price || 0)}</span>
                </div>
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "16px 0",
                  background: "#0d99ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 17,
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.target.style.background = PRIMARY_DARK)}
                onMouseOut={(e) => (e.target.style.background = "#0d99ff")}
              >
                XÁC NHẬN ĐẶT LỊCH
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "#6b7280",
                  marginTop: 12,
                }}
              >
                Bằng việc xác nhận, bạn đồng ý với{" "}
                <a
                  href="#"
                  style={{ color: PRIMARY, textDecoration: "underline" }}
                >
                  Điều khoản dịch vụ
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: "#e0e3e5",
          borderTop: "1px solid #bfc7d550",
          marginTop: 80,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "40px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#191c1e",
                marginBottom: 4,
              }}
            >
              autoWash
            </div>
            <p style={{ fontSize: 13, color: "#6b7280" }}>
              © 2024 autoWash — Giải pháp chăm sóc xe chuyên nghiệp.
            </p>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Về chúng tôi", "Điều khoản", "Bảo mật", "Liên hệ"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  color: "#6b7280",
                  textDecoration: "none",
                  fontSize: 14,
                }}
                onMouseOver={(e) => (e.target.style.color = PRIMARY)}
                onMouseOut={(e) => (e.target.style.color = "#6b7280")}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
