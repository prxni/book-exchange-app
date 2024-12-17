import { Link,useNavigate} from "react-router-dom";
import { useEffect, useState ,useContext} from "react";
import { AuthContext } from "../Auth/AuthContext";
export default function Home()
{
    const { authorize, user, isLoading } = useContext(AuthContext)

    useEffect(() => {
        authorize()
    },[])

    return(
        <div>
            {!isLoading && user && <span>hi</span>}
        </div>
    )
}