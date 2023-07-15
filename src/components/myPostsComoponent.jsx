import React , { useEffect ,useContext, useState } from "react";
import Feeds from "components/myPostsFeed";
import Navbar from "components/homeNavbar";
import AuthContext from "context/AuthContext.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "components/bigSpinner";
import Lottie from "./lottie";

const MyPostsPage = () => {
    const { getUserPosts , specificPosts } = useContext(AuthContext);
    const [loading,setLoading] = useState(true);
  
    const params=useParams();
    const id=params.id;

    const getItem=async ()=>{        
        const x = await getUserPosts(id); 
        if(x===200) setLoading(false);
    };

    useEffect(()=>{
        getItem();
      },[]);

    return (
        <div className="h-full w-full">
            <div className="h-full w-full absolute top-0">
                <div className="h-full w-full px-20 md:px-96 mx-auto absolute top-1 right-0">
                {loading?
                    <div class="w-full h-full items-center border-x border-gray-300 mx-auto my-auto bg-gray-100  flex item-center justify-center">
                        <div
                            class="my-auto "
                            role="status">
                            <Spinner/>
                        </div>
                    </div>:
                    <div className="border-x h-full border-gray-300 pt-16 pb-1 pl-1 md:pl-0 pr-1 md:pr-0">
                    {specificPosts.length === 0?<div className="mt-20"><Lottie/></div>:
                    specificPosts.map(
                    (post,i) => (
                    <Feeds
                        key={i}
                        postId={post._id}
                        postUserId={post.userId}
                        name={`${post.firstName} ${post.lastName}`}
                        description={post.description}
                        location={post.location}
                        picturePath={post.picturePath}
                        userPicturePath={post.userPicturePath}
                        likes={post.likes}
                        comments={post.comments}
                    />
                    )
                )}
                </div>}
                </div>
                
            </div>
        </div>
);
}

export default MyPostsPage;