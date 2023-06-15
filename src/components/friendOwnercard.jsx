import React , {useContext , useEffect,useState} from 'react'
import AuthContext from "context/AuthContext.js";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";


const Ownercard = () => {
    const { specificDetails ,getUserDetails} = useContext(AuthContext);
    const params=useParams();
    const mode = useSelector((state) => state.mode);
    const [loading,setLoading] = useState(true);
    const id=params.id;
    console.log("soecuf",specificDetails)
    const getItem=async ()=>{        
        const x=await getUserDetails(id); 
        if(x===200) setLoading(false);
    };

    useEffect(()=>{
        getItem();
      },[])
    const user=specificDetails;
    console.log("user",user)

    return (
        <div className={" rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-4 py-2 "+(mode==='light'?"bg-gray-100 border":"bg-gray-800")}>
            <div className='h-20 flex py-2 items-center w-full'>
                <div className=''>
                {loading?
                    <div class="animate-pulse rounded-full bg-slate-200 h-12 w-12 my-auto">
                    </div>
                    :
                    <img src={`https://sociopedia-backend-3olo.onrender.com/assets/${user.picturePath}`} className='rounded-full object-cover h-12 w-12' alt='user' />}
                </div>
                <div className='w-52 md:w-60 pl-4 pr-1'>
                {loading?
                    <div class="animate-pulse mb-2 px-2 w-3/4  my-auto">
                        <div class="h-2 bg-slate-200 rounded"></div>   
                    </div>
                    :
                    <div className={"font-bold text-md "+(mode==='light'?"":"text-gray-300")}>{`${user.firstName} ${user.lastName}`}
                    </div>}
                    {loading?
                    <div class="animate-pulse mb-2 px-2 w-3/4  my-auto">
                        <div class="h-2 bg-slate-200 rounded"></div>   
                    </div>
                    :
                        <div className='text-muted text-gray-500 text-xs'>{user.friends?user.friends.length:0} followers</div>}
                </div>
            </div>
            <hr/>
            <div className='h-20 py-4 px-2 flex flex-col'>
                <div className='flex items-center h-1/2'>
                    <div><span class="material-symbols-outlined text-sm px-1 text-gray-500">pin_drop</span></div>
                    {loading?
                    <div class="animate-pulse mb-2 px-2 w-3/4  my-auto">
                        <div class="h-2 bg-slate-200 rounded"></div>   
                    </div>
                    :
                    <div className='text-sm text-gray-500 px-2 mb-1'>{user.location}</div>}
                </div>
                <div className='flex items-center h-1/2 my-1'>
                    <div><span class="material-symbols-outlined text-sm px-1 text-gray-500">work</span></div>
                    {loading?
                    <div class="animate-pulse mb-2 px-2 w-3/4  my-auto">
                        <div class="h-2 bg-slate-200 rounded"></div>   
                    </div>
                    :
                    <div className='text-sm text-gray-500 px-2 mb-1'>{user.occupation}</div>}
                </div>
            </div>
            <hr/>
            <div className='h-24 py-6 px-3'>
                <div className='flex items-center h-1/2 text-xs justify-between'>
                    <div className='text-gray-500'>Who's viewed your profile.</div>
                    {loading?
                    <div class="animate-pulse mb-2 px-2 w-10  my-auto">
                        <div class="h-2 bg-slate-200 rounded"></div>   
                    </div>
                    :
                    <div className='text-gray-600'>{user.viewedProfile}</div>}
                </div>
                <div className='flex items-center h-1/2 text-xs justify-between'>
                    <div className='text-gray-500'>Impressions of your post</div>
                    {loading?
                    <div class="animate-pulse mb-2 px-2 w-10  my-auto">
                        <div class="h-2 bg-slate-200 rounded"></div>   
                    </div>
                    :
                    <div className='text-gray-600'>{user.impressions}</div>}
                </div>
            </div>
        </div>
  )
}

export default Ownercard