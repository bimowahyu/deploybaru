import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./ResetPassword.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const recaptchaRef = useRef(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      alert("Anda harus memverifikasi bahwa Anda bukan robot.");
      return;
    }

    try {
      const endpoint = "http://localhost:3000/api/auth/reset-password";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Link reset password telah dikirim ke email Anda.");
      } else {
        console.error("Reset password failed:", data);
        alert(data.message || "Terjadi kesalahan, silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error during reset password:", error);
      alert("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email" />
        </label>
        <ReCAPTCHA ref={recaptchaRef} sitekey="6LdFxh8qAAAAAO_NZ3p7scn70POdyee9KqSUpomD" onChange={() => {}} />
        <button type="submit">Kirim Link Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
