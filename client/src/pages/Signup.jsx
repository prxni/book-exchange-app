import { useState,useEffect} from "react";
import { Link,useNavigate} from "react-router-dom"; 
import axios from 'axios';

export default function Signup() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const signup = (evt) => {
    evt.preventDefault()
    setErrorMsg(""); // Clear previous errors
    
    if(!name) setErrorMsg("Name is required");
    else if(!username) setErrorMsg("Username is required");
    else if(!email) setErrorMsg("Email is required");
    else if(!phone) setErrorMsg("Phone is required");
    else if(!password) setErrorMsg("Password is required");
    else if(repassword!=password) setErrorMsg("Password does not match");
    else {
        setIsLoading(true);
        axios.post('http://localhost:3000/api/auth/signup', { username, password, name, email, phone })
        .then((res) => {
            if(res.data.errorCode!=null) {
                setErrorMsg(res.data.message);
                setIsLoading(false);
                return;
            }
            document.cookie = `auth=${res.data.accessToken};`
            document.cookie = `ref=${res.data.refreshToken};`
            navigate('/home')
        })
        .catch(err => {
            setIsLoading(false);
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMsg(err.response.data.message);
            } else {
                setErrorMsg("An error occurred. Please try again.");
            }
        })
    }
}

  return (
    <div className="bg-[url('./assets/login.png')] bg-cover opacity-80 h-svh w-full">
      <div className="h-full absolute right-0 flex flex-col justify-center w-[40%] px-10">
        <form  onSubmit={signup} className="bg-[#DED8D0] w-[85%] rounded-lg flex flex-col font-Poppins items-center justify-center gap-4 p-7" >
          <h1 className="text-3xl font-semibold mb-3">SIGN UP</h1>
          <div>
            {errorMsg && <div className="flex justify-center items-center gap-x-1 text-rose-500 border-rose-400 border-2 rounded w-full"><span className="material-symbols-outlined inline text-sm select-none">error</span><p className="inline text-sm">{errorMsg}</p></div>}
          </div>
          <input type="text" className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1"  onChange={(e) => setName(e.target.value)} placeholder="Name" autoFocus></input>
          <input type="text" className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1"  onChange={(e) => setUsername(e.target.value)} placeholder="Username" autoFocus></input>
          <input type="text" className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1"  onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoFocus></input>
          <input type="tel" className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1"  onChange={(e) => setPhone(e.target.value)} placeholder="Phone" autoFocus></input>
          <input type="password"  className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1" onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
          <input type="password"  className="bg-[#DED8D0] border-b-2 outline-none w-72 text-xl my-1" onChange={(e) => setRepassword(e.target.value)} placeholder="Confirm Password"></input>
          <button disabled={isLoading} className="mt-3 text-xl font-medium hover:bg-[#5E463B] bg-[#B2A59B] px-3 py-1 rounded-lg m-3 hover:text-[#DED8D0] border-2 text-[#3b261e] disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
}
