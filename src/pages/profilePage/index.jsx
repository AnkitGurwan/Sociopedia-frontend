import React, { useEffect ,useContext, useState } from "react";
import Ownercard from "components/friendOwnercard";
import Friendlist from "components/friendFriends"
import Feeds from "components/friendsFeed"
import Navbar from "components/navbar";
import AuthContext from "context/AuthContext.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPost from "components/addpost";

const HomePage = () => {
    const Navigate = useNavigate();
    const { getUserPosts , specificProjects } = useContext(AuthContext);
    const mode = useSelector((state) => state.mode);
   console.log(specificProjects)
    const params=useParams();
    const id=params.id;
    const getItem=async ()=>{        
        await getUserPosts(id); 
        await getUserPosts(id);
    };

    useEffect(()=>{
        getItem();
      },[])
    return (
        <div className="h-full">
            <Navbar/>
            <div className={"h-fit grid grid-cols-2 absolute top-12 "+(mode==='light'?"bg-white":"bg-gray-900")}>
                <div className="col-span-1 pt-8 fixed left-0">
                    <div className="mx-8">
                        <div className="w-4/5 ml-12 ">
                            <Ownercard/>
                        </div> 
                    </div>

                    <div className="h-1/2 mx-12 pl-12">
                        <Friendlist/>
                    </div>
                </div>
                <div className="col-span-1 mt-4 mr-40 relative left-full">
                    {specificProjects.map(
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
                </div>
                
            </div>
        </div>
);
}

export default HomePage;