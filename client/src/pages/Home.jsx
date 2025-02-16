import { Link,useNavigate} from "react-router-dom";
import { useEffect, useState ,useContext} from "react";
import { AuthContext } from "../Auth/AuthContext";
import Header from "../components/Header";
export default function Home()
{
    const { authorize, user, isLoading } = useContext(AuthContext)

    useEffect(() => {
        authorize()
    },[])

    return(
        <Header/>
    )
}