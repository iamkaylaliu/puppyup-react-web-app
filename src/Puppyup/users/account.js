import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useSelector } from "react-redux";
function Account() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const user = currentUser;
  console.log("a", user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const updateUser = async () => {
    console.log(user._id);
    const status = await client.updateUser(user._id,user);
  };
  const signout = async () => {
    const status = await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Puppyup/signin");
  };
  const deleteUser = async () => {
    const status = await client.deleteUser(user._id);
    dispatch(setCurrentUser(null));
    navigate("/Puppyup/Home");
  };

  return (
    <div className="w-50 mx-2 my-2">
      {!user && <h3>Sorry, you do not have access to the info...</h3>}
      {user && (
        <div>
          <h3 className="my-2">Account</h3>
          <div className="input-row">
            <label htmlFor="username" className="label">
              Username:
            </label>

          <input
            value={user.username}
            readOnly
            placeholder="username"
            className="form-control mb-2"
          />
          </div>
          <div className="input-row">
            <label htmlFor="password" className="label">
              Password:
            </label>
          

          <input value={user.password}
            onChange={(e) => dispatch(setCurrentUser({ ...user, password: e.target.value }))}
            placeholder="password"
            className="form-control mb-2"
          />
          </div>
          <div className="input-row">
            <label htmlFor="firstname" className="label">
              Name:
            </label>

            <input value={user.firstName}
              onChange={(e) => dispatch(setCurrentUser({ ...user, firstName: e.target.value }))}
              placeholder="firstname"
              className="form-control mb-2"
            />
          </div>  
          <div className="input-row">
            <label htmlFor="dob" className="label">
              Date of Birth:
            </label>
          <input value={user.dob}
            onChange={(e) => dispatch(setCurrentUser({ ...user, dob: e.target.value }))}
            placeholder="dob"
            className="form-control mb-2"
          />
          </div>
          <div className="input-row">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input value={user.email}
              onChange={(e) => dispatch(setCurrentUser({ ...user, email: e.target.value }))}
              placeholder="email"
              className="form-control mb-2"
            />
          </div>
          
          <div className="input-row">
            <label htmlFor="breed" className="label">
              Breed:
            </label>
          <input value={user.breed}
            onChange={(e) => dispatch(setCurrentUser({ ...user, breed: e.target.value }))}
            placeholder="breed"
            className="form-control mb-2"
          />
          </div>
          <div className="input-row">
            <label htmlFor="gender" className="label">
              Gender:
            </label>
            <select className="form-control mb-2" value={user.gender} onChange={(e) => dispatch(setCurrentUser({ ...user, gender: e.target.value }))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
          </div>
          <div className="input-row">
            <label htmlFor="primaryVet" className="label">
              Primary Vet:
            </label>
          <input value={user.primaryVet}
            onChange={(e) => dispatch(setCurrentUser({ ...user, primaryVet: e.target.value }))}
            placeholder="primary vet"
            className="form-control mb-2"
          />
          </div>
          <div className="input-row">
            <label htmlFor="Park" className="label">
              Favorite Park:
            </label>
            <input value={user.Park}
              onChange={(e) => dispatch(setCurrentUser({ ...user, Park: e.target.value }))}
              placeholder="park"
              className="form-control mb-2"
            />

          </div>

          <div className="input-row">
            <label htmlFor="role" className="label">
              Role:
            </label>
          {user.role === "ADMIN" ? (
            <select
              value={user.role} // Display current role for admin
              className="form-control mb-2"
              disabled // Disable the select field for admin
            >
              <option value="ADMIN">Admin</option>
            </select>
          ) : (
            <select
              value={user.role} // Display current role for non-admin
              onChange={(e) => {
                const updatedAccount = {
                  ...user,
                  role: e.target.value,
                };
                dispatch(setCurrentUser({ ...user, dob: e.target.value }))
              }}
              className="form-control mb-2"
            >
              <option value="USER">User</option>
              <option value="VENDOR">Vendor</option>
            </select>
          )}
          </div>
          <button onClick={updateUser} className="btn btn-primary w-100 mb-2">
            Save
          </button>
          <button onClick={signout} className="btn btn-danger w-100 mb-2">
            Signout
          </button>
          <button onClick={deleteUser} className="btn btn-secondary w-100 mb-2">
            Delete Account
          </button>
        </div>
      )}
    </div>
  );

}

export default Account;
