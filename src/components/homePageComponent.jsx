import React, { useEffect ,useContext, useState } from "react";
import Ownercard from "components/ownercard";
import Friendlist from "components/friendlist"
import Feeds from "components/feeds"
import Navbar from "components/navbar";
import AuthContext from "context/AuthContext.js";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPost from "components/addpost";

const HomePage = () => {
    const Navigate = useNavigate();
    const { getPosts } = useContext(AuthContext);
    const user = useSelector((state) => state.user);
    const mode = useSelector((state) => state.mode);
    const [loading,setLoading] = useState(true);
    
    
    const posts = useSelector((state) => state.posts);

    const getItem=async ()=>{        
        const x=await getPosts(); 
        if(x===200)setLoading(false);
    };

    useEffect(()=>{
        {
            getItem();
        }
      },[])
    return (
        <div className="h-full w-full">
            <Navbar/>
            {loading?
            <div
                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
            </div>:
            <div className={"h-fit w-full grid grid-cols-2 md:grid-cols-3 absolute top-20 md:top-0 "+(mode==='light'?"bg-white":"bg-gray-900")}>
                <div className="col-span-1 pt-16 md:pt-20 fixed left-0 md:left-12">
                    <div className="w-2/3 md:w-4/5 ml-4 ">
                        <Ownercard/>
                    </div> 
                </div>
                <div className="col-span-1 pt-12 md:pt-20 relative left-60 md:left-96">
                    <AddPost/>
                    {posts.map(
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
                <div className="col-span-0 md:col-span-1 fixed top-2/3 md:top-12 right-48 md:right-0  h-full ">
                    <Friendlist/>
                </div>
            </div>
            }
            
        </div>
);
}

export default HomePage;