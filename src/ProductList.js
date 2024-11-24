import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import Swal from "sweetalert2";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    id: "",
    name: "",
    price: "",
  });
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // สถานะการส่งข้อมูล

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // ป้องกันการกดเพิ่มซ้ำ
    if (isSubmitting) return;

    if (!productData.id || !productData.name || !productData.price) {
      Swal.fire({
        icon: "error",
        title: "เพิ่มไม่สำเร็จ",
        text: "กรุณากรอกข้อมูลสินค้าให้ครบถ้วน!",
      });
      return;
    }

    try {
      setIsSubmitting(true); // ล็อกการเพิ่มข้อมูล

      const existingProduct = products.find(
        (product) => product.id === productData.id
      );

      if (existingProduct) {
        Swal.fire({
          icon: "warning",
          title: "ID ซ้ำกัน",
          text: `รหัส ${productData.id} มีอยู่แล้วในระบบ กรุณาใช้รหัสใหม่`,
        });

        // Suggest a new unique ID
        const newId = `${productData.id}-${Math.floor(Math.random() * 1000)}`;
        setProductData({ ...productData, id: newId });
        setIsSubmitting(false); // ปลดล็อก
        return;
      }

      await addDoc(collection(db, "products"), productData);
      Swal.fire({
        icon: "success",
        title: "เพิ่มสินค้าสำเร็จ!",
        text: `${productData.name} ถูกเพิ่มในรายการแล้ว.`,
      });

      setProductData({ id: "", name: "", price: "" });
      setProducts((prevProducts) => [
        ...prevProducts,
        { id: Math.random().toString(), ...productData },
      ]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `เพิ่มสินค้าไม่สำเร็จ : ${error.message}`,
      });
    } finally {
      setIsSubmitting(false); // ปลดล็อกการเพิ่มข้อมูล
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.id.toLowerCase().includes(search.toLowerCase()) ||
      product.price.toString().includes(search)
  );

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white border border-blue-300 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
        รายการสินค้า
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="ค้นหา"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />

      {/* Display Filtered Product List in Table */}
      <table className="min-w-full table-auto border-collapse mb-6">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border text-left">รหัสสินค้า</th>
            <th className="py-2 w-2/4 px-4 border text-left">ชื่อสินค้า</th>
            <th className="py-2 px-4 border text-left">ราคา</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{product.id}</td>
              <td className="py-2 w-2/4 px-4 border">{product.name}</td>
              <td className="py-2 px-4 border">{product.price} บาท</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold text-blue-600 mb-4">เพิ่มสินค้า</h3>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          placeholder="รหัสสินค้า"
          value={productData.id}
          onChange={(e) =>
            setProductData({ ...productData, id: e.target.value })
          }
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="ชื่อสินค้า"
          value={productData.name}
          onChange={(e) =>
            setProductData({ ...productData, name: e.target.value })
          }
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="number"
          placeholder="ราคา"
          value={productData.price}
          onChange={(e) =>
            setProductData({ ...productData, price: e.target.value })
          }
          className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          type="submit"
          className={`w-full text-white font-semibold py-2 px-4 rounded-md ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-600"
          } focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200`}
          disabled={isSubmitting} // ปิดปุ่มระหว่างกำลังเพิ่ม
        >
          {isSubmitting ? "กำลังเพิ่ม..." : "เพิ่มรายการ"}
        </button>
      </form>
    </div>
  );
};

export default ProductList;
