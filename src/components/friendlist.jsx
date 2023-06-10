import React , {useContext , useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import AuthContext from 'context/AuthContext';
import Friend from './friendslistcard';


const Friendlist = () => {
      const friends = useSelector((state) => state.user.friends);
      const user = useSelector((state) => state.user);
      const mode = useSelector((state) => state.mode);
      const length=user.friends.length;
      
      const { getFriends } = useContext(AuthContext);

      const getItem = async ()=>{        
        await getFriends(user._id); 
    };

    useEffect(()=>{
        getItem();
    },[]
    );
      return (
        <div className='mt-0 md:mt-8 mx-4 md:mx-10 rounded-lg'>
          <div className={"rounded-lg p-3 " + (mode==='light'?"bg-gray-100 border-4":"bg-gray-800")}>
              <div className={"font-bold  text-2xl md:text-lg p-2 "+(mode==='light'?"text-black":"text-gray-300")}>Friend's List :</div>
              <div className='p-2'>
              {length?friends.map((friend,i) => (
                <Friend
                  key={i}
                  friend={friend}
                />
              )):<div className={"text-sm w-full h-12 flex justify-center items-center rounded "+(mode==='light'?"bg-gray-200":"bg-gray-700 text-gray-300")}>No friends yet</div>
              }
              </div>
          </div>
        </div>
  )
}

export default Friendlist;