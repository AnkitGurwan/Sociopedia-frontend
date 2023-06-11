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
            
            <div className={"h-fit w-full grid grid-cols-3 absolute top-20 md:top-0 "+(mode==='light'?"bg-white":"bg-gray-900")}>
            
            <div class="w-full flex item-center justify-center h-96">
            {loading?
            <div class="border my-12 border-blue-100 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
                </div>
            </div>:
                <div className="col-span-1 pt-16 md:pt-20 fixed left-0 md:left-12">
                    <div className="w-2/3 md:w-4/5 ml-4 ">
                        <Ownercard/>
                    </div> 
                </div>}
            {loading?
            <div class="w-full flex item-center justify-center h-96">
                <div
                class="my-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
            </div>
            </div>:
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
                </div>}
                {loading?<div class="border my-12 border-blue-100 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                    <div class="animate-pulse flex space-x-4">
                        <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div class="flex-1 space-y-6 py-1">
                        <div class="h-2 bg-slate-200 rounded"></div>
                        <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                            </div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                            <div class="h-2 bg-slate-200 rounded"></div>
                        </div>
                        </div>
                    </div>
                </div>:
                <div className="col-span-0 md:col-span-1 fixed top-2/3 md:top-12 right-48 md:right-0  h-full ">
                    <Friendlist/>
                </div>}
            </div>
        </div>
            
        </div>
);
}

export default HomePage;