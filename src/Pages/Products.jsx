import React from "react";
import useProducts from "../Hooks/useProducts";
import Product from "../Components/Product";
import { Link } from "react-router";

const Products = () => {
  const { products } = useProducts();
  return (
        <div>
      <div className="flex justify-between py-5 items-center ">
        <h1 className="text-3xl font-semibold">All Products</h1>
        <Link className="btn btn-outline">
          Search
        </Link>
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default Products;
