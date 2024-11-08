import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import axios from "axios";

axios.defaults.withCredentials = true; // Set globally to handle cookies

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/login`,
        { username, password },
        { withCredentials: true }
      );

      const data = response.data;

      if (response.status === 200) {
        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else if (data.role === "surveyor") {
          navigate("/surveyor/dashboard");
        } else {
          alert("Tipe pengguna tidak dikenali");
        }
      } else {
        alert(data.message || "Username atau Password salah");
      }
    } catch (error) {
      console.error("Error saat login:", error);
      alert("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="logo-container" onClick={handleLogoClick}>
        <img src="/images/logo.png" alt="Logo Aplikasi" className="login-logo" />
        <h3 className="app-login-title">Sistem Web Database Perumahan</h3>
      </div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username"
            required
          />
        </label>
        <label>
          Password:
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>
        <div className="extra-links">
          <a href="/reset-password">Lupa Password?</a>
        </div>
        <button type="submit">
          <FaLock style={{ marginRight: "10px" }} />
          Login
        </button>
        <p>Belum Punya Akun? Silahkan Mendaftar</p>
        <div className="register-link">
          <a href="/register" className="register-button">
            Saya Ingin Mendaftar
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
