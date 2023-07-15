import React , { useContext, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/spinner';

const RegisterPage = () => {
    const { registerUser } = useContext(AuthContext);
    const Navigate = useNavigate();
    const [formValue, setFormValue] = useState();
    const [effect, setEffect] = useState(false);
    const [postUrl,setPostUrl] = useState("");
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        location:"",
        occupation:"",
        picturePath:"",
        email:"",
        password:""
    });
    
    const imageHandler = async (event) => {
        setFormValue(event.target.files[0]);
    }

        const formdata = new FormData();
        formdata.append('file',formValue);
        
    

    const onChangeHandler = async (event) => {
        setUser({...user,[event.target.name] : event.target.value});
    }

    const loginSubmitHandler = async (event) => {
        event.preventDefault();
        setEffect(true);
        
        const formdata = new FormData();
        formdata.append("file",formValue);
        formdata.append("upload_preset","ankitdemo");
        formdata.append("cloud_name","dyufvjigd");

        const x = await fetch(`https://api.cloudinary.com/v1_1/dyufvjigd/image/upload`, {
          method: 'POST',
          body: formdata,
        }).then((res)=>res.json()).then((data)=>
        {
            return registerUser(user.firstName,user.lastName,user.location,user.occupation,
                user.email,user.password,data.url);
        });

    
        if(x === 201){
          setEffect(false);
          toast.success('Registered Successfully', {
          position: toast.POSITION.TOP_CENTER
        });
          Navigate('/');
        }
        else if( x === 400 ){
          setEffect(false);
          toast.error('User email already exists.', {
          position: toast.POSITION.TOP_CENTER
        });
        }
        else {
            setEffect(false);
            toast.error('Could not register. Please try again later.', {
            position: toast.POSITION.TOP_CENTER
          });
        }
    }

  return (
    <div>
        <body class="bg-gray-100">
            <div class="flex justify-center items-center h-screen ">
              <div class="bg-white px-6 md:px-8 pt-4 md:pt-6 pb-3 md:pb-4 rounded-xl shadow-md w-4/5 md:w-1/2">
                <h1 class="text-sm md:text-lg font-semibold mb-4">Welcome to Sociopedia, let's Wow your online presence.</h1>
                <form onSubmit={loginSubmitHandler}>
                    <div className='grid grid-cols-2 gap-2 mb-5'>
                        <div class="">
                        <label class="block text-gray-500 text-sm font-bold mb-1" for="name">First Name</label>
                        <input class="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-sm capitalize" type="text" id="firstName" autoFocus required name='firstName' value={user.firstName} onChange={onChangeHandler} placeholder="First name"/>
                        </div>
                        <div >
                        <label class="block text-gray-500 text-sm font-bold mb-1" for="name">Last Name</label>
                        <input class="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-sm capitalize" type="text" id="lastName" required name='lastName' value={user.lastName} onChange={onChangeHandler} placeholder="Last name"/>
                        </div>
                    </div>
                    
                    <div class="mb-5">
                        <input id='location' class="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-sm capitalize" type="text" required name='location' value={user.location} onChange={onChangeHandler} placeholder="Location"/>
                    </div>

                    <div class="mb-5">
                        <input id='occupation' class="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-sm capitalize" type="text" required name='occupation' value={user.occupation} onChange={onChangeHandler} placeholder="Occupation"/>
                    </div>

                    <div class="mb-5">
                        <input id="picture" class="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-sm capitalize" type="file" required name='picture' onChange={imageHandler} placeholder="Upload Image Only"/>
                    </div>

                    <div class="mb-5">
                        <input id='email' class="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-sm" type="email" required name='email' value={user.email} onChange={onChangeHandler} placeholder="Email"/>
                    </div>

                    <div class="mb-6">
                        <input id='password' class="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-sm" type="password" required  name='password' value={user.password} onChange={onChangeHandler} placeholder="Password"/>
                    </div>

                    <div className='mb-2'>
                        <button class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 cursor-pointer" type="submit" value="Register">{effect?<div className="flex items-center justify-center "><Spinner/><span className="font-semibold text-lg mx-4" >Loading...</span></div>:<div className="font-semibold text-lg">Register</div>}</button>
                    </div>
                    <div className='pt-2 pl-1'>
                        <Link to={`/`} className='text-blue-700 no-underline hover:underline'>Already have an account?</Link>
                    </div>
                    
                </form>
                </div>
            </div>
            </body>
    </div>
  )
}

export default RegisterPage