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

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch product
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
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      await API.put(`/products/${id}`, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      alert("✅ Product updated!");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  // Loading screen
  if (fetching) {
    return (
      <div className="text-white text-center mt-20">
        Loading product...
      </div>
    );
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
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="number"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="number"
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
