import React from "react";
import { Link, useLoaderData } from "react-router";
import Product from "../Components/Product";

const Home = () => {
  const products = useLoaderData();
  console.log(products);
  const featuredProducts = products.slice(0, 6);
  return (
    <div>
      <div className="flex justify-between py-5 items-center ">
        <h1 className="text-3xl font-semibold">Featured Products</h1>
        <Link className="btn btn-outline" to="/products">See All Products</Link>
      </div>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default Home;
