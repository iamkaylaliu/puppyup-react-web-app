import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Welcome() {
    const { currentUser } = useSelector((state) => state.userReducer);
    return(
        <>
            {currentUser? 
            (<div className="float-end my-4 mx-3">{currentUser && <span>Welcome {currentUser.firstName}!</span>}</div>
            ) :
            (<> 
                <Link to="signin" className="btn btn-primary float-end mx-3 my-3">Sign In</Link>
                <Link to="signup" className="btn btn-primary float-end mx-3 my-3">Sign Up</Link>
            </>)
        }</>
    )
}

export default Welcome;