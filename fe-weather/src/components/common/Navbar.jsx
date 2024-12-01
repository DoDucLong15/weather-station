//@ts-check

import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import weatherStationLogo from "../../assets/logo/logo-cloudy.png";
import { NavbarLinks } from "../../data/navbar-links";

const Navbar = () => {
  const location = useLocation();

  // when user click Navbar link then it will hold yellow color
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // when user scroll down , we will hide navbar , and if suddenly scroll up , we will show navbar
  const [showNavbar, setShowNavbar] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });
  // control Navbar
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) setShowNavbar("hide");
      else setShowNavbar("show");
    } else setShowNavbar("top");

    setLastScrollY(window.scrollY);
  };

  return (
    <nav
      className={`z-[10] bg-richblack-900 flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white translate-y-0 transition-all ${showNavbar}`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img
            src={weatherStationLogo}
            alt="Logo"
            width={160}
            height={42}
            loading="lazy"
          />
        </Link>
        <ul className="hidden sm:flex gap-x-6 text-richblack-25">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              <Link to={link?.path}>
                <p
                  className={`${
                    matchRoute(link?.path)
                      ? "bg-yellow-25 text-black"
                      : "text-richblack-25"
                  } rounded-xl p-1 px-3 `}
                >
                  {link.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-x-4 items-center">
          <Link to="/get-started">
            <button
              className={` px-[12px] py-[8px] text-richblack-100 rounded-md 
                                ${
                                  matchRoute("/get-started")
                                    ? "border-[2.5px] border-yellow-50"
                                    : "border border-richblack-700 bg-richblack-800"
                                } `}
            >
              Get started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
