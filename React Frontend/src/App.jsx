import "./App.css";
import Login from "../src/Components/Login Page/Login";
import NavBar from "./Components/Home Page/Navbar";
import Home from "./Components/Home Page/home";
import Contact from "./Components/Contact Page/Contact";
import Joblist from "./Components/JobListing Page/JobListing";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About from "./Components/About Page/About";
import Admin from "./Components/Admin Page/Admin";
import Company from "./Components/CompanyShowcase Page/CompanyShowcase";
import AddJob from "./Components/AddJobs Page/AddJobs";
import Jobs from "./Components/Jobs Page/Jobs";
import React from "react";

function App() {
  const Layout = () => {
    const location = useLocation();

    const shouldShowNavBar = location.pathname !== "/admin";

    return (
      <>
        {shouldShowNavBar && <NavBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="job" element={<Joblist />} />
          <Route path="company" element={<Company />} />
          <Route path="home" element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="addjob" element={<AddJob />} />
          <Route path="adminjob" element={<Jobs />} />
        </Routes>
      </>
    );
  };

  return (
    <BrowserRouter>
      <Layout /> {/* Use the Layout component inside BrowserRouter */}
    </BrowserRouter>
  );
}

export default App;
