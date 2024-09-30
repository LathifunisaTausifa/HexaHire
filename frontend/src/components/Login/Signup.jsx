import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminSideMenu from '../SidebarMenu/AdminSidebarMenu';
import UserSideMenu from '../SidebarMenu/UserSidebarMenu';

const Signup = () => {
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

  // Save credentials to localStorage if "Remember Me" is checked
  const handleRememberMe = () => {
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
  };

  // Simulate sending OTP (would require a backend service in a real app)
  const handleSendOtp = () => {
    const generated = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    setGeneratedOtp(generated);
    setIsOtpSent(true);
    alert(`Your OTP is: ${generated}`); // Simulate sending OTP via email
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

  // Reset password functionality
  const handlePasswordReset = () => {
    if (password === confirmPassword) {
      alert('Password reset successful!');
      setFormType('login');
    } else {
      alert('Passwords do not match.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRememberMe();

    // Simulate login or registration handling
    if (formType === 'login') {
      if (role === 'admin') {
        navigate('/admin'); // Redirect to Admin Dashboard
      } else if (role === 'user') {
        navigate('/user'); // Redirect to User Dashboard
      }
      else {
        navigate ('/')
      }
    } else if (formType === 'signup') {
      console.log('Registration:', { fullName, email, password, role });
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
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white text-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
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
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white text-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
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
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/admin" element={<AdminSideMenu />} />
        <Route path="/user" element={<UserSideMenu />} />
      </Routes>
    </Router>
  );
};

export default App;
