import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useSelector } from "react-redux";
function Account() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const user = currentUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateUser = async () => {
    const status = await client.updateUser(user._id, user);
  };
  const signout = async () => {
    const status = await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Puppyup/signin");
  };
  return (
    <div>
      <h1>Account</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <input
            type="email"
            className="form-control"
            value={user.email}
            onChange={(e) => dispatch(setCurrentUser({ ...user, email: e.target.value }))}
          />
          <input
            type="text"
            className="form-control"
            value={user.firstName}
            onChange={(e) => dispatch(setCurrentUser({ ...user, firstName: e.target.value }))}
          />
          <input
            type="text"
            className="form-control"
            value={user.lastName}
            onChange={(e) => dispatch(setCurrentUser({ ...user, lastName: e.target.value }))}
          />
          <button onClick={updateUser} className="btn btn-primary">
            Update
          </button>
          <button onClick={signout} className="btn btn-danger">
            Sign Out
          </button>
          {user.role === "ADMIN" && (
            <Link to="/Puppyup/users" className="btn btn-warning">
              Users
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;