"use client"
import Link from "next/link"
import React from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"
 type Props = {}
 
 function Signup({}: Props) {
   const router = useRouter();

    const [user,setUser] = React.useState({
        email : "",
        password: "",
        username:""
    })
    const [buttonDisable,setButtonDisable] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
   //  const onSignup = async ()=>{

   //  }

    const onSignup = async ()=>{
        try{
         setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("signup succes",response.data);
            router.push("/login");
        }catch(error:any){
            console.log("signup failed",error.message);
            toast.error(error.message);
        }finally{
          setLoading(false);
        }
    }

 useEffect(() => {
   if (user.email.length > 0 && user.password.length > 0 && user.username.length>0 ) { 
         setButtonDisable(false); 
      }
      else{
        setButtonDisable(true);
      }
 },[user]);

   return (
     <div className="flex flex-col justify-center items-center min-h-screen py-2">
        <h1 className="mb-2">{loading ? "Processing": "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:border-gray-900"
        id="username"
        type="text"
        value={user.username}
        onChange={(e)=>setUser({...user,username:e.target.value})}
        placeholder="username"
        />
      
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:border-gray-900"
        id="email"
        type="text"
        value={user.email}
        onChange={(e)=>setUser({...user,email:e.target.value})}
        placeholder="email"
        />
     
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:border-gray-900"
        id="password"
        type="password"
        value={user.password}
        onChange={(e)=>setUser({...user,password:e.target.value})}
        placeholder="password"
        />
     
     <button
     onClick={onSignup}
     className="p-2 border border-gray-700 rounded-lg mb-4 focus:outline-none focus:border-gray-900"
     >
        {buttonDisable ? "no signup" : "signup"}
     </button>
      <Link className="text-white bg-fuchsia-700 p-1" href="/login">Visit Login Page</Link>
     </div>
   )
 }
 
 export default Signup