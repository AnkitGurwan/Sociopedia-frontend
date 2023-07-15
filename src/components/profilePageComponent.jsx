import React , { useEffect ,useContext, useState } from "react";
import Ownercard from "components/friendOwnercard";
import Friendlist from "components/friendlistother"
import Feeds from "components/friendsFeed"
import Navbar from "components/homeNavbar";
import AuthContext from "context/AuthContext.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "components/bigSpinner";
import Lottie from "./lottie";

const ProfilePage = () => {
    const { getUserPosts , specificPosts } = useContext(AuthContext);
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
            <div className={"h-full w-full grid grid-cols-2 absolute top-0 "+(mode==='light'?"bg-gray-50":"bg-gray-900")}>
                <div className="col-span-1 w-1/2 pt-8 pl-2 md:pl-12 fixed top-12 left-0 h-full bg-gray-200">
                    <div className="mx-2 md:mx-20">
                        <div className="w-full md:w-4/5 ml-0 md:ml-12 mt-6 md:mt-0">
                            <Ownercard/>
                        </div> 
                    </div>
                    
                    
                    <div className="h-1/2 mx-1 md:mx-24 pl-0 md:pl-4">
                        <Friendlist/>
                    </div>
                    
                </div>
                <div className="col-span-1 w-1/2 pr-1 md:pr-52 absolute h-full top-1 bg-gray-50 right-0">
                {loading?
                    <div class="w-full h-full items-center border-x border-gray-300 mx-auto my-auto bg-gray-100  flex item-center justify-center">
                        <div
                            class="my-auto "
                            role="status">
                            <Spinner/>
                        </div>
                    </div>:
                    <div className="border-x border-gray-300 pt-16 pb-1 pl-1 md:pl-0 pr-1 md:pr-0">
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

export default ProfilePage;