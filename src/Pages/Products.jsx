import React, { useState } from "react";
import useProducts from "../Hooks/useProducts";
import ProductCard from "../Components/ProductCard";
import { Link } from "react-router";

const Products = () => {
  const [search, setSearch] = useState("");
  const { products } = useProducts();
  const term = search.trim().toLocaleLowerCase();
  const searchedProducts = term
    ? products.filter((product) => product.name.toLowerCase().includes(term))
    : products;

  return (
    <div>
      <div className="flex justify-between py-5 items-center ">
        <h1 className="text-3xl font-semibold">
          All Products{" "}
          <span className="text-gray-700 text-sm">
            ({searchedProducts.length})
          </span>
        </h1>
        <label className="input border-red-500">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search Products"
          />
        </label>
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {searchedProducts.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
