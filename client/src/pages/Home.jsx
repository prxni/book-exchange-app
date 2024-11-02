import { Link,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase.jsx"

export default function Home()
{
    const navigate=useNavigate()
    const firebase = useFirebase();
    useEffect(()=>{
        if(!firebase.isLoggedIn){
            navigate("/")
        }
      },[firebase,navigate])

    return(
        <div>
            hi
        </div>
    )
}