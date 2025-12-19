import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { loadWishlist } from "../utils/localStorage";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(()=>loadWishlist());
  const [sortOrder, setSortOrder] = useState("none");
  // useEffect(() => {
  //   const savedList = JSON.parse(localStorage.getItem("wishlist"));
  //   if (savedList) setWishlist(savedList);
  // }, []);
  if (!wishlist.length) return <p>No Data Available</p>;
  const sortedItem = (() => {
    if (sortOrder === "price-asc") {
      return [...wishlist].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      return [...wishlist].sort((a, b) => b.price - a.price);
    } else {
      return wishlist;
    }
  })();

  const handleRemove = (id) => {
    const existingList = JSON.parse(localStorage.getItem("wishlist"));
    let updatedList = existingList.filter((p) => p.id !== id);
    // for ui instant update
    setWishlist(updatedList);
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
  };
  // generate chart data
  const totalsByCategory = {};
  wishlist.forEach((product) => {
    const category = product.category;
    totalsByCategory[category] =
      (totalsByCategory[category] || 0) + product.price;
  });
  const chartData = Object.keys(totalsByCategory).map((category) => ({
    category,
    total: totalsByCategory[category],
  }));
  return (
    <div className="space-y-6">
      <div className="flex justify-between py-5 items-center ">
        <h1 className="text-3xl font-semibold">
          Wishlist{" "}
          <span className="text-gray-700 text-sm">({sortedItem.length})</span>
        </h1>
        <label className="form-control w-full max-w-xs">
          <select
            className="select select-bordered"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}>
            <option value="none">Sort by Price</option>
            <option value="price-asc">Low-&gt;High</option>
            <option value="price-desc">High-&gt;Low</option>
          </select>
        </label>
      </div>
      <div className="space-y-3">
        {sortedItem.map((p) => (
          <div key={p.id} className="card card-side bg-base-100 shadow border">
            <figure>
              <img
                className="w-40 h-28 object-cover"
                src={p.image}
                alt={p.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{p.name}</h2>
              <p>{p.category}</p>
            </div>
            <div className="pr-4 flex items-center gap-3">
              <div className="font-semibold">${p.price}</div>
              <button
                onClick={() => handleRemove(p.id)}
                className="btn btn-outline">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Chart */}
      <div className="space-y-3">
        <h3 className="font-semibold text-xl">WishList Summary</h3>
        <div className="bg-base-100 border rounded-xl p-4 h-full">
          <BarChart
            style={{
              aspectRatio: 1.618,
            }}
            responsive
            data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="total" fill="#82ca9d" radius={[8, 8, 0, 0]} />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
