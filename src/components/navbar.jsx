import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setMode } from 'state';


const Navbar = () => {
      const user = useSelector((state) => state.user);
      const dispatch=useDispatch();
      const mode = useSelector((state) => state.mode);
      const Navigate = useNavigate();

      const logoutHandler = () => {
        localStorage.clear();
        Navigate('/');
      }
      return (
          <header class="bg-blue-900 py-6 md:py-3 px-6 md:px-4 fixed w-full z-10">
            <nav class="container mx-auto flex items-center justify-between">
              <a href="/home" class="text-white font-bold text-3xl">Sociopedia</a>
              <ul class="flex items-center">
              {mode==='light'?<li class="text-black text-lg mt-2 cursor-pointer px-4"><span class="material-symbols-outlined" onClick={()=>dispatch(setMode())}>lightbulb
              </span></li>:<li class="text-white text-lg mt-2 cursor-pointer px-4" onClick={()=>dispatch(setMode())}><span class="material-symbols-outlined">lightbulb
              </span></li>}
                <li><Link to={`/home`} class="text-white text-lg hover:text-gray-300 px-4">Home</Link></li>
                
                <li><Link to={`/profile/${user._id}`} class="text-white text-lg hover:text-gray-300 px-4">My Posts</Link></li>
                <li><Link to={`/`} class="text-white text-md bg-red-600 py-1 rounded-md hover:bg-red-500 px-2 ml-12" onClick={logoutHandler}>Log Out</Link></li>
                
              </ul>
            </nav>
        </header>

  )
}

export default Navbar