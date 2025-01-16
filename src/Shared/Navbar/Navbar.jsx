import { useContext, useState } from "react";
import logo from '../../assets/business_gym_logo2.jpg'
import { NavLink } from "react-router-dom";
import { authContext } from "../../Providers/AuthProvider/AuthProvider";

const Navbar = () => {
  const {handleLogout} = useContext(authContext)
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  return (
    <>
      {/* Navbar with Avatar */}
      <header className="relative z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
        <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
          <nav
            aria-label="main navigation"
            className="flex h-[5.5rem] items-center justify-between font-medium text-slate-700"
            role="navigation"
          >
            {/* Brand logo */}
            <a
              id="WindUI"
              aria-label="WindUI logo"
              aria-current="page"
              className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none"
              href="javascript:void(0)"
            >
              <img className="h-12 w-12 rounded-xl" src={logo} alt="" />
              FitJourney
            </a>

            {/* Mobile trigger */}
            <button
              className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${isToggleOpen
                ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0"
                : ""}
              `}
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              aria-expanded={isToggleOpen ? "true" : "false"}
              aria-label="Toggle navigation"
            >
              <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                ></span>
                <span
                  aria-hidden="true"
                  className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                ></span>
              </div>
            </button>

            {/* Navigation links */}
            <ul
              role="menubar"
              aria-label="Select page"
              className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-center lg:justify-center lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100 ${
                isToggleOpen ? "visible opacity-100 backdrop-blur-sm" : "invisible opacity-0"
              }`}
            >
              <li role="none" className="flex items-center">
                <NavLink
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Home</span>
                </NavLink>
              </li>
              <li role="none" className="flex items-center">
                <NavLink
                  role="menuitem"
                  aria-current="page"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 text-emerald-500 transition-colors duration-300 hover:text-emerald-600 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>All Trainer</span>
                </NavLink>
              </li>
              <li role="none" className="flex items-center">
                <NavLink
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>All Classes</span>
                </NavLink>
              </li>
              <li role="none" className="flex items-center">
                <a
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Dashboard</span>
                </a>
              </li>
              <li role="none" className="flex items-center">
                <NavLink
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Forums</span>
                </NavLink>
              </li>
              <li role="none" className="flex items-center">
                <NavLink
                  to="/login"
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Login</span>
                </NavLink>
              </li>
              <li role="none" className="flex items-center">
                <NavLink
                  to="/register"
                  role="menuitem"
                  aria-haspopup="false"
                  className="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600 focus:outline-none focus-visible:outline-none lg:px-8"
                  href="javascript:void(0)"
                >
                  <span>Register</span>
                </NavLink>
              </li>
            </ul>

            {/* Avatar */}
            <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
              <a
                href="#"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <img
                  src="https://i.pravatar.cc/40?img=35"
                  alt="user name"
                  title="user name"
                  width="40"
                  height="40"
                  className="max-w-full rounded-full"
                />
                <span className="absolute bottom-0 right-0 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 p-1 text-sm text-white">
                  <span className="sr-only"> 7 new emails </span>
                </span>
              </a>
              <button onClick={handleLogout}>LogOut</button>
            </div>

          </nav>
        </div>
      </header>
      {/* End Navbar with Avatar */}
    </>
  );
};

export default Navbar;
