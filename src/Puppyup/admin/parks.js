import * as client from "./parkClient";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsTrash3Fill, BsPencil, BsPlusCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import Nav from "./Nav";
import * as usersClient from "../users/client";
function ParkList() {
  const [parks, setParks] = useState([]);
  const [users, setUsers] = useState([]);

  const [park, setPark] = useState({ parkName: "", address: "", phoneNumber: "", servicesOffered: "", operatingHours: "", website: "", ratings: "" });

  const { currentUser } = useSelector((state) => state.userReducer);
  const fetchParks = async () => {
    const parks = await client.findAllParks();
    setParks(parks);
  };

  const fetchUsers = async () => {
    const fetchedUsers = await usersClient.findAllUsers();
    setUsers(fetchedUsers);
  };

  const createPark = async () => {
    try {
      const newPark = await client.createPark(park);
      setParks([newPark, ...parks]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectPark = async (parkId) => {
    try {
      const u = await client.findParkById(parkId);
      console.log(park.parkName)
      setPark(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updatePark = async () => {
    try {
      const status = await client.updatePark(park._id, park);
      setParks(parks.map((v) => (v._id === park._id ? park : v)));
    } catch (err) {
      console.log(err);
    }
  };

  const deletePark = async (parkId) => {
    try {
      await client.deletePark(parkId);
      setParks(parks.filter((v) => v._id !== park._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchParks();
  }, [parks]);

  useEffect(() => {
    fetchUsers();
  }, [park]);

  return (
    <div className="mx-3 my-3" style={{ maxWidth: "100%" }}>
      {(!currentUser || currentUser.role !== "ADMIN") && (
        <h3>Sorry, you do not have access to the info...</h3>
      )}
      {currentUser && currentUser.role === "ADMIN" && (
        <>
          <Nav />
          <div className="table-container table-responsive" style={{ maxWidth: '100%' }}>
            <table className="table" >
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Size Acres</th>
                </tr>
                <tr>
                  <td>
                    <input className="form-control" value={park.parkName} onChange={(e) => setPark({ ...park, parkName: e.target.value })} />
                  </td>
                  <td>
                    <input className="form-control" value={park.location} onChange={(e) => setPark({ ...park, location: e.target.value })} />
                  </td>
                  <td>
                    <input className="form-control" value={park.sizeAcres} onChange={(e) => setPark({ ...park, sizeAcres: e.target.value })} />
                  </td>
                  


                  <td className="text-nowrap">
                    <BsFillCheckCircleFill onClick={updatePark}
                      className="me-2 text-success fs-1 text" />

                    <BsPlusCircleFill className="text-primary fs-1 text" onClick={createPark} />
                  </td>
                </tr>
              </thead>
              <tbody>
                {parks.map((park, index) => (
                  <>
                    <tr key={park._id}>
                      <td>
                      <Link to={`/PuppyUp/Admin/parks/${park._id}`}>{park.parkName}</Link>
                      </td>
                      <td>
                        {park.location}
                      </td>
                      <td>{park.sizeAcres}</td>
                      <td className="text-nowrap">
                        <button className="btn btn-warning me-2">
                          <BsPencil onClick={() => selectPark(park._id)} />
                        </button>
                        <button className="me-2 btn btn-danger" onClick={() => deletePark(park._id)}>
                          <BsTrash3Fill />
                        </button>
                      </td>

                    </tr>
                    <tr key={index}>
                      <td colSpan="8">
                        {users && "Serving:"}
                        {users.filter(user => user.Park).filter(filteredUser => filteredUser.Park === park._id).map(filteredUser => (
                          <div className="wd-user-link">
                            <Link to={`/Puppyup/Profile/users/${filteredUser._id}`} key={filteredUser._id}>{filteredUser.username}</Link>
                          </div>))}
                      </td>
                    </tr>
                  </>

                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default ParkList;