import Navbar from "@/components/Navabar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import HttpsIcon from '@mui/icons-material/Https';
const Signup=()=>{
    return(
        <main>
            {/* <Navbar/> */}
            <img src="../images/bg.jpg"/>
            <div className="mt-20 flex justify-center items-center pt-72">
                <form className="text-center border-1 border-[#fff] shadow-2xl py-5 px-10 pb-10 rounded-xl">
                    <h1 className="text-white font-semibold text-[23px]">SIGN IN</h1>
                    <br/>
                    <div className="border-1 border-[#fff] rounded-3xl">
                        <input className="w-custom-2 my-2 px-5 py-1  outline-none  bg-transparent focus:text-white" type="email" placeholder="Email"/>
                        <span className="text-white px-3"><MailIcon fontSize="large"/></span>
                    </div>
                    <br/>
                    <div className="border-1 border-[#fff] rounded-3xl">
                        <input className="w-custom-2 my-2 px-5 py-1  outline-none  bg-transparent focus:text-white" type="passord" placeholder="Password"/>
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
                    <button className="mt-2 w-custom-2 text-black bg-white hover:text-white hover:bg-black px-5 py-2 rounded-3xl font-bold">LOGIN</button>
                    <p className="text-[13px] text-white mt-2">Don't have an account? <a href="/signup" className="text-black underline">create account</a></p>
                </form>
            </div>
        </main>
    )
}
export default Signup;