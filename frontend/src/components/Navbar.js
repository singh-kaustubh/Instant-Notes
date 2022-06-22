import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {}, [location]);
  const onclickHandler = (e) => {
    let bool = window.confirm("Do you want to logout?");
    if (bool) {
      localStorage.removeItem("token");
      navigate("/login");
      window.alert("You have been successfully logged out!");
    }
  };
  const profiledisplay = (e) => {
    let bool = window.confirm("Do you want to edit/view your profile?");
    if (bool && localStorage.getItem("token")) {
      navigate("/userinfo");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Instant Notes⚡
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                href="https://www.linkedin.com/in/kaustubh-singh-19573a1a6/"
              >
                About
              </a>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <>
              <Link
                className="btn btn-outline-success mx-2"
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-info mx-2"
                to="/signup"
                role="button"
              >
                SignUp
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-warning mx-2"
                onClick={onclickHandler}
              >
                Logout
              </button>
              <button
                type="button"
                className="btn btn-outline-primary mx-2"
                onClick={profiledisplay}
              >
                <i className="fa fa-user"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
