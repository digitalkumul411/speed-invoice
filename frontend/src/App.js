import "./App.css";
import Landing from "./pages/landing/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <>
      <h1>Speed Invoice</h1>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes access={true} />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
