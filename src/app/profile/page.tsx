"use client"
import React,{useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
type Props = {}

function Profile({}: Props) {

  const router = useRouter()
  const[data,setData] = useState<null>(null);

  const logout = async ()=> {
      try {
       await axios.get("/api/users/logout")
       toast.success("logout successfully");
        router.push("/login");
      } catch (error:any) {
        console.log(error.message)
        toast.error(error.message)
      }
  }

  const getUserDetails = async ()=> {
    const res = await axios.get("/api/users/me")
    console.log(res.data);
    setData(res.data.data);
    }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
    <div>Profile</div>
    <h2 className='p-1  bg-black text-white'>{data === null ? "Nothing" : 
          <Link href={`/profile/${data._id}`}>
            Username : {data.username}
            <br />
            Email : {data.email}
          </Link>
        }</h2> 
    <hr />
    <button onClick={logout} 
      className="text-white rounded bg-green-700 mt-2 p-1"
      >Logout</button>
    
    <button onClick={getUserDetails} 
      className="text-white rounded bg-purple-600 mt-2 p-1"
      >getUserDetails</button>
    </div>
  )
}

export default Profile
