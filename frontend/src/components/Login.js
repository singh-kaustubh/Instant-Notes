import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../store/ui-slice";
import { useDispatch } from "react-redux";
export default function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const host = "http://localhost:80";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const token = await response.json();
      if (token.success) {
        localStorage.setItem("token", token.authToken);
        navigate("/");
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "User login successful",
            type: "success",
          })
        );
      } else {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Invalid credentials!",
            type: "error",
          })
        );
      }
      setCredentials({
        email: credentials.email,
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2 className="text-center">Welcome to the Login Page</h2>
      <h6 className="text-center">
        (Kindly enter the login details or Sign Up to access or upload your
        personal notes)
      </h6>
      <div className="container text-center shadow-lg p-3 mb-5 bg-body rounded">
        <img
          src={window.location.origin + "/login.jpg"}
          alt=".."
          style={{ width: "50%" }}
        />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              onChange={onChange}
              id="email"
              name="email"
              required
              aria-describedby="emailHelp"
              value={credentials.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              name="password"
              id="password"
              min={5}
              required
              value={credentials.password}
            />
          </div>
          <div className="container text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
