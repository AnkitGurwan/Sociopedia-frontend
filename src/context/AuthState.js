import React , { useState } from "react";
import AuthContext from "./AuthContext";
import { useDispatch } from "react-redux";
import { setFriends, setLogin , setPosts } from "state";


const AuthState = (props) => {

    const url = "https://sociopedia-backend-3olo.onrender.com";
    const dispatch = useDispatch();
    const [specificProjects,setSpecificProjects]=useState([]);
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

    const registerUser = async ( formvalue) => {
        const response = await fetch(`${url}/auth/register`, {
            method: 'POST',
            
            body: formvalue,
        });
        
        const json = await response.json();
        return response.status;
    }

    const createPost = async ( formvalue) => {
        const response = await fetch(`${url}/posts`, {
            method: 'POST',
            // header:{
            //     'Authorization':localStorage.getItem('token')
            // },
            body: formvalue,
        });
        
        const json = await response.json();
        return response.status;
    }

    const getPosts = async (id,friendId) => {
        
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
        setSpecificProjects(json.reverse());
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
        
        const json = await response.json();
        
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
        console.log("111",json)
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
        const json = await response.json();
        
        return response.status;
    }

return (<AuthContext.Provider value={{ Login ,specificProjects,specificDetails, registerUser,getUserDetails,getUserPosts ,createPost ,getPosts ,addRemoveFriend , getFriends , likePost}}>
    {props.children}
</AuthContext.Provider>
)
}
export default AuthState;