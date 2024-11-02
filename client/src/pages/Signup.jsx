import { useState,useEffect} from "react";
import { Link,useNavigate} from "react-router-dom";
import { useFirebase } from "../context/Firebase.jsx"; 

export default function Signup() {
  const firebase = useFirebase();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    if(!firebase.isLoading && firebase.isLoggedIn){
        navigate("/home")
    }
  },[firebase,navigate,firebase.isLoading])

  const handleLogin = (e) => {
    e.preventDefault(); 

    setIsLoading(true);
    firebase
      .signupUserWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
        console.log("User signed up successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="bg-[url('./assets/login.png')] bg-cover opacity-80 h-svh w-full">
      <div className="h-full absolute right-0 flex flex-col justify-center w-[40%] px-10">
        <form onSubmit={handleLogin} className="bg-[#DED8D0] w-[85%] rounded-lg flex flex-col font-Poppins items-center justify-center gap-4 p-7">
          <h className="text-3xl font-semibold mb-3">SIGN UP</h>
          <input type="text" className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1" placeholder="Email" autoFocus></input>
          <input type="password" className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1" placeholder="Password"></input>
          <input type="password" className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1" placeholder="Confirm Password"></input>
          <button onClick={handleLogin} className="mt-3 text-xl font-medium hover:bg-[#5E463B] bg-[#B2A59B] px-3 py-1 rounded-lg m-3 hover:text-[#DED8D0] border-2 text-[#3b261e]"> Signup </button>
        </form>
      </div>
    </div>
  );
}
