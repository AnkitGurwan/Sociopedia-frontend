import React from 'react'
import { useSelector } from "react-redux";


const Ownercard = () => {
    const user = useSelector(state => state.user);
    const mode = useSelector((state) => state.mode);
    console.log(user.picturePath)

    return (
        <div className={"rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-4 pt-1 pb-2 "+(mode==='light'?"bg-gray-100 border-4":"bg-gray-800")}>
            <div className='h-24 flex py-1 items-center px-1'>
                <div className=''>
                    <img src={`http://localhost:5000/assets/${user.picturePath}`} className='rounded-full object-cover h-12 w-12 mr-2' alt='user' />
                </div>
                <div className='w-48 pl-4 pr-1'>
                    <div className={"font-bold text-lg capitalize "+(mode==='light'?"":"text-gray-300")}>{`${user.firstName} ${user.lastName}`}</div>
                    <div className='text-muted text-gray-500 text-sm md:text-xs'>{user.friends?user.friends.length:0} followers</div>
                </div>
                <div>
                </div>
            </div>
            <hr/>
            <div className='h-20 py-2 md:py-4 px-0 md:px-2 flex flex-col'>
                <div className='flex items-center h-1/2'>
                    <div><span class="material-symbols-outlined text-lg px-1 text-gray-500">pin_drop</span></div>
                    <div className='text-md md:text-sm text-gray-500 px-2 mb-1'>{user.location}</div>
                </div>
                <div className='flex items-center h-1/2 my-1'>
                    <div><span class="material-symbols-outlined text-lg px-1 text-gray-500">work</span></div>
                    <div className='text-md md:text-sm text-gray-500 px-2 mb-1'>{user.occupation}</div>
                </div>
            </div>
            <hr/>
            <div className='h-32 md:h-20 py-4 px-3'>
                <div className='flex items-center h-1/2 text-xs justify-between'>
                    <div className='text-gray-500 text-md md:sm'>Who's viewed your profile.</div>
                    <div className='text-gray-600 text-md md:sm'>{user.viewedProfile}</div>
                </div>
                <div className='flex items-center h-1/2 text-xs justify-between'>
                    <div className='text-gray-500 text-md md:lg'>Impressions of your post</div>
                    <div className='text-gray-600 text-md md:lg'>{user.impressions}</div>
                </div>
            </div>
        </div>
  )
}

export default Ownercard