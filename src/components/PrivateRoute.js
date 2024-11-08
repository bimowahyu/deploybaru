import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Cek status session dengan memanggil endpoint server
    const checkSession = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/me`, { withCredentials: true });
        
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUserRole(response.data.role); // Asumsi server mengembalikan role pengguna
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  // Cek apakah pengguna terautentikasi dan role sesuai
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  // Jika terautentikasi dan role sesuai, tampilkan komponen anak
  return children;
};

export default PrivateRoute;
