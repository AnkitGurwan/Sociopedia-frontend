import React , { useState } from "react";
import AuthContext from "./AuthContext";
import { useDispatch } from "react-redux";
import { setFriends, setLogin , setPosts } from "state";


const AuthState = (props) => {

    const url = "https://sociopedia-backend-3olo.onrender.com";
    // const url = "http://localhost:5000";
    const dispatch = useDispatch();
    const [specificPosts,setSpecificPosts]=useState([]);
    const [specificDetails,setSpecificDetails]=useState([]);


    const Login = async ( email , password) => {
        const response = await fetch (`${url}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        });
        const json = await response.json();
        dispatch(setLogin(json));
        
        return response.status;
    }

    const registerUser = async ( firstName,lastName,location,occupation,
        email,password,picturePath) => {
        const response = await fetch(`${url}/auth/register`, {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({firstName,lastName,location,occupation,
                email,password,picturePath})
        });
        
        return response.status;
    }

    const createPost = async ( userId , description , picturePath) => {
        const response = await fetch(`${url}/posts`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userId,description,picturePath})
        });

        const json = await response.json();
        
        dispatch(setPosts(json.reverse()))
        return response.status;
    }

    const getPosts = async () => {
        
        const response = await fetch(`${url}/posts/all`, {
            method: 'GET',
            headers:{
                "Content-Type":"application/json"
            },
        });
        
        const json = await response.json();
        
        dispatch(setPosts(json.reverse()))
        return response.status;
    }

    const getUserPosts = async (id) => {
        
        const response = await fetch(`${url}/posts/${id}/posts`, {
            method: 'GET',
            headers:{
                "Content-Type":"application/json"
            },
        });
        
        const json = await response.json();
        setSpecificPosts(json.reverse());
        return response.status;
    }

    const getUserDetails = async (id) => {
        
        const response = await fetch(`${url}/users/${id}`, {
            method: 'GET',
            headers:{
                "Content-Type":"application/json"
            }
        });
        
        const json = await response.json();
        setSpecificDetails(json);
        return response.status;
    }

    const addRemoveFriend = async (id,friendId) => {
        
        const response = await fetch(`${url}/users/${id}/${friendId}`, {
            method: 'GET',
            headers:{
                "Content-Type":"application/json"
            },
        });
        
        
        return response.status;
    }

    const getFriends = async (id) => {
        
        const response = await fetch(`${url}/users/${id}/friends`, {
            method: 'GET',
            headers:{
                "Content-Type":"application/json"
            },
        });
        const json = await response.json();
        dispatch(setFriends(json));
        return response.status;
    }

    const likePost = async (id,userId) => {
        
        const response = await fetch(`${url}/posts/${id}/likepost`, {
            method: 'PATCH',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({userId})
        });
        
        return response.status;
    }

    const deletePost = async (id) => {
        
        const response = await fetch(`${url}/posts/${id}/delete`, {
            method: 'GET',
            headers:{
                "Content-Type":"application/json"
            }
        });
        return response.status;
    }

return (<AuthContext.Provider value={{ Login ,specificPosts,specificDetails , registerUser,getUserDetails,getUserPosts ,createPost ,getPosts ,addRemoveFriend , getFriends , likePost , deletePost}}>
    {props.children}
</AuthContext.Provider>
)
}
export default AuthState;