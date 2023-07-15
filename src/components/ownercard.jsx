import React from 'react'
import { useSelector } from "react-redux";


const Ownercard = () => {
    const user = useSelector(state => state.user);

    return (
        <div className="rounded-lg mx-1 md:mx-0 px-1 md:px-4 pt-1 pb-2 bg-white">
            <div className='h-20 md:h-24 flex py-1 items-center px-2'>
                <div className=''>
                    <img src={user.picturePath} className='rounded-full object-cover h-9 md:h-16 w-9 md:w-16 mr-2' alt='user' />
                </div>
                <div className='w-24 md:w-48 pl-1 md:pl-4 pr-0 md:pr-1'>
                    <div className="font-semibold text-gray-700 text-xs md:text-lg capitalize">{`${user.firstName} ${user.lastName}`}</div>
                    <div className='text-muted text-gray-500 text-xs bg-gray-200 w-full md:w-3/5 px-0 md:px-2 pl-1 mt-1 rounded-sm' >Following : {user.friends?user.friends.length:0}</div>
                </div>
                <div>
                </div>
            </div>
            <hr/>
            <div className='h-20 py-1 md:py-4 px-0 md:px-2 flex flex-col'>
                <div className='flex items-center h-1/2'>
                    <div><span class="material-symbols-outlined text-lg px-1 text-gray-500">pin_drop</span></div>
                    <div className='text-xs md:text-sm text-gray-500 px-2 mt-1 md:mt-0 mb-1 capitalize'>{user.location}</div>
                </div>
                <div className='flex items-center h-1/2 my-0 md:my-1'>
                    <div><span class="material-symbols-outlined text-lg px-1 text-gray-500">work</span></div>
                    <div className='text-xs md:text-sm text-gray-500 px-2 mb-0 md:mb-1 capitalize'>{user.occupation}</div>
                </div>
            </div>
            <hr/>
            <div className='h-24 md:h-20 py-1 md:py-4 px-3'>
                <div className='flex items-center h-1/2 text-xs justify-between'>
                    <div className='text-gray-500 text-xs md:sm'>Who's viewed your profile.</div>
                    <div className='text-gray-600 text-xs md:sm'>{user.viewedProfile}</div>
                </div>
                <div className='flex items-center h-1/2 text-xs justify-between'>
                    <div className='text-gray-500 text-xs md:lg'>Impressions of your post</div>
                    <div className='text-gray-600 text-xs md:lg'>{user.impressions}</div>
                </div>
            </div>
        </div>
  )
}

export default Ownercard