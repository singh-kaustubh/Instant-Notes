import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Userprofile from "./Userprofile";
import { uiActions } from "../store/ui-slice";
export default function Userinfo() {
  const dispatch = useDispatch();
  const [newUser, setnewUser] = useState({
    nusername: "",
    nemail: "",
    npassword: "",
  });
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({ username: "", email: "" });
  const host = "http://localhost:80";
  const fetchuser = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (json.success) {
        const { username, email } = json.user;
        setUser({ username: username, email: email });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchuser();
    //eslint-disable-line
  }, []);
  const edituser = async (nusername, nemail, npassword) => {
    try {
      const response = await fetch("http://localhost:80/api/auth/edituser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          nusername: nusername,
          nemail: nemail,
          npassword: npassword,
          password: password,
        }),
      });
      const json = await response.json();
      await fetchuser();
      setnewUser({
        nusername: json.username,
        nemail: json.email,
        npassword: "",
      });
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Profile edited succesfully!",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Invalid details",
          type: "error",
        })
      );
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    edituser(newUser.nusername, newUser.nemail, newUser.npassword);
    refClose.current.click();
  };
  const onChange = (e) => {
    setnewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const updateProfile = (user) => {
    ref.current.click();
    setnewUser({
      nusername: user.username,
      nemail: user.email,
      npassword: "",
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <div className="container">
      <Userprofile user={user} updateProfile={updateProfile} />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{ display: "none" }}
        ref={ref}
      ></button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form className="my-3" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit your Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Username (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nusername"
                    name="nusername"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={newUser.nusername}
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="nemail"
                    name="nemail"
                    onChange={onChange}
                    value={newUser.nemail}
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    New password (optional)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="npassword"
                    name="npassword"
                    aria-describedby="emailHelp"
                    autoComplete="off"
                    min={5}
                    value={newUser.npassword}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Password (Enter password to confirm changes)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    aria-describedby="emailHelp"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    value={password}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  ref={refClose}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-dark">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
