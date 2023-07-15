import React , {useContext , useEffect} from 'react';
import { useSelector } from "react-redux";
import AuthContext from 'context/AuthContext';
import Friend from './friendslistcardowner';


const Friendlist = () => {
      const friends = useSelector((state) => state.user.friends);
      const user = useSelector((state) => state.user);
      const length=user.friends.length;
      const { getFriends } = useContext(AuthContext);

      const getItem = async ()=>{        
        const x=await getFriends(user._id); 
    };

    useEffect(()=>{
        getItem();
    },[]
    );
      return (
        <div className='mt-0  mx-0 rounded-lg'>
          <div className="rounded-md px-1 py-2 md:py-3 md:px-3 bg-white border">
              <div className="font-bold flex rounded-t-md text-sm md:text-lg p-0 md:p-2 bg-gray-200 border border-gray-300"><div className='px-1'>Friend's List </div><div className='px-1'>({friends.length})</div> :</div>
              <div className='overflow-y-scroll'>
              {length?friends.map((friend,i) => (
                <Friend
                  key={i}
                  friend={friend}
                />
              )):<div className="text-sm w-full h-12 flex justify-center items-center bg-gray-200">No friends yet</div>
              }
              </div>
          </div>
        </div>
  )
}

export default Friendlist;