import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useSelector } from "react-redux";
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userReducer);

  const signIn = async () => {
    try {
      const credentials = { username: username, password: password };
      const user = await client.signin(credentials);
      console.log("cccccd",user);

      dispatch(setCurrentUser(user));
      console.log("ccccc",currentUser);
      navigate("/Puppyup/Home");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className="w-50 mx-3 my-3">
      <h3>Sign In</h3>
      {error && <div className="alert alert-danger">{error.message}</div>}
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn} className="btn btn-primary w-100">
        Sign In
      </button>
    </div>
  );
}

export default SignIn;