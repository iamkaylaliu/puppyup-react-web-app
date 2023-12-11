import * as client from "./client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsTrash3Fill, BsPencil, BsPlusCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import * as usersClient from "../../users/client";
import { useParams } from "react-router-dom";
import Nav from "../Nav";
import React from "react";
function DoctorList() {
  const { vetId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({ doctorName: "", phoneNumber: "", servicesOffered: "", ratings: "" });
  const { currentUser } = useSelector((state) => state.userReducer);
  
  const fetchDoctors = async () => {
    const doctorsList = await client.findDoctorByVet(vetId);
    setDoctors(doctorsList);
    console.log("dl",doctors)
  };



  const createDoctor = async () => {
    try {
      const newDoctor = await client.createDoctor(doctor);
      setDoctors([newDoctor, ...doctors]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectDoctor = async (doctorId) => {
    try {
      const selectedDoctor = await client.findDoctorById(doctorId);
      setDoctor(selectedDoctor);
    } catch (err) {
      console.log(err);
    }
  };

  const updateDoctor = async () => {
    try {
      await client.updateDoctor(doctor._id, doctor);
      setDoctors(doctors.map((v) => (v._id === doctor._id ? doctor : v)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDoctor = async (doctorId) => {
    try {
      await client.deleteDoctor(doctorId);
      fetchDoctors();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
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
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Services Offered</th>
                  <th>Ratings</th>
                  {/* <th>Action</th> */}
                </tr>
                
                    <tr>
                    <td>
                        <input className="form-control" value={doctor.doctorName} onChange={(e) => setDoctor({ ...doctor, doctorName: e.target.value })} />
                    </td>
                    <td>
                        <input className="form-control" value={doctor.phoneNumber} onChange={(e) => setDoctor({ ...doctor, phoneNumber: e.target.value })} />
                    </td>
                    <td>
                        <input className="form-control" value={doctor.servicesOffered} onChange={(e) => setDoctor({ ...doctor, servicesOffered: e.target.value })} />
                    </td>
                    <td>
                        <input className="form-control" value={doctor.ratings} onChange={(e) => setDoctor({ ...doctor, ratings: e.target.value })} />
                    </td>
                 
                  <td className="text-nowrap">
                    <BsFillCheckCircleFill onClick={updateDoctor} className="me-2 text-success fs-1 text" />
                    <BsPlusCircleFill className="text-primary fs-1 text" onClick={createDoctor} />
                  </td>
                </tr>
                
              </thead>
              <tbody>
                {doctors && doctors.map((doctor) => (
                  < >
                    <tr key={doctor._id}>
                      <td>{doctor.doctorName}</td>
                      <td>{doctor.phoneNumber}</td>
                      <td>{doctor.servicesOffered}</td>
                      <td>{doctor.ratings}</td>
                      <td className="text-nowrap">
                        <button className="btn btn-warning me-2">
                          <BsPencil onClick={() => selectDoctor(doctor._id)} />
                        </button>
                        <button className="me-2 btn btn-danger" onClick={() => deleteDoctor(doctor._id)}>
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

export default DoctorList;