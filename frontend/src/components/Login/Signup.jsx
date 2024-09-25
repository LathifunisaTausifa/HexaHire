// import React, { useState } from 'react';

// const Signup = () => {
//   const [isLogin, setIsLogin] = useState(true);
  
//   const toggleForm = () => setIsLogin(!isLogin);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
//       <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg z-10">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-bold text-white">
//             {isLogin ? "Login" : "Registration"}
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6">
//           <input type="hidden" name="remember" defaultValue="true" />
//           <div className="rounded-full shadow-sm -space-y-px ">
//             <div>
//               <input
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border bg-gray-800 border-gray-300 placeholder-white text-gray-900 rounded-t-md focus:outline focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//               />
//             </div>
//             {!isLogin && (
//               <div>
//                 <input
//                   type="email"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-800 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Email"
//                 />
//               </div>
//             )}
//             <div>
//               <input
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 bg-gray-800 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//               />
//             </div>
//           </div>

//           {isLogin && (
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <a href="#" className="font-medium text-indigo-400 hover:text-indigo-500">
//                   Forgot password?
//                 </a>
//               </div>
//             </div>
//           )}

//           {!isLogin && (
//             <div className="flex items-center">
//               <input
//                 id="terms"
//                 name="terms"
//                 type="checkbox"
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               />
//               <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
//                 I agree to the terms & conditions
//               </label>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {isLogin ? "Login" : "Register"}
//             </button>
//           </div>
//         </form>
//         <div className="text-center">
//           <button onClick={toggleForm} className="text-sm text-indigo-400 hover:text-indigo-500">
//             {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from 'react';

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            {isLogin ? "Login" : "Registration"}
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />

          <div className="mb-4">
            <input
              type="text"
              required
              className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Username"
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <input
                type="email"
                required
                className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
              />
            </div>
          )}

          <div className="mb-4">
            <input
              type="password"
              required
              className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>

          {isLogin && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-400 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
          )}

          {!isLogin && (
            <div className="flex items-center mb-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the terms & conditions
              </label>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button onClick={toggleForm} className="text-sm text-indigo-400 hover:text-indigo-500">
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
