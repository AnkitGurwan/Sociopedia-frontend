import React , { useContext ,useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import { useSelector } from "react-redux";

const Friendslistcard =  ( props ) => {
   
        const {friend} =props;
        console.log("props",props)
        const navigate = useNavigate();
        const { addRemoveFriend, getFriends } = useContext(AuthContext);
        const mode = useSelector((state) => state.mode);
        const user = useSelector((state) => state.user);
        const [loading,setLoading] = useState(true);

        useEffect(()=>{
            {
                if(friend)setLoading(false);
            }
          },[])

        const friendhandler = async () => {
            await addRemoveFriend(user._id,friend._id);
            await getFriends(user._id); 
        }

        return (
        
        <div className='flex px-0 md:px-1' 
            >
            <div className='cursor-pointer' onClick={() => {
            navigate(`/profile/${friend._id}`);
          }}>
            {loading?
                    <div class="animate-pulse rounded-full bg-slate-200 h-10 w-10 my-auto">
                    </div>
                    :
                <img src={`https://sociopedia-backend-3olo.onrender.com/assets/${friend.picturePath}`} className='rounded-full object-cover h-8 md:h-12 w-8 md:w-12' alt='user' />}
            </div>
            <div className='w-20 md:w-48 pl-2 md:pl-4 pr-1 cursor-pointer' onClick={() => {
            navigate(`/profile/${friend._id}`);
          }}>
            {loading?
                    <div class="animate-pulse mb-2 px-2 w-3/4  my-auto">
                        <div class="h-2 bg-slate-200 rounded"></div>   
                    </div>
                    :
                <div className={"font-bold text-xs capitalize md:text-sm "+(mode==='light'?"text-gray-800":"text-gray-300")}>{`${friend.firstName} ${friend.lastName}`}</div>}
            {loading?
                <div class="animate-pulse mb-2 px-2 w-3/4  my-auto">
                    <div class="h-2 bg-slate-200 rounded"></div>   
                </div>
                :
                <div className='text-muted text-gray-500 text-xs'>{friend.occupation}</div>}
            </div>
            <div className='ml-1 md:ml-3' onClick={friendhandler}>
                <span class="material-symbols-outlined text-blue-600 text-sm md:text-sm bg-blue-300 h-6 md:h-7 w-6 md:w-7 flex items-center justify-center rounded-full hover:bg-blue-200 cursor-pointer">
                    group_add
                </span>
            </div>
        </div>
  )
}

export default Friendslistcard;