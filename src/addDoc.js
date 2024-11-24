import React, { useEffect } from "react";
import { db, collection, addDoc } from "./firebase";

const AddProduct = () => {
  useEffect(() => {
    const addProduct = async () => {
      try {
        const docRef = await addDoc(collection(db, "products"), {
          name: "Product 1",
          price: 100,
          description: "A description of Product 1",
          image: "https://example.com/product1.jpg",
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    addProduct();
  }, []);

  return (
    <div>
      <h2>Product Added</h2>
    </div>
  );
};

export default AddProduct;
