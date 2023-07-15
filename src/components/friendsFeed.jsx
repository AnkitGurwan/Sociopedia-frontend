import React , {useContext ,useEffect , useState} from 'react'
import AuthContext from 'context/AuthContext';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const Feeds = (
    {
        postId,
        postUserId,
        name,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
      }
) => {
    const { addRemoveFriend, getFriends ,likePost ,getUserPosts,getPosts} = useContext(AuthContext);
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const mode = useSelector((state) => state.mode);
    // const likeCount = Object.keys(likes).length;
    const [check,setCheck] = useState(true);
    const [liked,setLiked] = useState(false);
    const [likeCount,setLikeCount] = useState(Object.keys(likes).length);
    const params=useParams();
    const id=params.id;

    const Calculate = ()=>{
    if(postUserId===user._id)setCheck(false);
    }
    
    
    useEffect(()=>{
        Calculate();
        Calculate2();
    },[]);

    const Calculate2 = ()=>{
        const thisPost=posts.filter((post)=>post._id===postId)
        const x=Object.keys(thisPost[0].likes);
        if(x)x.map((id)=>{if(id===user._id)setLiked(true);})
    }

    const friendhandler = async () => {
        await addRemoveFriend(user._id,postUserId);
        await getFriends(user._id); 
    }
    const likeHandler = async () => {
        await likePost(postId,user._id);
        await getUserPosts(id); 
        await getPosts();
    }

  return (
    <div className='h-fit rounded-t-lg border border-gray-300 my-6'>
        <div className={"rounded-sm "+(mode==='light'?" ":"bg-gray-800")}>
            <div className='h-16 flex items-center px-6 rounded-t-lg bg-gray-100'>
                <div className=''>
                    <img src={userPicturePath} className='rounded-full object-cover h-10 w-10' alt='user' />
                </div>
                <div className='w-32 md:w-80 pl-2 md:pl-4 '>
                    <div className={"font-bold text-sm "+(mode==='light'?"text-black":"text-gray-300")}>{name}</div>
                    <div className='text-muted text-gray-500 text-xs capitalize'>{location}</div>
                </div>
            </div>
            <hr/>
            <div className='h-3/4 px-4 pt-2 bg-white'>
                <div className={"pt-1 px-1 capitalize pb-2 text-sm "+(mode==='light'?"text-black":"text-gray-400")}>{description}</div>
                <img src={picturePath} className='rounded-md object-cover max-h-72 w-full' alt='userimage' />
            </div>
            <div className='px-4 py-1 flex items-center bg-white'>

                 <div className='flex items-center w-12 pl-2 text-sm cursor-pointer' onClick={likeHandler}>{liked?<div className='flex items-center'><span onClick={()=>{setLiked(false);setLikeCount(likeCount-1);}} class="material-symbols-outlined p-1 text-lg text-red-700"><svg xmlns="http://www.w3.org/2000/svg" fill="red"  viewBox="0 0 24 24" stroke-width="1" stroke="red" class="w-6 h-6 border-none">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg></span><span className=' text-pink-600 fill-pink-600'>{likeCount}</span></div>
                :
                <div className='flex items-center'><span onClick={()=>{setLiked(true);setLikeCount(likeCount+1);;}} class={"material-symbols-outlined p-1 text-lg text-gray-300 "+ (mode==='light'?"text-gray-800":"text-gray-300")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"  class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg></span>
                <span className={"text-gray-300 "+ (mode==='light'?"text-gray-800":"text-gray-300")}>{likeCount}</span></div>}
                </div>
                <div className='flex items-center p-2 text-sm'><span class={"material-symbols-outlined p-1 text-lg "+(mode==='light'?"text-gray-800":"text-gray-300")}>chat_bubble</span><span  className={" "+ (mode==='light'?"text-gray-800":"text-gray-300")}>{comments.length}</span></div> 
            </div>
        </div>
    </div>
  )
}

export default Feeds;