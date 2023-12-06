import { useSelector } from "react-redux";

function Welcome() {
    const { currentUser } = useSelector((state) => state.userReducer);
    return(
        <div className="float-end my-4 mx-3">{currentUser && <span>Welcome {currentUser.firstName}!</span>}</div>
    )
}

export default Welcome;