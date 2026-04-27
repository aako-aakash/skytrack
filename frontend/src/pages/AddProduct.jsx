import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.quantity) {
      toast.error("Please fill all required fields");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      await API.post("/products/", {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      toast.success("Product added successfully 🚀");

      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
      });

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      toast.error("Failed to add product ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl text-white mb-6 text-center">
          ➕ Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-4 shadow-lg"
        >
          <input
            className="w-full p-3 rounded-lg bg-white/10 text-white"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full p-3 rounded-lg bg-white/10 text-white"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="number"
            className="w-full p-3 rounded-lg bg-white/10 text-white"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="number"
            className="w-full p-3 rounded-lg bg-white/10 text-white"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <button
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105"
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
