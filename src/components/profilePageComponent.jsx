import React , { useEffect ,useContext, useState } from "react";
import Ownercard from "components/friendOwnercard";
import Friendlist from "components/friendFriends"
import Feeds from "components/friendsFeed"
import Navbar from "components/navbar";
import AuthContext from "context/AuthContext.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "components/bigSpinner";

const ProfilePage = () => {
    const { getUserPosts , specificProjects } = useContext(AuthContext);
    const mode = useSelector((state) => state.mode);
    const [loading,setLoading] = useState(true);
  
    const params=useParams();
    const id=params.id;

    const getItem=async ()=>{        
        const x = await getUserPosts(id); 
        if(x===200) setLoading(false);
    };

    useEffect(()=>{
        getItem();
      },[])
    return (
        <div className="h-full w-full">
            <Navbar/>
            
            <div className={"h-full w-full grid grid-cols-2 absolute top-0 "+(mode==='light'?"bg-gray-50":"bg-gray-900")}>
                <div className="col-span-1 w-1/2 pt-8 pl-12 fixed top-12 left-0 h-full bg-gray-200">
                    <div className="mx-20">
                    {/* {loading?
                        <div class="w-4/5 md:w-full ml-12 mr-16 py-2 pr-6 border my-12 border-blue-100 shadow rounded-lg z-10 bg-gray-100">
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
                        </div>: */}
                        <div className="w-4/5 ml-12 ">
                            <Ownercard/>
                        </div> 
                    </div>
                    
                    
                    <div className="h-1/2 mx-24 pl-4">
                        <Friendlist/>
                    </div>
                    
                </div>
                <div className="col-span-1 w-1/2 pr-52 absolute h-full top-1 bg-gray-50 right-0">
                {loading?
                    <div class="w-full h-full items-center border-x border-gray-300 mx-auto my-auto bg-gray-100  flex item-center justify-center">
                        <div
                            class="my-auto "
                            role="status">
                            <Spinner/>
                        </div>
                    </div>:
                    <div className="border-x border-gray-300 pt-16 pb-1">
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
                </div>}
                </div>
                
            </div>
        </div>
);
}

export default ProfilePage;