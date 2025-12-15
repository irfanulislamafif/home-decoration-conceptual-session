import React from "react";

const Product = ({ product }) => {
  const { name, image, price, category } = product;
  return (
    <div className="card bg-base-100 border shadow-sm hover:scale-105 transition ease-in-out">
      <figure className="h-60 overflow-hidden">
        <img className="w-full object-cover" src={image} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Price: ${price}</p>
        <p>Category: {category}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
