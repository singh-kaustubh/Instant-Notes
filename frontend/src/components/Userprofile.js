import React from "react";
import { useNavigate } from "react-router-dom";
export default function Userprofile(props) {
  const navigate = useNavigate();
  const onclickhandle = () => {
    let bool = window.confirm("Are you done completing your profile?");
    if (bool) {
      navigate("/");
    }
  };
  const { updateProfile } = props;
  return (
    <div>
      <div className="card" style={{ width: "50%", margin: "20px auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">
            {" "}
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateProfile(props.user);
              }}
            >
              {" "}
              Edit profile
            </i>{" "}
          </span>
        </div>
        <img
          src={window.location.origin + "/profile.png"}
          style={{ width: "50%", margin: "auto auto" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body text-center">
          <h5 className="card-title">Profile details</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Name : {props.user.username}</li>
          <li className="list-group-item">Email : {props.user.email}</li>
          <li className="list-group-item">Password: **********</li>
        </ul>
        <div className="card-body text-center" onClick={onclickhandle}>
          <button type="button" className="btn btn-outline-dark">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
