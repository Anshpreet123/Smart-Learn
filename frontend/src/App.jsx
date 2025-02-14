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
import VideoPage from './components/videoPage/VideoPage';
import AuthPage from './pages/auth/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/side" element={<SideBar />} />
        <Route path="/course" element={<Course />} />
        {/* <Route path="/comment" element={<VideoPage />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
