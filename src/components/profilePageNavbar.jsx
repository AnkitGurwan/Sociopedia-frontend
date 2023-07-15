import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setMode } from 'state';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
      const user = useSelector((state) => state.user);
      const dispatch=useDispatch();
      const mode = useSelector((state) => state.mode);
      const Navigate = useNavigate();

      const logoutHandler = () => {
        localStorage.clear();
        Navigate('/');
        toast.success('Logged Out Successfully.', {
          position: toast.POSITION.TOP_CENTER
        });
      }
      return (
          <header class="bg-blue-900 py-4 md:py-3 px-4 md:px-6 fixed w-full z-10">
            <nav class="container mx-auto flex items-center justify-between">
              <a href="/home" class="text-white font-bold text-2xl md:text-3xl">Sociopedia</a>
              <ul class="flex items-center">
             
                <li><Link to={`/home`} class="text-white text-sm hover:text-gray-300 px-2 md:px-4">Home</Link></li>
                
                <li><Link to={`/mypost/${user._id}`} class="text-white text-sm hover:text-gray-300 px-2 md:px-4">My Posts</Link></li>
                <li><Link to={`/`} class="text-white text-sm md:text-md bg-red-600 py-1 rounded-md hover:bg-red-500 px-1 md:px-2 ml-2 md:ml-12" onClick={logoutHandler}>Log Out</Link></li>
                
              </ul>
            </nav>
        </header>

  )
}

export default Navbar