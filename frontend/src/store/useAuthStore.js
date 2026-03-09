import {create} from "zustand";

export const useAuthStore=create((set)=>({
    authUser:{name:"Kiran",_id:123,age:21},
    isLoggedIn:false,
    isLoading:false,

    login:()=>{
        console.log("We Just logged in");
        set({isLoggedIn:true,isLoading:true});   // thz is how setter works
    },

}))