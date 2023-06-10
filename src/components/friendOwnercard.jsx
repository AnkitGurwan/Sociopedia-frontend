import React , {useContext , useEffect} from 'react'
import AuthContext from "context/AuthContext.js";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";


const Ownercard = () => {
    const { specificDetails ,getUserDetails} = useContext(AuthContext);
    const params=useParams();
    const mode = useSelector((state) => state.mode);
    const id=params.id;
    console.log("soecuf",specificDetails)
    const getItem=async ()=>{        
        await getUserDetails(id); 
    };

    useEffect(()=>{
        getItem();
      },[])
    const user=specificDetails;
    console.log("user",user)

    return (
        <div className={" rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-4 py-2 "+(mode==='light'?"bg-gray-100 border-4":"bg-gray-800")}>
            <div className='h-24 flex py-2 items-center'>
                <div className=''>
                    <img src={`https://sociopedia-backend-3olo.onrender.com/assets/${user.picturePath}`} className='rounded-full object-cover h-12 w-12' alt='user' />
                </div>
                <div className='w-52 md:w-60 pl-4 pr-1'>
                    <div className={"font-bold text-md "+(mode==='light'?"":"text-gray-300")}>{`${user.firstName} ${user.lastName}`}</div>
                        <div className='text-muted text-gray-500 text-xs'>{user.friends?user.friends.length:0} followers</div>
                </div>
                <div>
                    <div><span class="material-symbols-outlined text-blue-500 cursor-pointer">
                        group_add
                        </span>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='h-20 p-4 flex flex-col'>
                <div className='flex items-center h-1/2'>
                    <div><span class="material-symbols-outlined text-sm px-1 text-gray-500">pin_drop</span></div>
                    <div className='text-sm text-gray-500 px-2 mb-1'>{user.location}</div>
                </div>
                <div className='flex items-center h-1/2 my-1'>
                    <div><span class="material-symbols-outlined text-sm px-1 text-gray-500">work</span></div>
                    <div className='text-sm text-gray-500 px-2 mb-1'>{user.occupation}</div>
                </div>
            </div>
            <hr/>
            <div className='h-24 py-6 px-3'>
                <div className='flex items-center h-1/2 text-xs justify-between'>
                    <div className='text-gray-500'>Who's viewed your profile.</div>
                    <div className='text-gray-600'>{user.viewedProfile}</div>
                </div>
                <div className='flex items-center h-1/2 text-xs justify-between'>
                    <div className='text-gray-500'>Impressions of your post</div>
                    <div className='text-gray-600'>{user.impressions}</div>
                </div>
            </div>
        </div>
  )
}

export default Ownercard