import Navbar from "@/components/Navabar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import axios from "axios";
import HttpsIcon from '@mui/icons-material/Https';
import { useState } from "react";
const Signup=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [btn,setBtn]=useState("LOGIN");
    const [error,setError]=useState("");
    const submitHandler=async(e:Event)=>{
        e.preventDefault();
        console.log("[=}submitted")
        setBtn("LOGGING...")
        if(email==""||password=="")
         {
             setBtn("LOGIN")
             setError("Please enter all credentials!!")
             setTimeout(() => {
                 setError("")
             }, 3000);

             return;
         }
         await axios.post("/api/login",{
            email:email,
            password:password
         })
         .then((response:any)=>{
            console.log("[+]response from next.js backend--->",response);
            if(response?.data?.error==true)
            {
                setError(response?.data?.message);
                setBtn("LOGIN");
                setTimeout(() => {
                    setError("");
                }, 3000);
                return;
            }
            if(response?.data?.error==false)
            {
                  console.log("LOGGED IN");
                  console.log("login response from backend--->",response?.data?.data);
                  localStorage.setItem('u_id',response?.data?.data?.token);
                  console.log("cookie set[+]")
                  window.location.pathname="/user";
            }
         })
    }
    return(
        <main>
            {/* <Navbar/> */}
            <div className="mt-20 flex justify-center items-center pt-72">
                <form className="text-center border-1 border-[#fff] shadow-2xl py-5 px-10 pb-10 rounded-xl" onSubmit={(e:any)=>submitHandler(e)}>
                    <h1 className="text-white font-semibold text-[23px]">SIGN IN</h1>
                    <br/>
                    <div className="border-1 border-[#fff] rounded-3xl">
                        <input className="w-custom-2 my-2 px-5 py-1  outline-none  bg-transparent text-white" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        <span className="text-white px-3"><MailIcon fontSize="large"/></span>
                    </div>
                    <br/>
                    <div className="border-1 border-[#fff] rounded-3xl">
                        <input className="w-custom-2 my-2 px-5 py-1  outline-none  bg-transparent text-white" type="passord" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        <span className="text-white px-3"><HttpsIcon fontSize="large"/></span>
                    </div>
                    <br/>
                    <div className="grid grid-cols-2 text-[12px] text-white px-4 py-1">
                      <div className="flex space-x-2">
                        <input type="checkbox" className="" id="remember"/>
                        <span>Remember me</span>
                      </div>
                      <div className="text-right">
                        <span>Forget Password?</span>
                      </div>
                    </div>
                    <div className="text-white text-[13px]">{error}</div>
                    <button className="mt-2 w-custom-2 text-black bg-white hover:text-white hover:bg-black px-5 py-2 rounded-3xl font-bold">{btn}</button>
                    <p className="text-[13px] text-white mt-2">Don't have an account? <a href="/signup" className="text-black underline">create account</a></p>
                </form>
            </div>
        </main>
    )
}
export default Signup;