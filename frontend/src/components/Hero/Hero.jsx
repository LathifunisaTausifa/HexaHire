import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import bgVideo from '../../assets/Hero/Tech.mp4';
import Navbar from './Navbar';
import AdminSideMenu from '../SidebarMenu/AdminSidebarMenu';
import UserSideMenu from '../SidebarMenu/UserSidebarMenu';
import { FaChevronCircleDown, FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  const signupRef = useRef(null);
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState('user');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  // Smooth scroll to signup
  const scrollToSignup = () => {
    if (signupRef.current) {
      signupRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Simulate sending OTP
  const handleSendOtp = () => {
    const generated = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(generated);
    setIsOtpSent(true);
    alert(`Your OTP is: ${generated}`);
  };

  // Validate OTP
  const handleValidateOtp = () => {
    if (otp === generatedOtp.toString()) {
      alert('OTP verified successfully!');
      setFormType('resetPassword');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  // Reset password
  const handlePasswordReset = () => {
    if (password === confirmPassword) {
      alert('Password reset successful!');
      setFormType('login');
    } else {
      alert('Passwords do not match.');
    }
  };

  // Save credentials to localStorage if "Remember Me" is checked
  const handleRememberMe = () => {
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRememberMe();

    if (formType === 'login') {
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    }
  };

  const renderLoginForm = () => (
    <>
      <div className="mb-4">
        <input
          type="text"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-full w-full px-4 py-3 bg-gray-700 border border-white text-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <FaChevronDown className="absolute right-5 top-1 m-2 transform -translate-y-1/2 text-white" />
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <button
            onClick={() => setFormType('forgotPassword')}
            className="font-medium text-indigo-400 hover:text-indigo-500"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </>
  );

  const renderSignupForm = () => (
    <>
      <div className="mb-4">
        <input
          type="text"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className=" appearance-auto rounded-full w-full px-4 py-3 bg-gray-700 border border-white text-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <FaChevronDown className="absolute right-3 top-1 m-2 transform -translate-y-1/2 text-white" />
      </div>
    </>
  );

  const renderForgotPasswordForm = () => (
    <>
      <div className="mb-4">
        <input
          type="email"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        onClick={handleSendOtp}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full"
      >
        Send OTP
      </button>
      {isOtpSent && (
        <div className="mt-4">
          <input
            type="text"
            required
            className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={handleValidateOtp}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full mt-2"
          >
            Validate OTP
          </button>
        </div>
      )}
    </>
  );

  const renderResetPasswordForm = () => (
    <>
      <div className="mb-4">
        <input
          type="password"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handlePasswordReset}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full"
      >
        Reset Password
      </button>
    </>
  );


  return (
    <div>
      {/* Background video and Navbar */}
      <div className="h-[700px] relative">
        <video
          autoPlay
          loop
          muted
          className="fixed right-0 top-0 w-full h-[700px] object-cover z-[-1]"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <Navbar />

        {/* Main Body Content */}
        <div className="bg-black/20 h-full text-white relative z-50">
          <div className="flex justify-center items-center h-full p-4">
            <div className="container text-center gap-4">
              <div className="space-y-4 lg:pr-36 ml-16">
                <h1 data-aos="fade-up" className="font-bold text-7xl uppercase">
                  Smart Recruitment System
                </h1>
                <p data-aos="fade-up" data-aos-delay="300">
                  In publishing and graphic design, Lorem ipsum is a placeholder text commonly used
                  to demonstrate the visual form of a document or a typeface without relying on
                  meaningful content.
                </p>
                <button
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="bg-orange-400 hover:bg-orange-500 rounded-md px-6 py-2 duration-300 m-4"
                  onClick={scrollToSignup}
                >
                  Login
                </button>
                <button
                  data-aos="fade-up"
                  data-aos-delay="500"
                  className="bg-orange-400 hover:bg-orange-500 rounded-md px-6 py-2 duration-300"
                  onClick={scrollToSignup}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Signup form */}
          <div ref={signupRef}>
            <div className="h-screen bg-gray-800 bg-opacity-10 flex justify-center items-center">
              <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-white">
                  {formType === 'login' ? 'Login' : 'Sign Up'}
                </h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  {formType === 'login' && renderLoginForm()}
                  {formType === 'signup' && renderSignupForm()}
                  {formType === 'forgotPassword' && renderForgotPasswordForm()}
                  {formType === 'resetPassword' && renderResetPasswordForm()}

                  {formType !== 'forgotPassword' && formType !== 'resetPassword' && (
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full"
                      >
                        {formType === 'login' ? 'Login' : 'Sign Up'}
                      </button>
                      <p className="mt-2 text-center text-sm text-gray-300">
                        {formType === 'login' ? (
                          <>
                            Don't have an account?{' '}
                            <button
                              type="button"
                              onClick={() => setFormType('signup')}
                              className="font-medium text-indigo-400 hover:text-indigo-500"
                            >
                              Sign Up
                            </button>
                          </>
                        ) : (
                          <>
                            Already have an account?{' '}
                            <button
                              type="button"
                              onClick={() => setFormType('login')}
                              className="font-medium text-indigo-400 hover:text-indigo-500"
                            >
                              Login
                            </button>
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Routing and Application
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/admin" element={<AdminSideMenu />} />
        <Route path="/user" element={<UserSideMenu />} />
      </Routes>
    </Router>
  );
};

export default App;
