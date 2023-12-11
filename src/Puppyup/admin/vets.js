import * as client from "./client";
import { useEffect, useState } from "react";
import { Link,  } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsTrash3Fill, BsPencil, BsPlusCircleFill, BsFillCheckCircleFill} from "react-icons/bs";
import Nav from "./Nav";
import * as usersClient from "../users/client";
function VetList() {
  const [vets, setVets] = useState([]);
  const [users, setUsers] = useState([]);

  const [vet, setVet] = useState({ vetName: "", address: "", phoneNumber: "", servicesOffered: "", operatingHours: "", website: "", ratings: "" });

  const {currentUser} = useSelector((state) => state.userReducer);
  const fetchVets = async () => {
    const vets = await client.findAllVets();
    setVets(vets);
  };

  const fetchUsers = async () => {
    const fetchedUsers = await usersClient.findAllUsers(); 
    setUsers(fetchedUsers);
  };

  const createVet = async () => {
    try {
      const newVet = await client.createVet(vet);
      setVets([newVet, ...vets]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectVet = async (vetId) => {
    try {
      const u = await client.findVetById(vetId);
      console.log(vet.vetName)
      setVet(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateVet = async () => {
    try {
      const status = await client.updateVet(vet._id,vet);
      setVets(vets.map((v) => (v._id === vet._id ? vet : v)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteVet = async (vetId) => {
    try {
      await client.deleteVet(vetId);
      setVets(vets.filter((v) => v._id !== vet._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchVets();
  }, [vets]);

  useEffect(() => {
    fetchUsers();
  }, [vet]);

  return (
    <div className="mx-3 my-3" style={{maxWidth: "100%"}}>
      {(!currentUser || currentUser.role!== "ADMIN") && (
        <h3>Sorry, you do not have access to the info...</h3>
      )}  
      {currentUser && currentUser.role === "ADMIN" && (
        <>
          <Nav/>
          <div className="table-container table-responsive" style={{ maxWidth: '100%' }}>
          <table className="table" >
            <thead className="thead-light">
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Services Offered</th>
                <th>Operating Hours</th>
                <th>Website</th>
                <th>Ratings</th>
            </tr>
            <tr>
            <td>
              <input className="form-control" value={vet.vetName} onChange={(e) => setVet({ ...vet, vetName: e.target.value })}/>
            </td>
            <td>
            <input className="form-control" value={vet.address} onChange={(e) => setVet({ ...vet, address: e.target.value })}/>
            </td>
            <td>
            <input className="form-control" value={vet.phoneNumber} onChange={(e) => setVet({ ...vet, phoneNumber: e.target.value })}/>
            </td>
            <td>
            <input className="form-control" value={vet.servicesOffered} onChange={(e) => setVet({ ...vet, servicesOffered: e.target.value })}/>
            </td>
            <td>
            <input className="form-control" value={vet.operatingHours} onChange={(e) => setVet({ ...vet, operatingHours: e.target.value })}/>
            </td>
            <td>
            <input className="form-control" value={vet.website} onChange={(e) => setVet({ ...vet, website: e.target.value })}/>
            </td>
            <td>
            <input className="form-control" value={vet.ratings} onChange={(e) => setVet({ ...vet, ratings: e.target.value })}/>
            </td>
           

            <td  className="text-nowrap">
            <BsFillCheckCircleFill onClick={updateVet}
                className="me-2 text-success fs-1 text" />

              <BsPlusCircleFill className="text-primary fs-1 text" onClick={createVet}/>
            </td>
          </tr>
            </thead>
            <tbody>
            {vets.map((vet,index) => (
                <>
                <tr key={vet._id}>
                <td>
                  <Link to={`/PuppyUp/Admin/vets/${vet._id}`}>{vet.vetName}</Link>
                </td>
                <td>
                    {vet.address}
                </td>
                <td>{vet.phoneNumber}</td>
                <td>{vet.servicesOffered}</td>
                <td>{vet.operatingHours}</td>
                <td>{vet.website}</td>
                <td>{vet.ratings}</td>
                <td className="text-nowrap">
                <button className="btn btn-warning me-2">
                    <BsPencil onClick={() => selectVet(vet._id)} />
                </button>
                    <button className="me-2 btn btn-danger" onClick={() => deleteVet(vet._id)}>
                    <BsTrash3Fill/>
                    </button>
                </td>
                
                </tr>
                <tr key={index}>
                    <td colSpan="8">
                        {users && "Serving:"} 
                        {users.filter(user => user.primaryVet).filter(filteredUser => filteredUser.primaryVet === vet._id).map(filteredUser => (
                        <div className="wd-user-link">
                            <Link to={`/Puppyup/Profile/users/${filteredUser._id}`}key={filteredUser._id}>{filteredUser.username}</Link> 
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

export default VetList;