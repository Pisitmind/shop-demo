// AddProduct.js
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // import Firestore instance

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add a new document with data
      const docRef = await addDoc(collection(db, "products"), {
        name: name,
        price: parseFloat(price),
        description: description,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">
          Add a Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-blue-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-blue-50 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-blue-700"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-blue-50 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter product price"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-blue-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-blue-50 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter product description"
              rows="3"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            เพิ่มสินค้า
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
