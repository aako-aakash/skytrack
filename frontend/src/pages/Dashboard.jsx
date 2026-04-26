import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products ❌");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //  DELETE WITH UNDO
  const handleDelete = async (product) => {
    const previousProducts = [...products];

    // remove instantly (optimistic UI)
    setProducts((prev) => prev.filter((p) => p.id !== product.id));

    const toastId = toast(
      (t) => (
        <div className="flex items-center gap-4">
          <span>Product deleted</span>

          <button
            onClick={() => {
              // undo
              setProducts(previousProducts);
              toast.dismiss(t.id);
              toast.success("Restored ✅");
            }}
            className="bg-blue-500 px-3 py-1 rounded text-white"
          >
            Undo
          </button>
        </div>
      ),
      { duration: 5000 }
    );

    try {
      await API.delete(`/products/${product.id}`);
    } catch (err) {
      console.error(err);
      setProducts(previousProducts);
      toast.error("Delete failed ❌");
      toast.dismiss(toastId);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const COLORS = ["#8b5cf6", "#22c55e", "#06b6d4", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-8">
      {/* TITLE */}
      <h1 className="text-3xl text-white font-bold">📊 Dashboard</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search products..."
        className="w-full max-w-md p-3 rounded-xl bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* PRODUCT LIST */}
      <div className="grid gap-4">
        {filteredProducts.length === 0 && (
          <p className="text-gray-400 text-center">
            No products found 🚀
          </p>
        )}

        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl flex justify-between items-center hover:scale-[1.01] transition"
          >
            <div>
              <h2 className="text-lg font-semibold text-purple-300">
                {p.name}
              </h2>
              <p className="text-gray-400">{p.description}</p>

              <p className="text-green-400 font-semibold">
                ₹ {p.price}
              </p>

              <p className="text-cyan-400 text-sm">
                📦 Qty: {p.quantity}
              </p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => navigate(`/edit/${p.id}`)}
                className="bg-purple-500 px-3 py-1 rounded-lg hover:bg-purple-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p)}
                className="bg-red-500/90 hover:bg-red-600 px-3 py-1 rounded-lg transition shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* PRICE CHART */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-purple-500/20 transition">
          <h2 className="text-white mb-4 text-lg font-semibold">
            💰 Price Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredProducts}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>

              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #6366f1",
                  borderRadius: "10px",
                }}
                formatter={(value) => `₹ ${value}`}
              />

              <Bar
                dataKey="price"
                fill="url(#colorPrice)"
                radius={[10, 10, 0, 0]}
                animationDuration={1200}
              >
                <LabelList dataKey="price" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* QUANTITY CHART */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-xl hover:shadow-cyan-500/20 transition">
          <h2 className="text-white mb-4 text-lg font-semibold">
            📦 Quantity Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={filteredProducts}
                dataKey="quantity"
                nameKey="name"
                outerRadius={100}
                label
                animationDuration={1200}
              >
                {filteredProducts.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #22c55e",
                  borderRadius: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOTAL VALUE */}
      <div className="bg-gradient-to-r from-purple-700 to-cyan-700 p-6 rounded-xl text-center shadow-xl">
        <h2 className="text-white text-lg">Total Inventory Value</h2>
        <p className="text-3xl text-green-400 font-bold mt-2">
          ₹{" "}
          {products.reduce(
            (acc, p) => acc + p.price * p.quantity,
            0
          )}
        </p>
      </div>
    </div>
  );
}
