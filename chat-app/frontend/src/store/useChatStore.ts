import {create} from 'zustand'


import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";



export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectUsers:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        
    },
    getMessages: async () => {
            
    }
}))
