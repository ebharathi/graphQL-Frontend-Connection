import axios from "axios";
import type { NextApiRequest,NextApiResponse } from "next";

export default async function signup(req:NextApiRequest,res:NextApiResponse)
{
    const name = req.body.name;
    const email = req.body.email;
    const password =req.body.password;
    console.log("-->",name,"-->",email,"--->",password)
    let url="http://localhost:5000/graphql";
    let query=`
      mutation createUser($name:String,$email:String,$password:String){
        createUser(name:$name,email:$email,password:$password)
        {
             name
             email
             _id
             token
        }
      }
    `;
    let variables={
        name,
        email,
        password,
    }
    const options={
        method:'post',
        url:url,
        data:{
            query:query,
            variables:variables
        }
    }
    await axios(options)
      .then((response:any)=>{
          //  console.log("Response from backend for signup===>",response)
           if(response?.data?.errors)
           {
             console.log("-->",response?.data?.errors[0])
             res.json({
               error:true,
               message:response?.data?.errors[0].message
             })
           }
           if(response?.data?.data)
           {
             console.log("User response===>",response?.data?.data?.createUser)
             res.json({
                error:false,
                data:response?.data?.data?.createUser
             })
           }
      })
      .catch((err=>{
        console.log("Err in signup response==>",err)
        res.json({
          error:true,
          message:err.message
        })
      }))
}