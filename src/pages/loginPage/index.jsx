import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "context/AuthContext.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "components/spinner";

const LoginPage = () => {
  const { Login, getPosts } = useContext(AuthContext);
  const Navigate = useNavigate();
  const [effect, setEffect] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const getItem = async () => {
    // await getPosts();
  };

  useEffect(() => {
    getItem();
  }, [])

  const onChangeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const clickHandler = () => {
    Navigate('/register');
  }

  const loginSubmitHandler = async (event) => {
    setEffect(true);
    event.preventDefault();
    const x = await Login(user.email, user.password)

    if (x === 200) {
      setEffect(false);
      toast.success('Login Success', {
        position: toast.POSITION.TOP_CENTER
      });
      Navigate('/home');
      setUser({ email: "", password: "" });
    } else {
      setEffect(false);
      toast.error('Invalid email or password', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  return (
    <div className="h-full">
      <body className="flex h-full flex-col md:flex-row">
        {/* leftside */}
        <div className="w-full md:w-2/3 h-3/4 md:h-full px-4">
          <div className="flex items-center">
            <div><img className="h-24 w-16 object-cover" src="https://cdn.dribbble.com/users/68544/screenshots/16126656/media/af29823fcdd74a3fd8b73415e886a23b.png" alt="Sociopedia" /></div>
            <div className="text-black font-medium text-2xl">Sociopedia</div>
          </div>

          <div className="pt-1 md:pt-12 px-4 md:px-12">
            <div className="border-b-2 text-2xl md:text-4xl text-black font-bold pl-6 md:pl-8 py-4">Login to Your Account</div>
            <form onSubmit={loginSubmitHandler} className="p-4 md:p-8">
              <div className="p-2 md:p-3">
                <input type="email" id="email" className="bg-gray-100 py-3 px-6 rounded-full text-gray-600 border-2 outline-blue-500 w-full md:w-2/3" autoFocus required placeholder="Email" name="email" value={user.email} onChange={onChangeHandler} />
              </div>
              <div className="p-2 md:p-3 mb-4 md:mb-0">
                <input type="password" id="password" className="bg-gray-100 py-3 px-6 rounded-full text-gray-600 w-full outline-blue-500 md:w-2/3" required placeholder="Password" name="password" value={user.password} onChange={onChangeHandler} />
              </div>
              <div className="mt-3 md:mt-5 ml-[25%] md:ml-36">
                <button className="bg-green-600 h-10 w-32 md:w-36 hover:bg-green-700 py-1 px-6 md:px-6 outline-none rounded text-white text-bold items-center mb-12 md:mb-0 " type="submit">
                  {effect ? (
                    <div className="flex items-center justify-center ">
                      <Spinner /><span className="ml-2 font-semibold text-lg" >Loading...</span>
                    </div>
                  ) : (
                    <div className="font-semibold text-lg">Sign In</div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Rightside */}
        <div className="w-full md:w-1/3 h-1/4 md:h-full my-0 bg-green-600 flex items-center justify-center">
          <div className="">
            <div className="text-2xl md:text-4xl text-white font-bold py-2">👋New Here?</div>
            <div className="text-lg md:text-xl text-white font-medium mb-5 md:mb-8 pl-4">Sign up and discover more!</div>
            <button id="signUp" className="w-24 h-10 font-medium bg-white rounded  ml-20 md:ml-4 text-black font-white hover:bg-gray-200" onClick={clickHandler}>Sign Up</button>
          </div>
        </div>
      </body>
    </div>
  )
};

export default LoginPage;
