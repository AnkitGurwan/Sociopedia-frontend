import React , { useContext ,useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import { useSelector } from "react-redux";
import Spinner from './spinner';

const Friendslistcard =  ( props ) => {
   
        const {friend} =props;
        const { addRemoveFriend, getFriends } = useContext(AuthContext);
        const mode = useSelector((state) => state.mode);
        const user = useSelector((state) => state.user);
        const [loading,setLoading] = useState(false);
        
        const [friendListSpinner,setFriendListSpinner] = useState(false);

        useEffect(()=>{
            {
                if(friend)setLoading(false);
            }
          },[])

        const friendhandler = async () => {
            setFriendListSpinner(true);
            const x=await addRemoveFriend(user._id,friend._id);
            if(x === 200)
            {
                setFriendListSpinner(false);
            }
        }

        return (
        
        <div className='flex py-1 md:py-3 px-1 md:px-3 items-center border' 
            >
            <div className='cursor-pointer'>
            {loading?
                    <div class="animate-pulse rounded-full bg-slate-200 h-10 w-10 my-auto">
                    </div>
                    :
                <img src={friend.picturePath} className='rounded-full object-cover h-8 md:h-10 w-8 md:w-10' alt='user' />}
            </div>
            
            <div className='w-20 md:w-44 pl-2 md:pl-4 pr-1'>
            {loading?
                    <div class="animate-pulse mb-2 px-2 w-3/4  my-auto">
                        <div class="h-2 bg-slate-200 rounded"></div>   
                    </div>
                    :
                <div className="font-bold text-[0.7rem] capitalize md:text-sm">{`${friend.firstName} ${friend.lastName}`}</div>}
            {loading?
                <div class="animate-pulse mb-2 px-2 w-3/4  my-auto">
                    <div class="h-2 bg-slate-200 rounded"></div>   
                </div>
                :
                <div className='text-muted text-gray-500 text-[0.7rem] md:text-sm'>{friend.occupation}</div>}
            </div>
            {friend._id != user._id
            ?
            friendListSpinner
            ?
            <div className='mt-1 ml-1 md:ml-3'>
                <Spinner/>
            </div>
            :
            <div className='mt-1 ml-1 md:ml-3' onClick={friendhandler}>
                <span class="material-symbols-outlined bg-green-400 text-white text-lg h-6 w-6 flex items-center justify-center rounded-full hover:bg-red-500 cursor-pointer">
                    done
                </span>
            </div>
            :
            <div className='text-sm flex ml-1 md:ml-3'>me</div>}
        </div>
  )
}

export default Friendslistcard;