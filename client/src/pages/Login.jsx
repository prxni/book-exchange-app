import { useEffect, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import axios from 'axios';


export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const login =(evt)=>{
    evt.preventDefault()
    if(!username) setErrorMsg("Enter username");
    else if(!password)  setErrorMsg("Enter password");
    else {
      axios.post('http://localhost:3000/api/auth/login', { username, password })
      .then((res) => {
          if(res.data.errorCode!=null) return setErrorMsg(res.data.message);
          document.cookie = `auth= ${res.data.accessToken};`
          document.cookie = `token= ${res.data.refreshToken};`
          navigate('/home')
      })
      .catch(err => setErrorMsg(err.message))
    
  }}
  return (
    <div className="bg-[url('./assets/login.png')] bg-cover opacity-80 h-svh w-full">
      <div className="h-full absolute right-0 flex flex-col justify-center w-[40%] px-10">
        <form onSubmit={login}  className="bg-[#DED8D0] w-[85%] rounded-lg flex flex-col font-Poppins items-center justify-center gap-4 p-7">
          <h1 className="text-3xl font-semibold mb-3">LOGIN</h1>
          <div>
            {errorMsg && <div className="flex justify-center items-center gap-x-1 text-rose-500 border-rose-400 border-2 rounded w-full"><span className="material-symbols-outlined inline text-sm select-none">error</span><p className="inline text-sm">{errorMsg}</p></div>}
          </div>
          <input type="text" className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1" onChange={(e) => setUsername(e.target.value)}  placeholder="UserName" autoFocus></input>
          <input type="password" className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
          <button  className="mt-3 mb-1 text-xl font-medium hover:bg-[#5E463B] bg-[#B2A59B] px-3 py-1 rounded-lg hover:text-[#DED8D0] border-2 "> Login </button>
          <p>New user? <Link className="underline" to="/signup">Signup</Link></p>
        </form>
      </div>
    </div>
  );
}
