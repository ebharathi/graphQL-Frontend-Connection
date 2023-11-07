import axios from "axios";
import type { NextApiRequest,NextApiResponse } from "next";

export default async function signup()
{
    const name = 'jaya';
    const email = 'jaya@gmail.com';
    const password = 'abc123';
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
           console.log("Response from backend for signup===>",response)
           if(response?.data?.data)
           {
            console.log("User response===>",response?.data?.data?.createUser)
           }
      })
      .catch((err=>{
        console.log("Err in signup response==>",err)
      }))
}