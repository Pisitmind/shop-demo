import React, { useState, useContext } from "react";
import { auth, googleProvider } from "./firebase"; // Import auth and googleProvider
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { AuthContext } from "./App"; // Import context
import Swal from "sweetalert2";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext); // Get setUser from context
  const navigate = useNavigate(); // Initialize navigate

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user); // Store user in context
      localStorage.setItem("authToken", user.accessToken); // Save token
      navigate("/products"); // Redirect to Product page
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();

    // Reset custom validity messages
    document.getElementById("email").setCustomValidity("");
    document.getElementById("password").setCustomValidity("");

    // Check for empty fields and set custom validity
    if (!email) {
      document.getElementById("email").setCustomValidity("กรุณากรอกอีเมล");
    }
    if (!password) {
      document
        .getElementById("password")
        .setCustomValidity("กรุณากรอกรหัสผ่าน");
    }

    // Trigger the validity check and show custom messages
    if (
      !document.getElementById("email").reportValidity() ||
      !document.getElementById("password").reportValidity()
    ) {
      return; // Don't submit if form is invalid
    }

    // Proceed with sign-in logic if all fields are valid
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user); // Store user in context
      localStorage.setItem("authUser", JSON.stringify(user)); // Save user in localStorage
      localStorage.setItem("authToken", user.accessToken); // Save token
      navigate("/products"); // Redirect to Product page
    } catch (error) {
      console.error("Error signing in with Email/Password: ", error);
      Swal.fire({
        icon: "error",
        title: "ลงชื่อเข้าใช้ไม่สำเร็จ",
        text: "กรุณาตรวจสอบอีเมล หรือรหัสผ่าน!",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">ลงชื่อเข้าใช้</h1>

        {/* Sign in with Email and Password */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              อีเมล
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="กรอกอีเมล"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              รหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="กรอกรหัสผ่าน"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            ลงชื่อเข้าใช้ด้วยอีเมล
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500"> หริอ </span>
          </div>
        </div>

        {/* Sign in with Google */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 flex items-center justify-center"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          ลงชื่อเข้าใช้ด้วย Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;
