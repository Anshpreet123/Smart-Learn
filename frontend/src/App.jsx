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
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import Checkout from './pages/checkout/Checkout';
import CourseDetails from './pages/course/CourseDetails';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="mb-28"> </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/side" element={<SideBar />} />
        <Route path="/course" element={<Course />}>
          <Route path="course/checkout" element={<Checkout />} />
          <Route path=":courseId" element={<CourseDetails />}></Route>
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/comment" element={<VideoPage />} /> */}
      </Routes>
      <div className="mt-28"> </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
