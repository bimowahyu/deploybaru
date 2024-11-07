import React from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Footer from "./components/Footer"; 
import Home from "./pages/Home"; 
import Login from "./components/Login"; 
import Register from "./components/Register"; 
import AdminDashboard from "./components/AdminDashboard"; 
import SurveyorDashboard from "./pages/SurveyorDashboard"; 
import QuestionnaireForm from "./pages/QuestionnaireForm"; 
import DataRecapComponent from "./components/DataRecapComponent"; 
import DataPerumahan from "./pages/DataPerumahan"; 
import DataRusun from "./pages/DataRusun"; 
import PetaPerumahan from "./pages/PetaPerumahan"; 
import InformasiDasarHukum from "./pages/InformasiDasarHukum"; 
import ResetPassword from "./components/ResetPassword";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/data-perumahan" element={<DataPerumahan />} />
        <Route path="/data-rusun" element={<DataRusun />} />
        <Route path="/peta-perumahan" element={<PetaPerumahan />} />
        <Route path="/informasi-dasar-hukum" element={<InformasiDasarHukum />} />

        {/* Routes tanpa PrivateRoute */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/surveyor/dashboard" element={<SurveyorDashboard />} />
        <Route path="/questionnaire" element={<QuestionnaireForm />} />
        <Route path="/recap" element={<DataRecapComponent />} />
        <Route path="/questionnaire/:id" element={<QuestionnaireForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
