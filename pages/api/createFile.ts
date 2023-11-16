import axios from "axios";
import type { NextApiRequest,NextApiResponse } from "next";

export default async function createFile(
    req:NextApiRequest,
    res:NextApiResponse
)
{
    try {
         let title:any=req.body.title;
         let author:any=req.body.author;
         console.log("-->",title,"-->",author)
         let query=`
           mutation createFile($title:String,$author:String)
           {
            createFile(title:$title,author:$author)
            {
                 _id
                 title
                 author
            }
           }
         `
         let variables={
            title:title,
            author:author
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
                          console.log("response from graphql backend-->",response?.data)
                          res.json({
                            error:false,
                            data:response?.data?.data
                          })
                     })
    } catch (error:any) {
         res.json({
            error:true,
            message:error?.message
         })
    }
}