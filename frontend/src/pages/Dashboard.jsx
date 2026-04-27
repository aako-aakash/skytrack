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

  // DELETE WITH REAL UNDO
  const handleDelete = (product) => {
    const previousProducts = [...products];

    setProducts((prev) => prev.filter((p) => p.id !== product.id));

    const deleteTimeout = setTimeout(async () => {
      try {
        await API.delete(`/products/${product.id}`);
        toast.success("Deleted permanently 🗑️");
      } catch (err) {
        console.error(err);
        setProducts(previousProducts);
        toast.error("Delete failed ❌");
      }
    }, 5000);

    toast(
      (t) => (
        <div className="flex items-center gap-4">
          <span>Product deleted</span>

          <button
            onClick={() => {
              clearTimeout(deleteTimeout);
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
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const COLORS = ["#8b5cf6", "#22c55e", "#06b6d4", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl text-white font-bold">📊 Dashboard</h1>

      <input
        type="text"
        placeholder="🔍 Search products..."
        className="w-full max-w-md p-3 rounded-xl bg-white/10 text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid gap-4">
        {filteredProducts.length === 0 && (
          <p className="text-gray-400 text-center">No products found 🚀</p>
        )}

        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 p-5 rounded-xl flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-purple-300">
                {p.name}
              </h2>
              <p className="text-gray-400">{p.description}</p>
              <p className="text-green-400 font-semibold">₹ {p.price}</p>
              <p className="text-cyan-400 text-sm">📦 Qty: {p.quantity}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => navigate(`/edit/${p.id}`)}
                className="bg-purple-500 px-3 py-1 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p)}
                className="bg-red-500 px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📊 CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white/5 p-6 rounded-xl">
          <h2 className="text-white mb-4">💰 Price Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredProducts}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />

              {/* 🔥 FIXED COLOR HERE */}
              <Bar dataKey="price" fill="#8b5cf6" radius={[6, 6, 0, 0]}>
                <LabelList dataKey="price" position="top" fill="#fff" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white/5 p-6 rounded-xl">
          <h2 className="text-white mb-4">📦 Quantity Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={filteredProducts} dataKey="quantity" nameKey="name">
                {filteredProducts.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* TOTAL */}
      <div className="bg-gradient-to-r from-purple-700 to-cyan-700 p-6 rounded-xl text-center">
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
