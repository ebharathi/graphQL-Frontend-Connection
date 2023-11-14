import Link from "next/link";
import axios from 'axios';
import { useEffect, useState } from "react";
const Navbar=()=>{
    const [email,setEmail]=useState("");
    useEffect(()=>{
      const userDetails=async()=>{
            let token=localStorage.getItem('u_id');
            console.log("token-->",token);
            await axios.post('/api/user',{
                token:token
            })
            .then((resp:any)=>{
                console.log("response from next.js backend-  for fetching user details-->",resp);
                if(resp.data.error==false)
                {
                    setEmail(resp.data?.data?.email);
                    return;
                }
            })
      }
      if(email=="")
       userDetails();
    },[])
    return (
        <nav className="text-[#8f8786] text-right md:text-[16px] text-[11px]  py-3 px-1">
                    <p>{email}</p>
        </nav>
    )
}
export default Navbar;