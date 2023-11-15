import { FC } from "react";
import {useState} from 'react'
export interface FileProps{

}
const File:FC<FileProps>=()=>{
    const [isOpen,setIsOpen]=useState(false)
  return(
     <div>
         <div className="panel">
               <button className="bg-blue-500 px-4 py-2 rounded-lg text-white" onClick={()=>setIsOpen(true)}>ADD FILE</button>
         </div>
         <div className={`${isOpen?'block':'hidden'} model fixed top-0 right-0 left-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center`}>
              <div className="bg-white px-10 py-2 rounded-lg relative">
                     <h4 className="text-center">CREATING NEW FILE</h4>
                     <input className="border-1 border-[#5e5e5e] text-black input-placeholder rounded-md px-2 py-2 w-custom-2" type="text" placeholder="  File title"/>
                     <button className="bg-blue-500 px-3 py-2 text-white m-3 rounded-md">ADD</button>
                     <span className="text-[16px] absolute right-3 top-2 font-bold cursor-pointer" onClick={()=>setIsOpen(false)}>X</span>
              </div>
         </div>
     </div>
  )
}
export default File;