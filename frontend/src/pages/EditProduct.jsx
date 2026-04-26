import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setForm({
          name: res.data.name || "",
          description: res.data.description || "",
          price: res.data.price || "",
          quantity: res.data.quantity || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      alert("Product updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
        <div className="flex justify-center mt-10">

            <div className="w-full max-w-md">
            <h1 className="text-2xl text-white mb-6 text-center">
                ✏️ Edit Product
            </h1>

            <form
                onSubmit={handleUpdate}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-4 shadow-lg"
            >
                <input
                className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                />

                <input
                className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Description"
                />

                <input
                type="number"
                className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Price"
                />

                <input
                type="number"
                className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="Quantity"
                />

                <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-lg font-semibold hover:scale-[1.02] transition">
                Update Product
                </button>
            </form>
            </div>

        </div>
    );
}
