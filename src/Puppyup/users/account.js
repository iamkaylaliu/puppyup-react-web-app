import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useSelector } from "react-redux";
import { findAllVets } from "../admin/client";
import { findAllParks } from "../admin/parkClient";

function Account() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const user = currentUser;
  const [vets, setVets] = useState([]);
  const [parks, setParks] = useState([]);

  console.log("a", user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const fetchVetsandParks = async () => {
    try {
      const vets = await findAllVets();
      setVets(vets);
      const parks = await findAllParks();
      setParks(parks);
      const vetsMap = new Map(vets.map(vet => [vet._id, vet.vetName]));
      const parksMap = new Map(parks.map(park => [park._id, park.parkName]));
      const vetName = user.primaryVet ? vetsMap.get(user.primaryVet) : '';
      const parkName = user.Park ? parksMap.get(user.Park) : '';
      if (user) {
        dispatch(setCurrentUser({...user, vetName, parkName}));
      }
      console.log("bbc", user);
    } catch (err){
      console.log(err);
    }
    
  }

  const updateUser = async () => {
    if (window.confirm("Are you sure to update your account?")){
    console.log(user._id);
    const vetId = vets.filter(vet => vet.vetName === user.vetName).map(filterdVet => filterdVet._id);
    const parkId = parks.filter(park => park.parkName === user.parkName).map(filterdPark => filterdPark._id);
    const modifiedUser = {...user, primaryVet: vetId[0] ? vetId[0] : null , Park: parkId[0]? parkId[0]: null }
    const status = await client.updateUser(user._id,modifiedUser);
    dispatch(setCurrentUser(modifiedUser));
    console.log("status", status)
    console.log("cr", currentUser, user);
    }  
  };
  const signout = async () => {
    if (window.confirm("Are you sure to sign out?")){
    const status = await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Puppyup/signin");
    }
  };
  const deleteUser = async () => {
    if (window.confirm("Are you sure to delete your account?")){
      const status = await client.deleteUser(user._id);
      dispatch(setCurrentUser(null));
      navigate("/Puppyup/Home");
    }
  };
  useEffect(()=> {
    fetchVetsandParks()
  }  , []
  )

  return (
    <div className="w-100 mx-2 my-2">
      {!user && <h3>Sorry, you do not have access to the info...</h3>}
      {user && (
        <div className="w-50">
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
          type="password"
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
            <label htmlFor="birthday" className="label">
              Date of Birth:
            </label>
          <input value={user.birthday} type="date"
            onChange={(e) => dispatch(setCurrentUser({ ...user, birthday: e.target.value }))}
            placeholder="birthday"
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
            <select className="form-control" value={user.vetName} onChange={(e) => dispatch(setCurrentUser({ ...user, vetName: e.target.value }))}>
              <option value=""></option>
              {vets.map(vet => (
                <option key={vet._id} value={vet.vetName}>{vet.vetName}</option>
              ))}
            </select>
          </div>
          <div className="input-row">
            <label htmlFor="Park" className="label">
              Favorite Park:
            </label>
            <select className="form-control" value={user.parkName} onChange={(e) => dispatch(setCurrentUser({ ...user, parkName: e.target.value }))}>
              <option value=""></option>
              {parks.map(park => (
                <option key={park._id} value={park.vetName}>{park.parkName}</option>
              ))}
            </select>

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
                dispatch(setCurrentUser({ ...user, role: e.target.value }))
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
