import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", password: ""
  });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/Puppyup/Account");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className="w-50">
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input
        value={credentials.username}
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value
        })}
        placeholder="username"
        className="form-control mb-2"
      />
      <input
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value
        })}
        placeholder="password"
        className="form-control mb-2"
      />
      <button onClick={signup} className="btn btn-primary w-100">
        Signup
      </button>
    </div>
  );
}
export default Signup;
