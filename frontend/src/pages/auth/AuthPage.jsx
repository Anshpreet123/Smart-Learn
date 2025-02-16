import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation(); // true or false

  useEffect(() => {
    setIsLogin(!isLogin);
  }, [location?.state?.tf]);
  const [isLogin, setIsLogin] = useState(
    !(location?.state?.tf ? location.state.tf : false) || false,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const base = 'http://localhost:5000' || process.env.REACT_APP_BASE_URL;
  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on submit

    if (isLogin) {
      // Login
      const loginData = {
        email,
        password,
      };
      try {
        const response = await axios.post(
          `${base}/api/v1/users/login`,
          loginData,
        );
        console.log('Login successful:', response.data.accessToken);
        // You can handle further actions here like storing token, redirecting, etc.
        // store the token in cookies or local storage
        localStorage.setItem('token', response.data.accessToken);
        console.log(
          'Token stored in local storage:',
          response.data.accessToken,
        );
        navigate('/profile');
        // useNavigate('/dashboard');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    } else {
      // Sign Up
      const [firstName, lastName] = fullName.split(' '); // Assuming full name is entered as "First Last"
      const signUpData = {
        firstName,
        lastName,
        email,
        password,
        userType: 'student',
      };
      try {
        const response = await axios.post(
          `${base}/api/v1/users/register`,
          signUpData,
        );
        console.log('User registered successfully:', response.data);
        // useNavigate('/login');
        navigate('/login');
        // You can handle further actions like redirecting to login or showing success message
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-orange-300">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form
          id="Authentication-form"
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit} // Use form's onSubmit to handle submission
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-orange-400 text-white p-3 rounded-lg hover:bg-orange-500 transition"
            type="submit" // Use type="submit" for the button to trigger form submission
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button
            className="text-orange-500 font-bold ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
