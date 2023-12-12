import * as client from "./client";
import * as followsClient from "../follows/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { findItemById } from "../Search/client";

function Home () {
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState({});
    const [items, setItems] = useState({});
    const {currentUser} = useSelector((state) => state.userReducer);
    const [comments, setComments] = useState([]);
    const user = currentUser;
    const fetchFollowing = async () => {
        const following = await followsClient.findFollowedUsersByUser(user._id);
        setFollowing(following);
    };

    const fetchPostsbyFollowed = async () => {
        try{
            console.log(following)
            const postsPromises = following.map(following => client.findPostsByUser(following.followed._id));
            const postsArrays = await Promise.all(postsPromises);
            const validPostsArrays = postsArrays.filter(posts => posts !== null); // Filter out null values
            const aggregatedPosts = validPostsArrays.flat();
            console.log(aggregatedPosts);

            setComments(aggregatedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }


    const generateRandomPosts = async () => {
        if (!currentUser) {
            const comments = await client.generateRandomPosts();
            console.log("a", comments)
            setComments(comments);
        }
    }

    
    useEffect(() => {
        if (currentUser) {
            fetchFollowing();
        }    
      }, []);
    
      useEffect(() => {
        if (currentUser) {
            fetchPostsbyFollowed();
        }    
      }, [following]);  

      useEffect(() => {
        if (!currentUser) {
            generateRandomPosts();
        }
      },[currentUser]);
      
    
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
                <div>
                    {currentUser? <h3 className="my-3">MyFollowings!</h3> : <h3 className="my-3">MyHome!</h3>}
                    <div className="w-100">
                    <ul className="my-3 ms-0 list-group wd-comment-list">
                    {comments && comments.map((comment) => (  
                        comment.user &&  
                        (<li key={comment._id} className="list-group-item">
                        <div className="row">
                            <div className="col-1 d-none d-md-block">
                            {comment.user &&<img src={comment.user.headshot} className="wd-like-headshot me-2" alt=""/>}
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
                                {console.log(comment.photo, comment.content)}
                            </div>
                            <div className="mt-1">
                                <span>{comment.content}</span>
                            </div>
                            </div>
                            </div>
                            
                            
                            </li>)
                                
                                 
                        ))}
                        </ul>
                        </div>
                </div>
             
        </div>            
    )
}

export default Home;