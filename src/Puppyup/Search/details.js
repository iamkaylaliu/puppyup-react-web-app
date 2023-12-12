import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client";
import { useSelector } from "react-redux";
import * as likesClient from "../likes/client";
import * as postsClient from "../posts/client";
import { Link } from "react-router-dom";
import { AiOutlineLike, AiTwotoneLike  } from "react-icons/ai";

function Details() {
  const [item, setItem] = useState(null);
  const { currentUser } = useSelector((state) => state.userReducer);
  const { itemId } = useParams();
  const [like, setLike ] = useState();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();

  const fetchItem = async () => {
    const item = await client.findItemById(itemId);
    setItem(item);
  }; 

  const fetchLikes = async () => {
    const likes = await likesClient.findUsersThatLikeItem(itemId);
    setLikes(likes);
  };
  
  const fetchComments = async () => {
    const comments = await postsClient.findPostsByItem(itemId);
    setComments(comments);
  }

  const currentUserLikesItem = async () => {
    const _likes = await likesClient.createUserLikesItem(
      currentUser._id,
      itemId
    );
    fetchLikes();
  };

  const deleteUserLikesItem = async () => {
    const _likes = await likesClient.deleteUserLikesItem(
      currentUser._id,
      itemId
    );
    fetchLikes();
  };

  const currentUserPostsItem = async () => {
    const newPost = {
      user: currentUser._id, 
      itemId: itemId, 
      content: comment.content
  };
    const _comments = await postsClient.createUserPosts(newPost);
    fetchComments();
  }
  
  const fetchLike = async () => {
    if (currentUser) {
      const like = await likesClient.findLiked(
        currentUser._id,
        itemId
      );
      setLike(like);
    }
    
  }

  const likeOrDislike = async () => {
    if (!like) {
      await currentUserLikesItem();
    } else {
      await deleteUserLikesItem();
    }
    fetchLike();
  }
  useEffect(() => {
    fetchItem();
    fetchLikes();
    fetchComments();
    fetchLike();
  }, []);

  return (
    <div style={{maxWidth: '1300px'}}>
      {item && (
        <div>
          <div className="wd-detail px-2 py-2">
              
              <div>
                  <img className="img-fluid"
                  src={item.image.imageUrl}
                  alt=""
                  />
              </div>
              <div className="mx-5 my-2 flex-grow-1">
                  <h4 className="py-2">{item.title}</h4>
                  <div>{item.shortDescription}</div>
                  <br/>
                  <div>Price: $ {item.price.value}</div>
                  <br/>
                  <div>Condition: {item.condition}</div>
                  <br/>
                  <div>Brand: {item.brand}</div>
                  <br/>
                  <div>Shipping Cost: $ {item.shippingOptions[0].shippingCost.value}</div>
                  <br/>
                  <div>Shipping From: {item.itemLocation.city},{' '}{item.itemLocation.stateOrProvince}</div>
              </div>  
              <div>
              {currentUser && (
              <button
                onClick={likeOrDislike}
                className={`btn btn-primary float-end mx-2`}
              >
                {like? <AiTwotoneLike /> :<AiOutlineLike />}
              </button>
            )}
              </div>  
            </div>
            <div className="row mx-2 my-2">
              <h2>Likes</h2>
                <ul className="wd-like-list my-2">
                  {likes.map((like, index) => (
                    <li key={index}>
                      <img src={like.user.headshot} className="wd-like-headshot" alt=""/>
                      <Link to={`/Puppyup/Profile/users/${like.user._id}`}>
                        @{like.user.username}
                      </Link>
                    </li>
                  ))}
                </ul>
            </div>
            <div className="mx-3 my-2 w-75">
              <h2>Comments</h2>
              {currentUser &&
                <div>    
                  <textarea className = "my-3 form-control" 
                  placeholder="Your comments here..."
                  onChange={(e)=>setComment({...comment,content: e.target.value})} />
                  <hr/>
                  <button className="btn btn-primary my-1 float-end" onClick={currentUserPostsItem}>Submit</button>
                  <br/>
                  <br/>
                  <br/>
                </div> }
                <div className="w-100">
                  <ul className="my-3 ms-0 list-group wd-comment-list">
                    {comments && comments.map((comment) => (
                    comment.user && 

                      (<li key={comment.user._id} className="list-group-item">
                        <div className="row">
                          <div className="col-1">
                          <img src={comment.user && comment.user.headshot} className="wd-like-headshot me-2" alt="puppy"/>
                          </div>
                          <div className="col-11">
                          <div className="float-end me-4">{comment.time.toString().split('T')[0]}</div>
                              <Link to={`/Puppyup/Profile/users/${comment.user._id}`}>
                                {comment.user.username}
                              </Link>

                            
                            <br/>
                            <span className="my-3">{comment.content}</span>
                          </div>
                        </div>
                      </li>)
                    
                    ))}
                  </ul>
                </div>
            </div>      
        </div>  
        
      )}
    </div>
    
  );


}

export default Details;