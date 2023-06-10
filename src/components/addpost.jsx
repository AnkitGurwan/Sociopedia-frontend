import React , { useState , useContext , useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPost = () => {
      const { createPost , getPosts } = useContext(AuthContext);
      const mode = useSelector((state) => state.mode);
      const user = useSelector(state => state.user);
      const [formValue, setFormValue] = useState();
      const [postAdded,setPostAdded] = useState(false);
      const [showImage, setShowImage] = useState(false);
      const [post, setPost] = useState({
        description: "",
        picturePath: "",
      });

      const getItem=async ()=>{        
        await getPosts(); 
    };

    useEffect(()=>{
        getItem();
    },[postAdded])
          

      const onChangeHandler = async (event) => {
        setPost({...post,[event.target.name] : event.target.value});
    }

      const imageHandler = async (event) => {
        setFormValue(event.target.files[0]);
        post.picturePath=event.target.files[0].name;
      }

      const formdata = new FormData();
      formdata.append('description',post.description);
      formdata.append('picturePath',post.picturePath);
      formdata.append('userId',user._id);
      formdata.append('picture',formValue);

      const submitHandler = async (event) => {
        event.preventDefault();
        const x = await createPost(formdata)
    
        if(x === 201){
          toast.success('Post Added', {
          position: toast.POSITION.TOP_CENTER
        });
        post.description="";
        setFormValue(null);
        setPostAdded(true);
        setShowImage(false);
        }
        
        else {
            toast.error('Could not Post. Please try again later.', {
            position: toast.POSITION.TOP_CENTER
          });
        }
    }

      return (
        <div className='pb-3 mr-2 md:mr-0'>
          <form onSubmit={submitHandler} className={"rounded-lg "+(mode==='light'?"bg-gray-100 border-4":"bg-gray-800")}>
              <div className='flex p-1 md:p-4'>
                <img src={`https://sociopedia-backend-3olo.onrender.com/assets/${user.picturePath}`} className='h-10 md:h-12 w-10 md:w-12 rounded-full mr-2 object-cover' alt='' />
                <input type='text' className={"mx-1 w-full rounded-full my-auto h-9 text-xs pl-2 md:pl-4 text-start focus:outline-none "+ (mode==='light'?"bg-gray-200":"bg-gray-700")} name='description' id='description' required value={post.description} onChange={onChangeHandler} placeholder='What is in your mind ...'/>
              </div>
              {mode==='light'?<hr/>:""}
              {showImage?<div className={"w-full py-2 px-0 md:px-4 "+ (mode==='light'?"bg-white":"bg-gray-700")}>
                <input className={"w-full "+(mode==='light'?"text-black bg-white":"text-gray-400 bg-gray-700")} type='file' id='picture' name='picture' required onChange={imageHandler}/>
              </div>:""}
              <div className='py-3 px-1 md:px-8 flex justify-between items-center'>
                    <div className={"text-xs md:text-sm p-1 rounded-md flex items-center cursor-pointer "+(mode==='light'?"text-black hover:bg-gray-200":"text-gray-400 hover:-bg-gray-700")} onClick={()=>{showImage?setShowImage(false):setShowImage(true)}}><span class="material-symbols-outlined px-1 text-xs lg:text-lg ">image</span>
                        <span>Image</span>
                    </div>            
                    {showImage?<button type='submit' className='bg-blue-400 hover:bg-blue-500 text-gray-700  px-2 md:px-3 py-1 rounded-full text-xs lg:text-sm'>Post</button>:
                    ""}
              </div>
          </form>
        </div>
  )
}

export default AddPost;