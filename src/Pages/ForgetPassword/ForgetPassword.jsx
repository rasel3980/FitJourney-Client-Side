import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../Providers/AuthProvider/AuthProvider';
import { Helmet } from 'react-helmet';

const ForgetPassword = () => {
    const { ForgetPassword } = useContext(authContext);
  const [success,setSuccess] = useState(false)

  const handleForgetPassword = (e) => {
    e.preventDefault();
    setSuccess(false)
    const email = e.target.email.value
    ForgetPassword(email)
      .then(() => {
        // console.log('forget successfully');
        setSuccess(true);
      })
      .catch((error) => {
        // console.log("ERROR", error);
      });
  };
    return (
        <>
        <Helmet>
          <title>Forget Password | FitJourney</title>
        </Helmet>
        <div className="w-full mx-auto my-10 max-w-md p-4 rounded-md shadow-xl sm:p-8 dark:bg-gray-50 dark:text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">
        Forget Password!
        </h2>

        <form
          onSubmit={handleForgetPassword}
          noValidate=""
          action=""
          className="space-y-8"
        >
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
          <button
            className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
          >
            Reset Password
          </button>
        </form>
      </div>
        </>
    );
};

export default ForgetPassword;