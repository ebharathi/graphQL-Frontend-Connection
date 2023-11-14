import type { NextApiRequest,NextApiResponse } from "next";
import axios from 'axios'
export default async function login(req:NextApiRequest,res:NextApiResponse)
{
    let email=req.body.email
    let password=req.body.password
    let url=`http://localhost:5000/graphql`
    let query=`
      query login($email:String,$password:String){
        login(email:$email,password:$password)
        {
            token
        }
      }
    `
    let variables={
        email:email,
        password:password
    }
    const options={
        method:'post',
        url:url,
        data:{
            query:query,
            variables:variables
        }
    }
    // console.log("options-->",options);
    await axios(options)
    .then((response:any)=>{
      console.log("[=} response came")
         if(response?.data?.errors)
         {
          console.log("e->",response?.data?.errors[0]);
          res.json({
            error:true,
            message:response?.data?.errors[0]?.message
          })
         }
         if(response?.data?.data?.login)
           res.json({
             error:false,
             data:response?.data?.data?.login
          })
    })
}