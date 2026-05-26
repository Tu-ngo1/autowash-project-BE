import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#0061a5";
const PRIMARY_DARK = "#004d82";
const PRIMARY_LIGHT = "#e8f1fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    account: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && form.password !== form.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }
    // Đăng nhập thành công → chuyển sang trang Booking
    navigate("/booking");
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#f7f9fb",
        minHeight: "100vh",
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
          <div style={{ fontSize: 22, fontWeight: 700, color: PRIMARY }}>
            autoWash
          </div>
          <div style={{ display: "flex", gap: 28 }}>
            {["Home", "Booking", "History", "Profile", "Rewards"].map(
              (item, i) => (
                <span
                  key={item}
                  onClick={() => {
                    if (item === "Booking") navigate("/booking");
                    if (item === "Profile") navigate("/profile");
                  }}
                  style={{
                    color: i === 0 ? PRIMARY : "#6b7280",
                    fontWeight: i === 0 ? 700 : 400,
                    fontSize: 15,
                    borderBottom: i === 0 ? `2px solid ${PRIMARY}` : "none",
                    paddingBottom: 2,
                    cursor: "pointer",
                    textDecoration: "none",
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
              background: PRIMARY,
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "8px 24px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 14,
            }}
            onMouseOver={(e) => (e.target.style.background = PRIMARY_DARK)}
            onMouseOut={(e) => (e.target.style.background = PRIMARY)}
          >
            Đặt lịch ngay
          </button>
        </div>
      </nav>

      {/* HERO + LOGIN */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          padding: "64px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "linear-gradient(135deg, #f7f9fb 40%, #e0f2fe 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 48px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Hero Text */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: PRIMARY_LIGHT,
                color: PRIMARY,
                padding: "6px 16px",
                borderRadius: 999,
                border: `1px solid ${PRIMARY}30`,
                marginBottom: 24,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              ✦ Dịch vụ 5 sao
            </div>
            <h1
              style={{
                fontSize: 44,
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#191c1e",
                marginBottom: 20,
              }}
            >
              Chăm sóc xe chuyên nghiệp,
              <br />
              <span style={{ color: PRIMARY }}>Sạch bóng như mới.</span>
            </h1>
            <p
              style={{
                fontSize: 17,
                color: "#6b7280",
                lineHeight: 1.7,
                maxWidth: 460,
                marginBottom: 32,
              }}
            >
              Trải nghiệm công nghệ rửa xe tiên tiến. Nhanh chóng, an toàn và
              hoàn toàn tự động.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <button
                onClick={() => navigate("/booking")}
                style={{
                  background: PRIMARY,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "14px 28px",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = PRIMARY_DARK)
                }
                onMouseOut={(e) => (e.currentTarget.style.background = PRIMARY)}
              >
                Xem các gói dịch vụ
              </button>
              <button
                style={{
                  background: "#fff",
                  color: "#191c1e",
                  border: "1px solid #e0e3e5",
                  borderRadius: 12,
                  padding: "14px 28px",
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                Tìm chi nhánh gần nhất
              </button>
            </div>
          </div>

          {/* Login Card */}
          <div
            style={{
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.5)",
              borderRadius: 28,
              padding: 36,
              boxShadow: "0 8px 40px rgba(0,97,165,0.1)",
            }}
          >
            {/* Tabs */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid #e0e3e5",
                marginBottom: 28,
              }}
            >
              {["Đăng nhập", "Đăng ký"].map((tab, i) => {
                const active = (i === 0) === isLogin;
                return (
                  <button
                    key={tab}
                    onClick={() => setIsLogin(i === 0)}
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      fontWeight: 700,
                      fontSize: 15,
                      color: active ? PRIMARY : "#9ca3af",
                      background: "none",
                      border: "none",
                      borderBottom: active
                        ? `2px solid ${PRIMARY}`
                        : "2px solid transparent",
                      cursor: "pointer",
                      marginBottom: -1,
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Account */}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6b7280",
                    marginBottom: 6,
                  }}
                >
                  Số điện thoại hoặc Email
                </label>
                <input
                  type="text"
                  name="account"
                  value={form.account}
                  onChange={handleChange}
                  placeholder="Nhập thông tin của bạn"
                  style={{
                    width: "100%",
                    height: 48,
                    padding: "0 16px",
                    borderRadius: 12,
                    border: "1px solid #e0e3e5",
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box",
                    background: "rgba(255,255,255,0.7)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
                  onBlur={(e) => (e.target.style.borderColor = "#e0e3e5")}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <label
                    style={{ fontSize: 12, fontWeight: 600, color: "#6b7280" }}
                  >
                    Mật khẩu
                  </label>
                  {isLogin && (
                    <a
                      href="#"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: PRIMARY,
                        textDecoration: "none",
                      }}
                    >
                      Quên mật khẩu?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    height: 48,
                    padding: "0 16px",
                    borderRadius: 12,
                    border: "1px solid #e0e3e5",
                    fontSize: 15,
                    outline: "none",
                    boxSizing: "border-box",
                    background: "rgba(255,255,255,0.7)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
                  onBlur={(e) => (e.target.style.borderColor = "#e0e3e5")}
                />
              </div>

              {/* Confirm Password - chỉ hiện khi Đăng ký */}
              {!isLogin && (
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#6b7280",
                      marginBottom: 6,
                    }}
                  >
                    Nhập lại mật khẩu
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      height: 48,
                      padding: "0 16px",
                      borderRadius: 12,
                      border: "1px solid #e0e3e5",
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                      background: "rgba(255,255,255,0.7)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = PRIMARY)}
                    onBlur={(e) => (e.target.style.borderColor = "#e0e3e5")}
                  />
                  {form.confirmPassword &&
                    form.password !== form.confirmPassword && (
                      <p
                        style={{ fontSize: 12, color: "#dc2626", marginTop: 4 }}
                      >
                        ⚠ Mật khẩu không khớp
                      </p>
                    )}
                </div>
              )}

              {/* Remember - chỉ hiện khi Đăng nhập */}
              {isLogin && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 20,
                  }}
                >
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    style={{ accentColor: PRIMARY, width: 16, height: 16 }}
                  />
                  <label
                    htmlFor="remember"
                    style={{ fontSize: 13, color: "#6b7280" }}
                  >
                    Duy trì đăng nhập
                  </label>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  height: 52,
                  background: PRIMARY,
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 17,
                  cursor: "pointer",
                  marginBottom: 20,
                  marginTop: isLogin ? 0 : 8,
                }}
                onMouseOver={(e) => (e.target.style.background = PRIMARY_DARK)}
                onMouseOut={(e) => (e.target.style.background = PRIMARY)}
              >
                {isLogin ? "Truy cập ngay" : "Tạo tài khoản"}
              </button>

              {/* Divider */}
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  margin: "16px 0",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "#e0e3e5",
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    background: "white",
                    padding: "0 12px",
                    fontSize: 12,
                    color: "#9ca3af",
                  }}
                >
                  Hoặc tiếp tục với
                </span>
              </div>

              {/* Social */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {["Google", "Facebook"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    style={{
                      height: 48,
                      borderRadius: 12,
                      border: "1px solid #e0e3e5",
                      background: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#f3f4f6")}
                    onMouseOut={(e) => (e.target.style.background = "#fff")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "60px 0", background: "#f2f4f6" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 48px",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 32,
            textAlign: "center",
          }}
        >
          {[
            ["50k+", "Khách hàng tin dùng"],
            ["12+", "Chi nhánh toàn quốc"],
            ["15ph", "Thời gian trung bình"],
            ["4.9/5", "Đánh giá hài lòng"],
          ].map(([v, l]) => (
            <div key={l}>
              <p
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: PRIMARY,
                  marginBottom: 6,
                }}
              >
                {v}
              </p>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", background: PRIMARY }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 48px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Sẵn sàng để xế yêu tỏa sáng?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 560,
              margin: "0 auto 36px",
            }}
          >
            Đặt lịch ngay để nhận ưu đãi 20% cho lần rửa đầu tiên.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button
              onClick={() => navigate("/booking")}
              style={{
                background: "#fff",
                color: PRIMARY,
                padding: "16px 36px",
                borderRadius: 16,
                fontWeight: 700,
                fontSize: 17,
                border: "none",
                cursor: "pointer",
              }}
            >
              Đặt lịch online ngay
            </button>
            <button
              style={{
                background: "transparent",
                color: "#fff",
                padding: "16px 36px",
                borderRadius: 16,
                fontWeight: 700,
                fontSize: 17,
                border: "2px solid rgba(255,255,255,0.35)",
                cursor: "pointer",
              }}
            >
              Tư vấn qua Zalo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#e0e3e5", padding: "40px 48px" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
