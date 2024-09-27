import React, { useState } from 'react';

const Signup = () => {
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission, including validation
    console.log('Form submitted:', { formType, email, password, fullName, rememberMe });
  };

  const renderLoginForm = () => (
    <>
      <div className="mb-4">
        <input
          type="text"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </>
  );

  const renderForgotPasswordForm = () => (
    <div className="mb-4">
      <input
        type="email"
        required
        className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );

  const renderResetPasswordForm = () => (
    <>
      <div className="mb-4">
        <input
          type="password"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          required
          className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            {formType === 'login' && "Login"}
            {formType === 'signup' && "Registration"}
            {formType === 'forgotPassword' && "Forgot Password"}
            {formType === 'resetPassword' && "Reset Password"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />

          {formType === 'login' && renderLoginForm()}
          {formType === 'signup' && renderSignupForm()}
          {formType === 'forgotPassword' && renderForgotPasswordForm()}
          {formType === 'resetPassword' && renderResetPasswordForm()}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {formType === 'login' && "Login"}
              {formType === 'signup' && "Register"}
              {formType === 'forgotPassword' && "Send Reset Link"}
              {formType === 'resetPassword' && "Reset Password"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          {formType === 'login' && (
            <button onClick={() => setFormType('signup')} className="text-sm text-indigo-400 hover:text-indigo-500">
              Don't have an account? Register
            </button>
          )}
          {formType === 'signup' && (
            <button onClick={() => setFormType('login')} className="text-sm text-indigo-400 hover:text-indigo-500">
              Already have an account? Login
            </button>
          )}
          {(formType === 'forgotPassword' || formType === 'resetPassword') && (
            <button onClick={() => setFormType('login')} className="text-sm text-indigo-400 hover:text-indigo-500">
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;