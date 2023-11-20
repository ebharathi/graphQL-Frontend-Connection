import Navbar from "@/components/Navabar";
import axios from "axios";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
const FileIndex=()=>
{
    const [data,setData]=useState<any>();
    const [loader,setLoader]=useState(true);
    const [content,setContent]=useState("");
    const router=useRouter();
    const [btn,setBtn]=useState("SAVE CHANGES")
    useEffect(()=>{
        const getFileData=async()=>{
            let id=router?.query?.slug
            let url="https://graph-ql-xi.vercel.app/graphql";
            let query=`
              query file($id:ID)
              {
                file(id:$id)
                {
                    title
                    author
                    content
                }
              }
            `
            let variables={
                id:id
            }
            const options={
                method:'POST',
                url:url,
                data:{
                    query:query,
                    variables:variables
                }
            }
            await axios(options)
                .then((response:any)=>{
                      console.log("response for the file data-->",response?.data)
                      if(response?.data?.data?.file)
                      {
                        setData(response?.data?.data?.file);
                        setLoader(false);
                        if(response?.data?.data?.file?.content)
                        {
                            if(response?.data?.data?.file?.content!=null)
                               setContent(response?.data?.data?.file?.content)
                        }
                      }
                }) 
        }
        if(router?.query?.slug)
          getFileData()
    },[router?.query?.slug])
    const handleSubmit=async()=>{
        setBtn("SAVING...")
        console.log("[+]calling save changes")
        let query= `
          mutation updateFie($id:ID,$content:String)
          {
             updateFile(id:$id,content:$content)
             {
                title
                content
             }
          }
        `
        const variables={
            id:router?.query?.slug,
            content:content
        }
        const options={
            method:'POST',
            url:'https://graph-ql-xi.vercel.app/graphql',
            data:{
                query:query,
                variables:variables
            }
        }
        await axios(options)
        .then((response:any)=>{
              console.log("response for save changes---?",response?.data)
              if(response?.data?.data?.updateFile!=null)
              {
                  setBtn("SAVED")
                  setContent(response?.data?.data?.updateFile?.content)
                  setTimeout(() => {
                     setBtn("SAVE CHANGES")
                  }, 2000);
              }
        })
    }
    return (
        <div>
            <Navbar/>
            {
                loader?
                <div className="text-center mt-40">
                    PEASE WAIT WHIE LOADING...
                </div>    
                :
                <div className="bg-white px-5 py-2 my-10 mx-40 rounded-3xl">
                   <h1 className="text-center text-[30px]">
                    {data?.title}
                   </h1>
                   <br/>
                   <div className="py-10">
                    { 
                      content==""&&<span className="text-[12px]">Write your content here...</span>
                    }
                      <textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={20} className="outline-none border-2 px-2 py-3 border-[#a5a6a8] w-full">
                      </textarea>
                   </div>
                   <div className="text-center">
                      <button className="bg-blue-500 hover:bg-white hover:text-blue-500 text-white rounded-md px-5 py-2" onClick={handleSubmit}>{btn}</button>
                    </div>
                </div>    
            }
        </div>
    )
}
export default FileIndex;