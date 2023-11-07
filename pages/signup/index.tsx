import Navbar from "@/components/Navabar";

const Signup=()=>{
    return(
        <main>
            <Navbar/>
            <div className="mt-20 flex justify-center items-center">
                <form className="text-center">
                    <input className="my-2 px-3 py-1 outline-none border-2" type="text" placeholder="Username"/>
                    <br/>
                    <input className="my-2 px-3 py-1 outline-none border-2" type="email" placeholder="Email"/>
                    <br/>
                    <input className="my-2 px-3 py-1 outline-none border-2" type="password" placeholder="Password"/>
                    <br/>
                    <button className="mt-2 text-white bg-black px-2 py-1 rounded-md">SIGN UP</button>

                </form>
            </div>
        </main>
    )
}
export default Signup;