import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode : "light",
    user : null,
    posts : [],
    token : null
}

export const authslice = createSlice ({
    name : "auth",
    initialState,
    reducers:{
        setMode : (state,action) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        setLogin : (state,action) => {
            console.log("i m here")
            state.user = action.payload.user;
            state.token =action.payload.token;
        },
        setLogout : (state,action) => {
            state.user = null;
            state.token = null
        },
        setFriends : (state,action) => {
            if(state.user)
            {
                state.user.friends = action.payload;
            }
            else
            {
                console.error("user friends doesn't exist.")
            }
        },
        setPosts : (state,action) => {
                return {
                    ...state,
                    posts: action.payload
                  }; 
        },
        setPost : (state,action) => {
            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const { setFriends , setLogin , setLogout , setMode , setPost , setPosts } = authslice.actions;
export default authslice.reducer;