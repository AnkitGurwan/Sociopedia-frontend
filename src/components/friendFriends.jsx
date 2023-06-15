import React , {useContext , useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import AuthContext from 'context/AuthContext';
import Friend from './friendslistcard';
import { useParams } from 'react-router-dom';


const Friendlist = () => {
      const friends = useSelector((state) => state.user.friends);
      const user = useSelector((state) => state.user);
      const length=user.friends.length;
      const mode = useSelector((state) => state.mode);
      
      const params=useParams();
      const id=params.id;
      
      const { getFriends } = useContext(AuthContext);

      const getItem = async ()=>{        
        await getFriends(id); 
    };

    useEffect(()=>{
        getItem();
    },[]
    );
      return (
        <div className='mt-16 md:mt-6 mx-1 md:mx-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
          <div className={"rounded-md p-2 "+ (mode==='light'?"bg-gray-50 border":"bg-gray-800")}>
              <div className={"font-bold text-lg py-2 px-1 md:px-2 "+(mode==='light'?"text-black":"text-gray-300")}>Friend's List :</div>
              <div className='py-2 px-1 md:px-2'>
              {length?friends.map((friend,i) => (
                <Friend
                  key={i}
                  friend={friend}
                />
              )):<div className='text-sm w-full h-12 bg-gray-100 flex justify-center items-center rounded'>No friends yet</div>
              }
              </div>
          </div>
        </div>
  )
}

export default Friendlist;