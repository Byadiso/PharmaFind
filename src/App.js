import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import PharmacyDetailPage from "./pages/PharmacyDetailPage";
import CreatePharmacyForm from "./components/CreatePharmacyForm ";
import PdfTableExtractor from "./Helper/UploadPharmacies";
import UploadPharmacies from "./Helper/UploadPharmacies";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pharmacy/create" element={<CreatePharmacyForm />} />
        <Route path="/pharmacy/:id" element={<PharmacyDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/Contact" element={<Contact />} />

        

        {/* <Route path="/uploadJSON" element={<UploadPharmacies />} />  */}
        <Route
          path="/uploadJSON"
          element={
            <ProtectedRoute>
              <UploadPharmacies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      
    </Router>
  );
}

export default App;