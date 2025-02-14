import { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import SideBar from './components/sideBar/SideBar';
import Course from './pages/course/Course';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/side" element={<SideBar />} />
        <Route path="/course" element={<Course />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
