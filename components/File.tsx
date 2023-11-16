import axios from "axios";
import { FC, useEffect } from "react";
import {useState} from 'react'
import DescriptionIcon from '@mui/icons-material/Description';
export interface FileProps{

}
const File:FC<FileProps>=()=>{
    const [isOpen,setIsOpen]=useState(false);
    const [fileName,setFileName]=useState("");
    const [success,setSuccess]=useState(false);
    const [loader,setLoader]=useState(false);
    const [files,setFiles]=useState([]);
    const createFile=async()=>{
        setLoader(true);
        let token=localStorage.getItem('u_id');
        await axios.post('/api/createFile',{
            title:fileName,
            author:token
        }).then((response:any)=>{
             console.log("Response from next.js backend--->",response);
             if(response.data?.error==false)
             {
                setTimeout(() => {
                    setSuccess(true);
                    setLoader(false);
                }, 3000);
             }
        })
    }
    useEffect(()=>{
        if(isOpen==false)
        {
            setFileName("")
            setSuccess(false);
            setLoader(false);
        }
    },[isOpen])
    useEffect(()=>{
        const getFiles=async()=>{
            let token:any=localStorage.getItem('u_id');
            await axios.post('/api/getFiles',{
                token:token
            })
            .then((response:any)=>{
                 console.log("response for files from next.js backend--->",response?.data)
                 if(response?.data?.error==false)
                   setFiles(response?.data?.data)
            })
        }
        getFiles()
    },[success])
  return(
     <div className="file">
         <div className="panel">
               <button className="bg-blue-500 px-4 py-2 rounded-lg text-white" onClick={()=>setIsOpen(true)}>ADD FILE</button>
         </div>
         {
            success?
        <div className={`${isOpen?'block':'hidden'} model fixed top-0 right-0 left-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center`}>
           {
            loader?
            <div className="bg-white px-10 py-2 rounded-lg relative">
                <h1 className="text-center">Please wait while creating....</h1>
            </div>    
            :
           <div className="bg-white px-10 py-2 rounded-lg relative">
                <h1 className="text-center py-3">New File created successfully!</h1>
                <div className="text-center">
                <a className="bg-blue-500 px-4 py-2 rounded-md text-white">OPEN</a>
                </div>
                <span className="text-[16px] absolute right-3 top-2 font-bold cursor-pointer" onClick={()=>setIsOpen(false)}>X</span>
            </div>
           }
         </div>
            :
         <div className={`${isOpen?'block':'hidden'} model fixed top-0 right-0 left-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center`}>
             {
                loader?
              <div className="bg-white px-10 py-2 rounded-lg relative">
                <h1 className="text-center">Please wait while creating....</h1>
              </div>    
                :
              <div className="bg-white px-10 py-2 rounded-lg relative">
                     <h4 className="text-center">CREATING NEW FILE</h4>
                     <input className="border-1 border-[#5e5e5e] text-black input-placeholder rounded-md px-2 py-2 w-custom-2" onChange={(e)=>setFileName(e.target.value)} type="text" placeholder="  File title"/>
                     <button className="bg-blue-500 px-3 py-2 text-white m-3 rounded-md" onClick={()=>createFile()}>ADD</button>
                     <span className="text-[16px] absolute right-3 top-2 font-bold cursor-pointer" onClick={()=>setIsOpen(false)}>X</span>
              </div>
             }
         </div>
         }
         <div className=" mt-5  py-5 px-2 grid grid-cols-12">
                 {
                    files.map((f:any)=><div className="text-[#6d736f] flex flex-col">
                        <div className="text-center">
                          <DescriptionIcon className="cursor-pointer hover:text-white"  sx={{ fontSize: 120 }}/>
                        </div>
                        <div className="text-center">
                          <span className="">{f.title}</span>
                        </div>
                        </div>)
                 }
         </div>
     </div>
  )
}
export default File;