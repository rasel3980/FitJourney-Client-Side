import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { authContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";

const Register = () => {
  const { handleRegister,ManageProfile } = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const location = useLocation();

  const handleRegisterUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photoURl.value;
    const password = form.password.value;
    // console.log(name, email, password, photo);
    const from = location.state?.from?.pathname || "/";

    setErrorMessage("");
    setSuccess(false);
    if (password.length < 6) {
      setErrorMessage("password should be 6 character or longer");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage("password must contain at least one lowercase letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage("password must contain at least one Uppercase letter");
      return;
    }
    handleRegister(email, password)
    .then((result) => {
      navigate(from, { replace: true });
      ManageProfile(name, photo);
      // console.log(result.user);
      setSuccess(true);
      navigate("/");
      form.reset();
    });
  };

  return (
    <>
    <Helmet>
      <title>Register | FitJourney</title>
    </Helmet>
    <div className="flex flex-col my-10 border shadow-xl mx-auto max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
      </div>
      <form
        onSubmit={handleRegisterUser}
        noValidate=""
        action=""
        className="space-y-12"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Name
            </label>
            <input
              type="text"
              required
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
            required
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
            required
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
              className="w-full px-8 py-3 text-xl font-bold rounded-md bg-cyan-800 hover:bg-cyan-900 text-white"
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
          {errorMessage && (
            <p className="text-red-600 ml-4 mb-3">{errorMessage}</p>
          )}
        </div>
      </form>
    </div>
    </>
  );
};

export default Register;
