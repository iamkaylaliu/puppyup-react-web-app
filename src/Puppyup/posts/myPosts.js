import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { findItemById } from "../Search/client";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import "./index.css";
function MyPosts() {
  const { currentUser } = useSelector((state) => state.userReducer);
  const user = currentUser;
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState({});
  const fetchMyComments = async () => {
    if (user) {
      const comments = await client.findPostsByUser(user._id);
      setComments(comments);
    }
  }

  const currentUserPosts = async () => {
    const newPost = {
      user: currentUser._id, 
      content: comment.content,
      photo: comment.photo,
  };
    const _comments = await client.createUserPosts(newPost);
    fetchMyComments();
  }

  const deleteUserPostsItem = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")){
    const status = await client.deleteUserPostsItem(postId);
    fetchMyComments();
    }
  }

  const UpdatePost = async () => {
    if (window.confirm("Are you sure you want to update this post?")){
      const newPost = await client.updatePost(comment._id,comment);
      fetchMyComments();
      }
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log("b", reader.result)
            setComment({ ...comment, photo: reader.result });
        };
        reader.readAsDataURL(file);
      }
  };

  const convertToStr = (data) => {
    return data.map((ch) => String.fromCharCode(ch)).join('');
  }
  
  useEffect(() => {
    fetchMyComments()
  }, []);

  useEffect(() => {
    const uniqueItemIds = new Set(comments.filter(comment => comment.itemId).map(comment => comment.itemId));

    uniqueItemIds.forEach(itemId => {
        if (!items[itemId] && !loading[itemId]) {
            setLoading(prev => ({ ...prev, [itemId]: true }));
            findItemById(itemId).then(fetchedItem => {
                setItems(prevItems => ({ ...prevItems, [itemId]: fetchedItem }));
                setLoading(prev => ({ ...prev, [itemId]: false }));
            }).catch(error => {
                console.error(`Error fetching item ${itemId}:`, error);
                setLoading(prev => ({ ...prev, [itemId]: false }));
            });
        }
    });
}, [comments]);


  return (
    <div className="w-75 mx-2 my-2">
      {!user && <h3>Sorry, you do not have access to the info...</h3>}
      {user && (
        <div>
          <h3 className="my-3">MyPuppyPosts</h3>
          <div className="row">
            <div className="col-1">
              <img src={user.headshot} className="wd-like-headshot me-2" alt="image"/>
            </div>
            <div className="col-11">
              <textarea
              value={comment && comment.content}
              className="form-control"
              placeholder="Your posts here..."
              onChange={(e)=>setComment({...comment,content: e.target.value})} />
            </div>  
          </div>
          
          <hr/>
          <input type="file" id="photoInput" name="photo" accept="image/*"
          onChange={handlePhotoChange}></input>
          <label for="photoInput" id="photoLabel">Choose a Photo</label>
          <button className="btn btn-primary my-1 float-end" onClick={currentUserPosts}>Submit</button>
          <button className="btn btn-primary my-1 float-end me-3" onClick={UpdatePost}>Update</button>
          <br/>
          <br/>
          <div className="w-100">
            <ul className="my-3 ms-0 list-group wd-comment-list">
              {comments && comments.map((comment) => (
                comment.user && (
              <li key={comment._id} className="list-group-item">
                  <div className="row">
                    <div className="col-1">
                      <img src={comment.user && comment.user.headshot} className="wd-like-headshot me-2" alt=""/>
                    </div>
                    <div className="col-11 wd-post">
                      {comment.user.firstName} 
                      <Link to={`/Puppyup/Profile/users/${comment.user._id}`} className="ps-1">
                         @{comment.user.username} 
                      </Link>
                      <span className="float-end me-4">{comment.time.toString().split('T')[0]}</span>
                      <div className="text-truncate me-4">
                      {loading[comment.itemId] ? (
                          "Loading item..."
                      ) : comment.itemId && items[comment.itemId] && (
                          <span>Commented on <Link to={`/Puppyup/MarketPlace/details/${comment.itemId}`}>
                              {items[comment.itemId].title}
                          </Link></span>
                      )}
                      </div>
                      <div>
                        {comment.photo && <img className="wd-post-photo my-3" src={comment.photo} alt=""/>}
                      </div>
                      <div className="mt-1">
                        <span>{comment.content}</span>
                      </div>
                      <div className="mt-3 ms-0">
                        <button className = "btn float-end mx-3" onClick={() => deleteUserPostsItem(comment._id)}><MdDeleteOutline/></button>
                        <button className = "btn float-end mx-3" onClick={() => setComment(comment)}><CiEdit/></button>
                      </div>
                    </div>
                  </div>
                  
                  
                </li>)
      ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
              }  
  


export default MyPosts;