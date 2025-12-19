import React from "react";
import { useParams } from "react-router";
import useProducts from "../Hooks/useProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const product = products.find((p) => String(p.id) === id);
  if (loading) return <p>Loading....</p>;
  const { name, image, category, price, description } = product || {};
  const handleAddToWishList = () => {
    const existingList = JSON.parse(localStorage.getItem("wishlist"))
    let updatedList = [];
    if (existingList) {
      const isDuplicate = existingList.some((p) => p.id === product.id);
      //   product.quantity = product.quantity + 1
      if (isDuplicate) return alert("sorry bhai");
      updatedList = [...existingList, product];
    } else {
      updatedList.push(product);
    }
    localStorage.setItem("wishlist", JSON.stringify(updatedList));
  };
  return (
    <div className="card bg-base-100 border shadow-sm">
      <figure className="h-80 overflow-hidden">
        <img className="w-full object-cover" src={image} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Description: {description}</p>
        <p>Price: ${price}</p>
        <p>Category: {category}</p>
        <div className="card-actions justify-end">
          <button onClick={handleAddToWishList} className="btn btn-outline">
            Add to WishList
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
