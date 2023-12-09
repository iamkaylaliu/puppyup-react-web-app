// import * as client from "./client";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "./reducer";
// import { useSelector } from "react-redux";
// function Account() {
//   const { currentUser } = useSelector((state) => state.userReducer);
//   const user = currentUser;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const updateUser = async () => {
//     const status = await client.updateUser(user._id, user);
//   };
//   const signout = async () => {
//     const status = await client.signout();
//     dispatch(setCurrentUser(null));
//     navigate("/Puppyup/signin");
//   };
//   return (
//     <div>
//       <h1>Account</h1>
//       {user && (
//         <div>
//           <p>Username: {user.username}</p>
//           <input
//             type="email"
//             className="form-control"
//             value={user.email}
//             placeholder="email"
//             onChange={(e) => dispatch(setCurrentUser({ ...user, email: e.target.value }))}
//           />
//           <input
//             type="text"
//             className="form-control"
//             value={user.firstName}
//             placeholder="first name"
//             onChange={(e) => dispatch(setCurrentUser({ ...user, firstName: e.target.value }))}
//           />
//           <input
//             type="text"
//             className="form-control"
//             value={user.lastName}
//             placeholder="last name"
//             onChange={(e) => dispatch(setCurrentUser({ ...user, lastName: e.target.value }))}
//           />
//           <button onClick={updateUser} className="btn btn-primary">
//             Update
//           </button>
//           <button onClick={signout} className="btn btn-danger">
//             Sign Out
//           </button>
//           {user.role === "ADMIN" && (
//             <Link to="/Puppyup/users" className="btn btn-warning">
//               Users
//             </Link>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Account;

import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Account() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };
  // const fetchAccount = async () => {
  //     const account = await client.account();
  //     setAccount(account);
  // };
  const fetchAccount = async (id) => {
    try {
      if (id) {
        const account = await client.findUserById(id);
        setAccount(account);
      } else {
        const account = await client.account();
        setAccount(account);
      }
    } catch (err) {
      navigate("/puppyup/signin");
    }
  };

  const save = async () => {
    await client.updateUser(account);
    navigate(`/Puppyup/users/${account._id}`);
  };
  const signout = async () => {
    await client.signout();
    navigate("/puppyup/signin");
  };

  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, []);
  return (
    <div className="w-50">
      <h1>Account</h1>
      {account && (
        <div>
          <input
            value={account.username}
            readOnly
            placeholder="username"
            className="form-control mb-2"
          />
          <input value={account.password}
            onChange={(e) => setAccount({
              ...account,
              password: e.target.value
            })}
            placeholder="password"
            className="form-control mb-2"
          />
          <input value={account.firstName}
            onChange={(e) => setAccount({
              ...account,
              firstName: e.target.value
            })}
            placeholder="firstname"
            className="form-control mb-2"
          />
          <input value={account.lastName}
            onChange={(e) => setAccount({
              ...account,
              lastName: e.target.value
            })}
            placeholder="lastname"
            className="form-control mb-2"
          />
          <input value={account.dob}
            onChange={(e) => setAccount({
              ...account,
              dob: e.target.value
            })}
            placeholder="dob"
            className="form-control mb-2"
          />
          <input value={account.email}
            onChange={(e) => setAccount({
              ...account,
              email: e.target.value
            })}
            placeholder="email"
            className="form-control mb-2"
          />

          {/* <select onChange={(e) => setAccount({
            ...account,
            role: e.target.value
          })}
            placeholder="role"
            className="form-control mb-2"
          >
            <option value="USER">User</option>
            <option value="VENDOR">Vendor</option>
            {account.role === "ADMIN" && ( // Check if the user is an admin
              <option value="ADMIN">Admin</option>
            )}
          </select>
          <button onClick={save} className="btn btn-primary w-100 mb-2">
            Save
          </button>
          <button onClick={signout} className="btn btn-danger w-100 mb-2">
            Signout
          </button>
          {account.role === "ADMIN" && (
            <Link to="/puppyup/admin/users" className="btn btn-warning w-100">
              Users
            </Link>
          )} */}
          {account.role === "ADMIN" ? (
            <select
              value={account.role} // Display current role for admin
              className="form-control mb-2"
              disabled // Disable the select field for admin
            >
              <option value="ADMIN">Admin</option>
            </select>
          ) : (
            <select
              value={account.role} // Display current role for non-admin
              onChange={(e) => {
                const updatedAccount = {
                  ...account,
                  role: e.target.value,
                };
                setAccount(updatedAccount);
              }}
              className="form-control mb-2"
            >
              <option value="USER">User</option>
              <option value="VENDOR">Vendor</option>
            </select>
          )}
          <button onClick={save} className="btn btn-primary w-100 mb-2">
            Save
          </button>
          <button onClick={signout} className="btn btn-danger w-100 mb-2">
            Signout
          </button>
          {account.role === "ADMIN" && (
            <Link to="/puppyup/admin/users" className="btn btn-warning w-100">
              Users
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
export default Account;
