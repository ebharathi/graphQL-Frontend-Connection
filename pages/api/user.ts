import type { NextApiRequest,NextApiResponse } from "next";
import axios from "axios";

export default async function user(
  req:NextApiRequest,
  res:NextApiResponse
) {
    console.log("[=}calling user api")
    console.log("token-->",req?.body?.token);
    let query=`
    query user($token:String)
    {
        user(token:$token)
        {
            name
            email
        }
    }
    `
    let variables={
        token:req.body.token
    }
    const options={
        method:'post',
        url:'https://graph-ql-xi.vercel.app/graphql',
        data:{
            query:query,
            variables:variables
        }
    }
    await axios(options)
    .then((response:any)=>{
        if(response?.data?.errors)
        {
               res.json({
                error:true,
               })
        }
        if(response?.data?.data?.user)
        {
            console.log("User Details Fetched[+]")
            res.json({
                error:false,
                data:response?.data?.data?.user
            })
        }
    })
}