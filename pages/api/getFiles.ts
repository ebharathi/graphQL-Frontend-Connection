import type { NextApiRequest,NextApiResponse } from "next";
import axios from "axios";
export default async function getFiles(
    req:NextApiRequest,
    res:NextApiResponse
)
{
    try {
         let token=req.body.token;
         let query=`
           query userFiles($token:String)
           {
             userFiles(token:$token)
             {
                 _id
                 title
             }
           }
         `
         let variables={
            token:token
         }
         const options={
            method:'POST',
            url:'http://localhost:5000/graphql',
            data:{
                query:query,
                variables:variables
            }
         }
         await axios(options)
               .then((response:any)=>{
                //   console.log("response from backend-->",response)
                  if(response?.data?.errors)
                    res.json({
                        error:true,
                        message:response?.data?.errors[0]?.message
                    })
                  if(response?.data?.data?.userFiles)
                  {
                    res.json({
                        error:false,
                        data:response?.data?.data?.userFiles
                    })
                  }
               })

    } catch (error) {
          res.json({
            error:false,
            message:"Failed to get fill details"
          })
    }
}