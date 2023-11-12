import Navbar from "@/components/Navabar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import HttpsIcon from '@mui/icons-material/Https';
import { useState } from "react";
import axios from "axios";
const Signup=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");
    const submitHandler=async(e:Event)=>{
        e.preventDefault()
        console.log("submitted[+]");
        if(name==""||email==""||password=="")
        {
            setError("Please enter all credentials!")
            setTimeout(() => {
                 setError("");
            }, 3000);
            return;
        }
        console.log("-->",name,"-->",email,"-->",password)
        await axios.post('/api/signup',{
            name:name,
            email:email,
            password:password
        }).then((resp:any)=>{
            console.log("--->resp from next.js backend---?",resp)
            if(resp?.data?.error==false)
             {
              setSuccess("New Account created. Redirecting to login...")
              setTimeout(() => {
                  window.location.pathname="/login";
              }, 3000);
             }
             if(resp?.data?.error==true)
             {
                setError("Failed to create an account.")
                setTimeout(() => {
                     setError("");
                }, 3000);
             }
        })
        
    }
    return(
        <main>
            {/* <Navbar/> */}
            <img src="../images/bg.jpg"/>
            <div className="mt-20 flex justify-center items-center pt-64">
                <form className="text-center border-1 border-[#fff] shadow-2xl py-5 px-10 pb-10 rounded-xl" onSubmit={(e:any)=>submitHandler(e)}>
                    <h1 className="text-white font-semibold text-[23px]">SIGN UP</h1>
                    <br/>
                    <div className="border-1 border-[#fff] rounded-3xl">
                        <input className="w-custom-2 my-2 px-5 py-1  outline-none  bg-transparent text-white" type="text" placeholder="Username" onChange={(e:any)=>setName(e.target.value)}/>
                        <span className="text-white px-3"><AccountCircleIcon fontSize="large"/></span>
                    </div>
                    <br/>
                    <div className="border-1 border-[#fff] rounded-3xl">
                        <input className="w-custom-2 my-2 px-5 py-1  outline-none  bg-transparent text-white" type="email" placeholder="Email" onChange={(e:any)=>setEmail(e.target.value)}/>
                        <span className="text-white px-3"><MailIcon fontSize="large"/></span>
                    </div>
                    <br/>
                    <div className="border-1 border-[#fff] rounded-3xl">
                        <input className="w-custom-2 my-2 px-5 py-1  outline-none  bg-transparent text-white" type="passord" placeholder="Password" onChange={(e:any)=>setPassword(e.target.value)}/>
                        <span className="text-white px-3"><HttpsIcon fontSize="large"/></span>
                    </div>
                    <br/>
                    <div className="text-white text-[13px]">{error}</div>
                    <div className="text-white text-[13px]">{success}</div>
                    <button className="mt-2 w-custom-2 text-black bg-white hover:text-white hover:bg-black px-5 py-2 rounded-3xl font-bold">CREATE ACCOUNT</button>
                    <p className="text-[13px] text-white mt-2">Already have an account? <a href="/login" className="text-black underline">Login</a></p>
                </form>
            </div>
        </main>
    )
}
export default Signup;