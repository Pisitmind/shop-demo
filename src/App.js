import React, { useContext, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ProductList from "./ProductList";
import Home from "./Homepage";
import Navbar from "./Navbar";

// Context for Authentication
export const AuthContext = createContext();

const App = () => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser")) || null // Initialize from localStorage
  );
  // Check for token existence (example: in localStorage)
  // const hasToken = Boolean(localStorage.getItem("authToken"));

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <div className="container mx-auto py-8 my-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect to Sign In if not authenticated
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default App;
