import React , {useContext ,useEffect , useState} from 'react'
import AuthContext from 'context/AuthContext';
import { useSelector } from "react-redux";

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
    const { addRemoveFriend, getFriends ,likePost ,getPosts} = useContext(AuthContext);
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const mode = useSelector((state) => state.mode);
    const likeCount = Object.keys(likes).length;
    const [check,setCheck] = useState(true);
    const [liked,setLiked] = useState(false);

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
        await getPosts();
    }

  return (
    <div className='h-fit rounded-lg my-6 mx-1'>
        <div className={"rounded-lg "+(mode==='light'?"bg-gray-100 border-4":"bg-gray-800")}>
            <div className='h-20 flex items-center px-5'>
                <div className=''>
                    <img src={`http://localhost:5000/assets/${userPicturePath}`} className='rounded-full object-cover h-10 w-10' alt='user' />
                </div>
                <div className='w-72 pl-4 pr-1'>
                    <div className={"font-bold text-sm capitalize "+(mode==='light'?"text-black":"text-gray-300")}>{name}</div>
                    <div className='text-muted text-gray-700 md:text-gray-500 text-xs'>{location}</div>
                </div>
                <div className='ml-3' onClick={friendhandler}>
                    {check?
                    <span class="material-symbols-outlined text-blue-600 text-xl h-7 w-7 flex items-center justify-center rounded-full hover:bg-blue-200 cursor-pointer">
                        group_add
                    </span>:""
                 }
                </div>
            </div>
            <hr/>
            <div className='h-3/4 px-4'>
                <div className={"py-2 px-1 text-sm capitalize "+(mode==='light'?"text-black":"text-gray-400")}>{description}</div>
                <img src={`http://localhost:5000/assets/${picturePath}`} className='rounded-lg object-cover' alt='userimage' />
            </div>
            <div className='px-4 py-2 flex items-center'>
                <div className='flex items-center p-2 text-sm cursor-pointer ' onClick={likeHandler}>{liked?<div className='flex items-center'><span onClick={()=>setLiked(false)} class="material-symbols-outlined p-1 text-lg text-pink-600 ">favorite</span><span className=' text-pink-600'>{likeCount}</span></div>
                :<div className='flex items-center'><span onClick={()=>setLiked(true)} class={"material-symbols-outlined p-1 text-lg text-gray-300 "+ (mode==='light'?"text-gray-800":"text-gray-300")}>favorite</span>
                <span className={"text-gray-300 "+ (mode==='light'?"text-gray-800":"text-gray-300")}>{likeCount}</span></div>}
                </div>
                <div className='flex items-center p-2 text-sm'><span class={"material-symbols-outlined p-1 text-lg text-gray-300 "+ (mode==='light'?"text-gray-800":"text-gray-300")}>chat_bubble</span><span className={" "+ (mode==='light'?"text-gray-800":"text-gray-300")}>{comments.length}</span></div>
            </div>
        </div>
    </div>
  )
}

export default Feeds;