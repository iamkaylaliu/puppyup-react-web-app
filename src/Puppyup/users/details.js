import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as client from "./client";
import * as likesClient from "../likes/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findItemById } from "../Search/client";
import * as followsClient from "../follows/client";
function UserDetails({id}) {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [items, setItems] = useState([]);

  // const [currentUser, setCurrentUser] = useState(null); // [1
  const { currentUser } = useSelector((state) => state.userReducer);
  const fetchLikes = async () => {
    const likes = await likesClient.findItemsThatUserLikes(id);
    setLikes(likes);
  };
  const navigate = useNavigate();
  const fetchUser = async () => {
    const user = await client.findUserById(id);
    setUser(user);
  };
  const updateUser = async () => {
    const status = await client.updateUser(id, user);
  };
  const deleteUser = async (id) => {
    const status = await client.deleteUser(id);
    navigate("/Puppyup/Home");
  };
  const followUser = async () => {
    // const status = await followsClient.userFollowsUser(id);
    await followsClient.userFollowsUser(id);
    // Refetch followers after following
    fetchFollowers();
  };

  
  const unfollowUser = async () => {
    // const status = await followsClient.userUnfollowsUser(id);
    await followsClient.userUnfollowsUser(id);
    // Refetch followers after unfollowing
    fetchFollowers();
  };
  const fetchFollowers = async () => {
    const followers = await followsClient.findFollowersOfUser(id);
    setFollowers(followers);
  };
  const fetchFollowing = async () => {
    const following = await followsClient.findFollowedUsersByUser(id);
    setFollowing(following);
  };
  // const fetchCurrentUser = async () => {
  //   const user = await client.account();
  //   setCurrentUser(user);
  // };
  const alreadyFollowing = () => {
    return followers.some((follows) => {
      return follows.follower._id === currentUser._id;
    });
  };

  const fetchItems = async () => {
    const itemsPromises = likes.map(like => findItemById(like.itemId));
    const items = await Promise.all(itemsPromises);
    setItems(items);
}

  useEffect(() => {
    fetchUser();
    fetchLikes();
    fetchFollowers();
    fetchFollowing();
    // fetchCurrentUser();
  }, [id]);

  useEffect(() => {fetchItems();},[likes]);

  if (!id) {
    return <div/>
  }
  return (
    <div className="ms-2 me-3 my-2">

      {currentUser && currentUser._id !== id && (
        <>
          {alreadyFollowing() ? (
            <button onClick={unfollowUser} className="btn btn-danger float-end">
              Unfollow
            </button>
          ) : (
            <button onClick={followUser} className="btn btn-warning float-end">
              Follow
            </button>
          )}
        </>
      )}
      {user && (
        <div>
          <h3 className="my-3">User Details</h3>

          <div className="w-50">
            
            <div className="input-row">
              <label htmlFor="username" className="label">
                Username:
              </label>
              <input
                value={user.username}
                readOnly
                className="form-control mb-2"
              />
            </div>
            
            <div className="input-row">
                  <label htmlFor="gender" className="label">
                    Gender:
                  </label>
                  <input
                    value={user.gender}
                    readOnly
                    className="form-control mb-2" />
                </div>

                <div className="input-row">
                  <label htmlFor="breed" className="label">
                    Breed:
                  </label>
                  <input
                    value={user.breed}
                    readOnly
                    className="form-control mb-2" />
                </div>
                
            {currentUser && (currentUser._id == id || currentUser.role === "ADMIN") && (
              <><div className="input-row">
                <label htmlFor="firstname" className="label">
                  Name:
                </label>
                <input
                  value={user.firstName}
                  readOnly
                  className="form-control mb-2" />
              </div><div className="input-row">
                  <label htmlFor="dob" className="label">
                    Date of Birth:
                  </label>
                  <input
                    value={user.dob && user.dob.toString().split('T')[0]}
                    readOnly
                    className="form-control mb-2" />
                </div><div className="input-row">
                  <label htmlFor="email" className="label">
                    Email:
                  </label>
                  <input
                    value={user.email}
                    readOnly
                    className="form-control mb-2" />
                </div>
                <div className="input-row">
                  <label htmlFor="primaryVet" className="label">
                    Primary Vet:
                  </label>
                  <input
                    value={user.primaryVet}
                    readOnly
                    className="form-control mb-2" />
                </div>
                <div className="input-row">
                  <label htmlFor="Park" className="label">
                    Park:
                  </label>
                  <input
                    value={user.Park}
                    readOnly
                    className="form-control mb-2" />
                </div>
                <div className="input-row">
                  <label htmlFor="role" className="label">
                    Role:
                  </label>
                  <input
                    value={user.role}
                    readOnly
                    className="form-control mb-2"
                  />
                </div>
                </>
            )}
          </div>
          <div className="my-2 wd-75">
            <h3 className="mt-3 mb-2">Likes</h3>
            <ul className="wd-like-list wd-list-override ms-0">
              {items.map((item, index) => (
                <li key={index}>
                  <Link to={`/Puppyup/MarketPlace/details/${item.itemId}`}>
                    {item.title} 
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <h3 className="my-3">Followers</h3>
          <div className="row mx-2 my-2">
            <ul className="wd-like-list my-2">
              {followers.map((follows, index) => (
                <li key={index}>
                  <img src={follows.follower && follows.follower.headshot} className="wd-like-headshot" alt=""/>
                  <Link
                    key={index}
                    to={`/Puppyup/Profile/users/${follows.follower && follows.follower._id}`}
                  >
                    @{follows.follower && follows.follower.username}
                    {/* {follows.follower._id} */}
                  </Link>
                </li>    
              ))}
            </ul>  
          </div>
          <h3>Following</h3>
          <div className="row mx-2 mt-2 my-3">
            <ul className="wd-like-list my-2">
              {following.map((follows, index) => (
                <li key={index}>
                  <img src={follows.followed && follows.followed.headshot} className="wd-like-headshot" alt=""/>
                  <Link
                    key={index}
                    to={`/Puppyup/Profile/users/${follows.followed && follows.followed._id}`}
                  >
                    @{follows.followed && follows.followed.username}
                    {/* {follows.followed._id} */}
                  </Link>
                </li>
              ))}
            </ul>  
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetails;