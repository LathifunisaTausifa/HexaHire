// import React, { useState } from 'react';

// const Signup = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   const toggleForm = () => setIsLogin(!isLogin);

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     formData.append("access_key", "13a799ed-5e96-4605-a29f-c0ebcc893040");

//     const object = Object.fromEntries(formData);
//     const json = JSON.stringify(object);

//     const res = await fetch("https://api.web3forms.com/submit", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       body: json
//     }).then((res) => res.json());

//     if (res.success) {
//       console.log("Success", res);
//     }
//   };

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

//           <div className="mb-4">
//             <input
//               type="text"
//               required
//               className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Username" name='UserName'
//             />
//           </div>

//           {!isLogin && (
//             <div className="mb-4">
//               <input
//                 type="email"
//                 required
//                 className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 placeholder="Email" name='Email'
//               />
//             </div>
//           )}

//           <div className="mb-4">
//             <input
//               type="password"
//               required
//               className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               placeholder="Password" name='Password'
//             />
//           </div>

//           {isLogin && (
//             <div className="flex items-center justify-between mb-4">
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
//             <div className="flex items-center mb-4">
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
//             <button onClick={onSubmit}
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               {isLogin ? "Login" : "Register"}
//             </button>
//           </div>
//         </form>

//         <div className="text-center mt-4">
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

  const onSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    formData.append("access_key", "9c8a7699-43a0-444d-96d5-e34a538ee4bf");
  
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    console.log("Payload being sent:", json); // Add this to debug
  
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
  
      const result = await res.json();
  
      if (res.ok) {
        console.log("Success", result);
      } else {
        console.error("Failed:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            {isLogin ? "Login" : "Registration"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />

          <div className="mb-4">
            <input
              type="text"
              required
              className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Username"
              name="UserName"
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <input
                type="email"
                required
                className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
                name="Email"
              />
            </div>
          )}

          <div className="mb-4">
            <input
              type="password"
              required
              className="appearance-none rounded-full w-full px-4 py-3 bg-gray-700 border border-white placeholder-white text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              name="Password"
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
