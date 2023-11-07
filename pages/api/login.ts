import type { NextApiRequest,NextApiResponse } from "next";
import axios from 'axios'
export default async function login()
{
    let name="jaya"
    let email="jaya@gmail.com"
    let url=`http://localhost:5000/graphql`
    let query=`
      query login($name:String,$email:String){
        login(name:$name,email:$email)
        {
            token
        }
      }
    `
    let variables={
        name:name,
        email:email
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
         if(response?.data?.data?.login)
           console.log("login response---?",response?.data?.data?.login);
    })
}