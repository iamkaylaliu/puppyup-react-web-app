import * as client from "./client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../admin/Nav";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BsTrash3Fill, BsPencil, BsPlusCircleFill, BsFillCheckCircleFill} from "react-icons/bs";
import "./index.css";
import * as vetsClient from "../admin/client"
import { setCurrentUser } from "./reducer";
import { findAllParks } from "../admin/parkClient";
import { USERS_API } from "../posts/client";
function UserList() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", password: "", role: "USER" });
  const [vets, setVets] = useState([]);
  const {currentUser} = useSelector((state) => state.userReducer);
  const [parks, setParks] = useState([]);

  const dispatch = useDispatch();
  // const fetchUsers = async () => {
  //   const users = await client.findAllUsers();
  //   setUsers(users);
  // };

  // const fetchVets = async () => {
  //   const vets = await vetsClient.findAllVets();
  //   setVets(vets);
  // };
  const fetchUsers = async () => {
    try {
        const users = await client.findAllUsers();
        const vets = await vetsClient.findAllVets();
        setVets(vets);
        const parks = await findAllParks();
        setParks(parks);
        const vetsMap = new Map(vets.map(vet => [vet._id, vet.vetName]));
        const parksMap = new Map(parks.map(park => [park._id, park.parkName]));
        const usersWithVetAndParkName = users.map(user => {
            const vetName = user.primaryVet ? vetsMap.get(user.primaryVet) : '';
            const parkName = user.Park ? parksMap.get(user.Park) : '';
            return { ...user, vetName, parkName };
        });

        setUsers(usersWithVetAndParkName);
    } catch (err) {
        console.log(err);
    }
  };




  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      console.log("create", user);
      const vetsMap = new Map(vets.map(vet => [vet._id, vet.vetName]));
      const parksMap = new Map(parks.map(park => [park._id, park.parkName]));
      const getModifiedUser = (newUser) => {
          const vetName = newUser.primaryVet ? vetsMap.get(newUser.primaryVet) : '';
          const parkName = newUser.Park ? parksMap.get(newUser.Park) : '';
          return { ...newUser, vetName, parkName };
        };
        const modifiedUser = getModifiedUser(newUser);
        setUsers(users => [...users, modifiedUser]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectUser = async (userId) => {
    try {
      const u = users.find((u) => u._id === userId);
      console.log(user.username)
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const vetId = vets.filter(vet => vet.vetName === user.vetName).map(filterdVet => filterdVet._id);
      const parkId = parks.filter(park => park.parkName === user.parkName).map(filterdPark => filterdPark._id);
      const modifiedUser = {...user, primaryVet: vetId[0] ? vetId[0] : null , Park: parkId[0]? parkId[0]: null }
      console.log("mu", modifiedUser)
      const status = await client.updateUser(user._id,modifiedUser);
      console.log("UserList",status);
      fetchUsers();
      // setUsers(users.map((u) => (u._id === user._id ? user : u)));
      if (currentUser._id===user._id) {
        dispatch(setCurrentUser(modifiedUser));
        console.log("update user", user)
      }
    } catch (err) {
      console.log(err);
    }
  };     

  const deleteUser = async (userId) => {
    try {
      await client.deleteUser(userId);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  

  useEffect(() => {
    fetchUsers();
    // fetchVets();
  }, []);
  



  return (
    <div className="mx-3 my-3" style={{maxWidth: "100%"}} >
      {(!currentUser || currentUser.role!== "ADMIN") && (
        <h3>Sorry, you do not have access to the info...</h3>
      )}  
      {currentUser && currentUser.role === "ADMIN" && (
        <>
          <Nav />
          <div className="table-container table-responsive" style={{ maxWidth: '100%' }}>
          <table className="table" >
            <thead className="thead-light">
            <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Role</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Primary Vet</th>
                <th>Favorite Park</th>
                <th>Birthday</th>
                <th>Breed</th>
                <th>Email</th>
            </tr>
            <tr>
            <td>
              <input className="form-control" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
            </td>
            <td>
            <input className="form-control" type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}/>
            </td>
            <td>
              <select className="form-control" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="VENDOR">Vendor</option>
              </select>
            </td>
            <td>
              <input className="form-control" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
            </td>
            <td>
              <select className="form-control" value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </td>
            <td>
              <select className="form-control" value={user.vetName} onChange={(e) => setUser({ ...user, vetName: e.target.value })}>
                {console.log("bbb",user.vetName)}
                <option value=""></option>
                {vets.map(vet => (
                  <option key={vet._id} value={vet.vetName}>{vet.vetName}</option>
                ))}
              </select>
            </td>
            <td>
              <select className="form-control" value={user.parkName} onChange={(e) => setUser({ ...user, parkName: e.target.value })}>
                <option value=""></option>
                {parks.map(park => (
                  <option key={park._id} value={park.parkName}>{park.parkName}</option>
                ))}
              </select>
            </td>
            <td>
              <input className="form-control" type="date" value={user.birthday} onChange={(e) => setUser({ ...user, birthday: e.target.value })}/>
            </td>
            <td>
              <input className="form-control" value={user.breed} onChange={(e) => setUser({ ...user, breed: e.target.value })}/>
            </td>
            <td>
              <input className="form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}/>
            </td>

            <td  className="text-nowrap">
            <BsFillCheckCircleFill onClick={updateUser}
                className="me-2 text-success fs-1 text" />

              <BsPlusCircleFill className="text-primary fs-1 text" onClick={createUser}/>
            </td>
          </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user._id}>
                <td>
                    <Link to={`/PuppyUp/Profile/users/${user._id}`}>
                        {user.username}
                    </Link>
                </td>
                <td>
                    {'*'.repeat(user.password.length)}
                </td>
                <td>{user.role}</td>
                <td>{user.firstName}</td>
                <td>{user.gender}</td>
                <td>{user.vetName}</td>
                <td>{user.parkName}</td>
                <td>{user.birthday && user.birthday.toString().split('T')[0]}</td>
                <td>{user.breed}</td>
                <td>{user.email}</td>
                <td className="text-nowrap">
                <button onClick={() => {selectUser(user._id)}}  className="btn btn-warning me-2">
                    <BsPencil/>
                </button>
                    <button className="me-2 btn btn-danger" onClick={() => deleteUser(user._id)}>
                    <BsTrash3Fill/>
                    </button>
                </td>
                </tr>))}
            </tbody>
        </table>
        </div>
        </>
      )}
    </div>
  );
}

export default UserList;