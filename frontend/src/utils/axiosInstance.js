//axios:frontend se backend ko request bhejne ka tool
//better version of fetch

import axios from 'axios';
import { BASE_URL } from './apiPaths.js';

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout:80000,
    headers:{
        "Content-Type":"application/json"
    }
})


axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axiosInstance.interceptors.response.use(
    (response)=> response,
    (error)=>{
        console.log("API Error:",error.message);
       throw error; 
    }
)

export default axiosInstance;