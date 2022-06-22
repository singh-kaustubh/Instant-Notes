import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../store/ui-slice";
export default function Signup(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const host = "http://localhost:80";
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
    cpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (credentials.password !== credentials.cpassword) {
        setCredentials({
          username: credentials.username,
          email: credentials.email,
          password: "",
          cpassword: "",
        });
        return window.alert("The two passwords do not match");
      }
      const response = await fetch(`${host}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
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
            message: "Account created successfully!",
            type: "success",
          })
        );
      } else {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Invalid details!",
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
      <h2 className="text-center">Welcome to the SignUp Page</h2>
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
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              onChange={onChange}
              id="username"
              name="username"
              placeholder="Enter your username"
              value={credentials.username}
              min={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address:
            </label>
            <input
              type="email"
              className="form-control"
              onChange={onChange}
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter your email address"
              value={credentials.email}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              name="password"
              id="password"
              placeholder="Enter your password: minimum 5 letters"
              value={credentials.password}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              onChange={onChange}
              name="cpassword"
              id="cpassword"
              placeholder="Enter your password again"
              value={credentials.cpassword}
              required
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
