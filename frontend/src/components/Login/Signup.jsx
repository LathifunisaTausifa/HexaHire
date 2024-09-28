import React, { useState } from 'react';

// Admin and User dashboard components
const AdminDashboard = () => <h2>Welcome to Admin Dashboard!</h2>;
const UserDashboard = () => <h2>Welcome to User Dashboard!</h2>;

const Signup = () => {
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState('user'); // Role dropdown (user or admin)
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);

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
      // Redirect based on role
      if (role === 'admin') {
        window.location.href = '/admin'; // Redirect to Admin Dashboard
      } else {
        window.location.href = '/user'; // Redirect to User Dashboard
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
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {formType === 'login'
            ? 'Sign In'
            : formType === 'signup'
            ? 'Sign Up'
            : formType === 'forgotPassword'
            ? 'Forgot Password'
            : 'Reset Password'}
        </h2>
        <form onSubmit={handleSubmit}>
          {formType === 'login'
            ? renderLoginForm()
            : formType === 'signup'
            ? renderSignupForm()
            : formType === 'forgotPassword'
            ? renderForgotPasswordForm()
            : renderResetPasswordForm()}
          {formType !== 'forgotPassword' && formType !== 'resetPassword' && (
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full"
              >
                {formType === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          )}
        </form>
        <div className="text-center text-white">
          {formType === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setFormType('signup')}
                className="text-indigo-400"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setFormType('login')}
                className="text-indigo-400"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
