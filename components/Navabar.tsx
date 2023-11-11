import Link from "next/link";
import axios from 'axios';
import { useEffect } from "react";
const Navbar=()=>{
    useEffect(()=>{
        const signup=async()=>{
            await axios.post('/api/signup')
        }
        const login=async()=>{
            await axios.post('/api/login')
        }
        // signup()
        // login();
    },[])
    return (
        <nav className="bg-[#4287f5] text-white px-2 py-3 px-1">
             <div className="flex">
                <h1 className="flex-1">GRAPHQL PROJECT</h1>
                <ul className="grid grid-cols-2 space-x-2 text-[14px]">
                    <li><Link href="/login">LOGIN</Link></li>
                    <li><Link href="/signup">SIGNUP</Link></li>
                </ul>
             </div>
        </nav>
    )
}
export default Navbar;