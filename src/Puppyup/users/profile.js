import { useSelector } from "react-redux";
import UserDetails from "./details";
import { useParams } from "react-router-dom";
function Profile() {
    const { id } = useParams();
    const { currentUser } = useSelector((state) => state.userReducer);
    return(
        <div>
            {id ? <UserDetails id={id}/> : 
                (currentUser && currentUser._id) ? <UserDetails id={currentUser._id}/> : <h3 className="mx-2 my-2">Sorry, you do not have access to the info...</h3>}
        </div>
    )
}

export default Profile;