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
} from "recharts";

export default function Charts({ products }) {
  //  total value
  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  //  chart data
  const data = products.map((p) => ({
    name: p.name,
    price: p.price,
    quantity: p.quantity,
  }));

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">

      {/* BAR CHART */}
      <div className="bg-slate-800 p-4 rounded-xl">
        <h2 className="text-white mb-3">Price Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="price" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART */}
      <div className="bg-slate-800 p-4 rounded-xl">
        <h2 className="text-white mb-3">Quantity Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="quantity"
              nameKey="name"
              outerRadius={100}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* TOTAL VALUE CARD */}
      <div className="bg-slate-800 p-4 rounded-xl col-span-2 text-center">
        <h2 className="text-gray-300">Total Inventory Value</h2>
        <p className="text-3xl text-green-400 font-bold mt-2">
          ₹ {totalValue}
        </p>
      </div>
    </div>
  );
}
