import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";

const Login = () => {
  const { handleSignIn, handleGoogleLogin, user } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const from = location.state?.from?.pathname || "/"; // Redirect after login

  const handleLoginForm = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    
    // Clear previous error messages
    setErrorMessage('');
    setSuccess(false);

    // Call your login function (you need to define handleSignIN in AuthProvider)
    handleSignIn(email, password)
      .then((result) => {
        // Successful login
        setSuccess(true);
        navigate(from, { replace: true }); // Redirect to previous page or home
      })
      .catch((error) => {
        // Handle login error
        setErrorMessage('Invalid email or password');
      });
  };

  const handleLoginWithGoogle = () => {
    handleGoogleLogin()
      .then((result) => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorMessage('Error logging in with Google');
      });
  };

  return (
    <>
      <Helmet>
        <title>Login | FitJourney</title>
      </Helmet>

      <div className="w-full mx-auto my-10 max-w-md p-4 rounded-md shadow-xl sm:p-8 dark:bg-gray-50 dark:text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>

        <form onSubmit={handleLoginForm} noValidate className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Link to="/forget-password" className="text-xs hover:underline dark:text-gray-600">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
          </div>

          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>} {/* Error message */}

          <div>
            <p className="text-sm text-center dark:text-gray-600">
              Don't have an account?
              <Link to="/register" className="font-semibold focus:underline hover:underline">
                Sign up here
              </Link>
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-cyan-700 text-white hover:bg-cyan-800"
          >
            Login
          </button>
        </form>

        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-600" />
          <p className="px-3 dark:text-gray-600">OR</p>
          <hr className="w-full dark:text-gray-600" />
        </div>

        <div className="my-6 space-y-4">
          <button
            onClick={handleLoginWithGoogle}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
