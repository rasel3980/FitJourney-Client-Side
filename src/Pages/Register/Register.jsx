import { NavLink } from "react-router-dom";

const Register = () => {
  return (
      <div className="flex flex-col my-10 border shadow-xl mx-auto max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        </div>
        <form noValidate="" action="" className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Photo-URL
              </label>
              <input
                type="url"
                name="photoURl"
                id="photoURl"
                placeholder="Paste your Photo-URL link"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button
                type="button"
                className="w-full px-8 py-3 text-xl font-bold rounded-md dark:bg-violet-600 dark:text-gray-50"
              >
                Sign Up
              </button>
            </div>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Already have an account? Please
              <span className="ml-2 text-xl font-bold">
                <NavLink
                to="/login"
                  rel="noopener noreferrer"
                  href="#"
                  className="hover:underline dark:text-violet-600"
                >
                  Login
                </NavLink>
              </span>
            </p>
          </div>
        </form>
      </div>
  );
};

export default Register;
