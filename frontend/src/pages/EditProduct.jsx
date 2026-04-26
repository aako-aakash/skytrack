import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    API.get(`/products/${id}`).then((res) =>
      setForm(res.data)
    );
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });

      toast.success("Product updated successfully ✨");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl text-white mb-6 text-center">
          ✏️ Edit Product
        </h1>

        <form
          onSubmit={handleUpdate}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-4"
        >
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 text-white"
          />

          <input
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-white/10 text-white"
          />

          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full p-3 rounded-lg bg-white/10 text-white"
          />

          <input
            type="number"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            className="w-full p-3 rounded-lg bg-white/10 text-white"
          />

          <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-lg font-semibold">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
