import * as client from "./client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsTrash3Fill, BsPencil, BsPlusCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import Nav from "../Nav";
import * as usersClient from "../../users/client";
import { useParams } from "react-router-dom";

function StaffList() {
  const { parkId } = useParams();
  const [staffs, setStaffs] = useState([]);
  const [staff, setStaff] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const { currentUser } = useSelector((state) => state.userReducer);

  const fetchStaffs = async () => {
    const staffList = await client.findStaffsByPark(parkId);
    setStaffs(staffList);
  };


  const createStaff = async () => {
    try {
      const newStaff = await client.createStaff(staff);
      setStaffs([newStaff, ...staffs]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectStaff = async (staffId) => {
    try {
      const selectedStaff = await client.findStaffById(staffId);
      setStaff(selectedStaff);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStaff = async () => {
    try {
      const status = await client.updateStaff(staff._id, staff);
      setStaffs(staffs.map((v) => (v._id === staff._id ? staff : v)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStaff = async (staffId) => {
    try {
      await client.deleteStaff(staffId);
      fetchStaffs();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

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
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
                <tr>
                    <td>
                        <input className="form-control" value={staff.fullName} onChange={(e) => setStaff({ ...staff, fullName: e.target.value })} />
                    </td>
                    <td>
                        <input className="form-control" value={staff.phoneNumber} onChange={(e) => setStaff({ ...staff, phoneNumber: e.target.value })} />
                    </td>
                    <td>
                        <input className="form-control" value={staff.email} onChange={(e) => setStaff({ ...staff, email: e.target.value })} />
                    </td>
                    <td>
                        <input className="form-control" value={staff.address} onChange={(e) => setStaff({ ...staff, address: e.target.value })} />
                    </td>
                 
                  <td className="text-nowrap">
                    <BsFillCheckCircleFill onClick={updateStaff} className="me-2 text-success fs-1 text" />
                    <BsPlusCircleFill className="text-primary fs-1 text" onClick={createStaff} />
                  </td>
                </tr>
              </thead>
              <tbody>
                {staffs && staffs.map((staff, index) => (
                  <>
                    <tr key={staff._id}>
                      <td>
                        {staff.fullName}
                      </td>
                      <td>{staff.phoneNumber}</td>
                      <td>{staff.email}</td>
                      <td>
                        {staff.address}
                      </td>                     
                      <td className="text-nowrap">
                        <button className="btn btn-warning me-2">
                          <BsPencil onClick={() => selectStaff(staff._id)} />
                        </button>
                        <button className="me-2 btn btn-danger" onClick={() => deleteStaff(staff._id)}>
                          <BsTrash3Fill />
                        </button>
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

export default StaffList;