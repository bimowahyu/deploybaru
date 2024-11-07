import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      alert("Anda harus memverifikasi bahwa Anda bukan robot.");
      return;
    }

    try {
      const endpoint = "http://localhost:5100/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         body: JSON.stringify({ username, password, recaptcha: recaptchaValue }),
       // body: JSON.stringify({ username, password }),
        credentials: "include"  
      });

      const data = await response.json();

      if (response.ok) {
        
        if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else if (data.role === "surveyor") {
          navigate("/surveyor/dashboard");
        } else {
          alert("User type is not recognized");
        }
      } else {
        console.error("Login failed:", data);
        alert(data.message || "Username atau Password salah");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan username" required />
        </label>
        <label>
          Password:
          <div className="password-container">
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" required />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </label>
        <div className="recaptcha-container">
          <ReCAPTCHA ref={recaptchaRef} sitekey="6LdFxh8qAAAAAO_NZ3p7scn70POdyee9KqSUpomD" onChange={() => {}} />
        </div>
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
