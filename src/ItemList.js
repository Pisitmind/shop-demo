import React, { useState, useEffect } from "react";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // จำลองการดึงข้อมูลจาก API
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []); // useEffect จะทำงานแค่ครั้งเดียวเมื่อคอมโพเนนต์โหลด

  const addItem = () => {
    // เพิ่มข้อมูลใหม่เข้าไปในรายการ
    setItems([...items, `รายการ ${items.length + 1}`]);
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button
        onClick={addItem}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        เพิ่มรายการ
      </button>
    </div>
  );
}

export default ItemList;
