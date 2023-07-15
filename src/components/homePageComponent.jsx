import React, { useEffect ,useContext, useState } from "react";
import Ownercard from "components/ownercard";
import Friendlist from "components/friendlistowner"
import Feeds from "components/feeds"
import Navbar from "components/homeNavbar";
import AuthContext from "context/AuthContext.js";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddPost from "components/addpost";
import Spinner from "./bigSpinner";
import Lottie from "./lottie";
import postAdd from './addpost';

const HomePage = () => {
    const { getPosts } = useContext(AuthContext);
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
      },[postAdd])

    return (
        <div className="h-full w-full">            
            <div className="h-full w-full grid grid-cols-3 absolute top-16 md:top-0">
            
                <div className="col-span-1 w-2/5 md:w-1/3 pt-7 md:pt-20 fixed py-4 md:pr-4 h-full bg-gray-200">
                {loading?
                        <div class="w-4/5 md:w-4/5 ml-4 md:ml-16 mr-16 py-2 pr-2 md:pr-6 border my-4 md:my-6 border-blue-100 shadow rounded-lg z-10 bg-gray-100">
                            <div class="animate-pulse flex space-x-4 rounded-lg px-4 pt-1 pb-2">
                            <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                            <div class="flex-1 space-y-6 py-2">
                                <div class="h-2 bg-slate-200 rounded"></div>
                                <div class="space-y-3">
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="h-2 bg-slate-200 rounded col-span-2 my-1"></div>
                                    <div class="h-2 bg-slate-200 rounded col-span-1 my-1"></div>
                                    <div class="h-2 bg-slate-200 rounded col-span-1 my-1"></div>
                                </div>
                                <div class="h-2 bg-slate-200 rounded"></div>
                                <div class="h-2 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                            </div>
                        </div>:
                    <div className="w-full md:w-4/5 ml-0 md:ml-16 pr-0 md:pr-8">
                        <Ownercard/>
                    </div> }
                </div>
            
                <div className="col-span-2 md:col-span-1 pt-0 md:pt-8 h-full bg-gray-100 absolute top-1 right-0 md:right-1/3 md:px-0 w-3/5 md:w-1/3 ">
                    
                    {loading?
                    <div class="w-full h-2/3 ml-2 mx-auto my-auto bg-gray-100 flex item-center justify-center">
                        <div
                            class="my-auto "
                            role="status">
                            <Spinner/>
                        </div>
                    </div>:
                    <div className="w-full relative h-fit border-x pt-6 md:pt-12 border-gray-300 bg-gray-100">
                        <AddPost/>
                        {posts.length===0?<div className="mt-1 mx-2"><Lottie/></div>:
                        posts.map(
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
                
                <div className="col-span-0 md:col-span-1 w-2/5 md:w-1/3 bg-gray-200 fixed top-2/3 md:top-12 right-3/5 md:right-0 h-full">
                {loading?<div class="mr-4 md:mr-8 border my-0 md:my-12 bg-gray-100 border-blue-100 shadow rounded-md p-2 max-w-sm w-4/5  mx-auto">
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
                <div className="mt-8 mx-0 md:mx-12 h-full">
                    <Friendlist/>
                </div>}
                </div>
        </div>
            
        </div>
);
}

export default HomePage;