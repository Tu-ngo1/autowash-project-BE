import { useNavigate } from "react-router-dom";

// ── Mock data (sau này thay bằng Axios gọi API) ──────────────────────────────
const customer = {
  name: "Nguyễn Minh Tuấn",
  since: "Thành viên từ tháng 10, 2023",
  tier: "Hạng Kim Cương",
  points: 2450,
  pointsToNext: 550,
  progress: 75,
  nextTier: "Elite",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAgx2SPmGdFVK_p_hBQj4yn6i-0wrF2UWiK8KVlgO_PClCtEOTtZ1akljpfs0wuTaeLlt5l2qNP5Z6rQYuI0p1eRuSedP7keixMgQZVQg6zaeXe1TrCYYGDwUeU6wX5d-AEGscGbQxJzb65Eft9lvvzZYqqXLWyI3hXzg19nLeehOo4XJB6kLbPyMTHsfZ7K5cfKQSD4_V7L2EClXhPZrna6OKLRpTUt-WK0oF3PsgXnfbChSU_6aI4rhuBLqcAUJ6DIIut3YORqzA",
};

const vouchers = [
  {
    icon: "🏷️",
    title: "Giảm 50.000đ",
    desc: "Cho dịch vụ Rửa xe tiêu chuẩn",
    points: 500,
  },
  {
    icon: "🚗",
    title: "Vệ sinh nội thất",
    desc: "Giảm giá 15% gói chuyên sâu",
    points: 1200,
  },
];

const history = [
  {
    service: "Rửa xe & Hút bụi",
    code: "#AW-89234",
    date: "12/05/2024",
    status: "Hoàn thành",
    amount: "150.000đ",
    success: true,
  },
  {
    service: "Phủ Ceramic Pro",
    code: "#AW-87112",
    date: "28/04/2024",
    status: "Hoàn thành",
    amount: "4.200.000đ",
    success: true,
  },
  {
    service: "Rửa khoang máy",
    code: "#AW-86901",
    date: "15/04/2024",
    status: "Đã hủy",
    amount: "0đ",
    success: false,
  },
  {
    service: "Rửa xe tiêu chuẩn",
    code: "#AW-85523",
    date: "02/04/2024",
    status: "Hoàn thành",
    amount: "80.000đ",
    success: true,
  },
];

const NAV_ITEMS = ["Home", "Booking", "History", "Profile", "Rewards"];

export default function CustomerProfile() {
  const navigate = useNavigate();

  const handleNav = (item) => {
    if (item === "Home") navigate("/");
    if (item === "Booking") navigate("/booking");
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] min-h-screen font-[Inter,sans-serif]">
      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center px-4 md:px-12 h-16 max-w-[1280px] mx-auto">
          <div
            className="text-2xl font-bold text-[#0061a5] cursor-pointer"
            onClick={() => navigate("/")}
          >
            autoWash
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <span
                key={item}
                onClick={() => handleNav(item)}
                className={`text-base cursor-pointer transition-colors pb-0.5
                  ${
                    item === "Profile"
                      ? "text-[#0061a5] font-bold border-b-2 border-[#0061a5]"
                      : "text-gray-500 hover:text-[#0061a5]"
                  }`}
              >
                {item}
              </span>
            ))}
          </div>

          <button
            onClick={() => navigate("/booking")}
            className="bg-[#0d99ff] text-white px-6 py-2 rounded-full font-bold hover:bg-[#0061a5] transition-all text-sm"
          >
            Đặt lịch ngay
          </button>
        </div>
      </nav>

      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ── LEFT SIDEBAR ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Avatar card */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={customer.avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-[#d2e4ff] shadow-md"
                />
                {/* Online dot */}
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#10B981] rounded-full border-4 border-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#191c1e] mb-1">
                {customer.name}
              </h1>
              <p className="text-gray-500 mb-4 text-sm">{customer.since}</p>
              <div className="bg-[#a5eeff] text-[#001f25] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                ⭐ {customer.tier}
              </div>
            </div>

            {/* Points card */}
            <div className="bg-[#0061a5] text-white rounded-xl p-8 shadow-lg relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-2">
                  Điểm thưởng hiện tại
                </p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold leading-none">
                    {customer.points.toLocaleString("vi-VN")}
                  </span>
                  <span className="text-lg">điểm</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Tiến trình nâng hạng tiếp theo</span>
                    <span>{customer.progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#00e0ff] h-full rounded-full transition-all"
                      style={{ width: `${customer.progress}%` }}
                    />
                  </div>
                  <p className="text-xs opacity-70 italic text-right">
                    Còn {customer.pointsToNext} điểm để lên hạng{" "}
                    {customer.nextTier}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT CONTENT ────────────────────────────────────────────────── */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* ── VOUCHERS ─────────────────────────────────────────────────── */}
            <section>
              <div className="flex justify-between items-end mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-[#191c1e]">
                    Voucher của bạn
                  </h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Đổi điểm để nhận ưu đãi chăm sóc xe
                  </p>
                </div>
                <button className="text-[#0061a5] font-bold hover:underline text-sm">
                  Xem tất cả
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vouchers.map((v) => (
                  <div
                    key={v.title}
                    className="bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-xl p-6 flex gap-4 items-center group hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-[#E0F2FE] rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                      {v.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-[#191c1e]">{v.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{v.desc}</p>
                      <p className="text-xs text-[#0061a5] font-bold mt-2">
                        {v.points.toLocaleString("vi-VN")} điểm
                      </p>
                    </div>
                    <button className="bg-[#0061a5] text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      🎁
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* ── HISTORY ──────────────────────────────────────────────────── */}
            <section>
              <div className="flex justify-between items-end mb-5">
                <h2 className="text-2xl font-bold text-[#191c1e]">
                  Lịch sử rửa xe
                </h2>
                <button className="text-gray-500 flex items-center gap-1.5 hover:text-[#0061a5] transition-colors text-sm font-medium">
                  ☰ Lọc
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f2f4f6] border-b border-gray-200/60">
                      {[
                        "DỊCH VỤ / MÃ",
                        "NGÀY THỰC HIỆN",
                        "TRẠNG THÁI",
                        "TỔNG TIỀN",
                      ].map((h, i) => (
                        <th
                          key={h}
                          className={`px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider
                            ${i === 3 ? "text-right" : ""}`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {history.map((row) => (
                      <tr
                        key={row.code}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-bold text-[#191c1e] text-sm">
                            {row.service}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {row.code}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">
                          {row.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                              ${
                                row.success
                                  ? "bg-green-50 text-[#10B981]"
                                  : "bg-red-50 text-[#ba1a1a]"
                              }`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 text-right font-bold text-sm
                          ${row.success ? "text-[#0061a5]" : "text-gray-400"}`}
                        >
                          {row.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-center">
                <button className="border border-[#0061a5] text-[#0061a5] px-8 py-2 rounded-full font-bold hover:bg-[#E0F2FE] transition-colors text-sm">
                  Tải thêm lịch sử
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-[#e0e3e5] border-t border-gray-300/50 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-4 md:px-12 max-w-[1280px] mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-bold text-[#191c1e] mb-1">
              autoWash
            </div>
            <p className="text-gray-500 text-sm text-center md:text-left max-w-xs">
              Giải pháp chăm sóc xe chuyên nghiệp với công nghệ hiện đại nhất.
            </p>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            {[
              "Về chúng tôi",
              "Điều khoản dịch vụ",
              "Chính sách bảo mật",
              "Liên hệ",
            ].map((l) => (
              <a
                key={l}
                href="#"
                className="text-gray-500 hover:text-[#0061a5] transition-colors text-sm"
              >
                {l}
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-xs">
            © 2024 autoWash - Giải pháp chăm sóc xe chuyên nghiệp
          </p>
        </div>
      </footer>
    </div>
  );
}
