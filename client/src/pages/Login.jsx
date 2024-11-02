import { useEffect, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { useFirebase } from "../context/Firebase.jsx"; 

export default function Login() {
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
    e.preventDefault()

    setIsLoading(true);
    firebase
      .loginUserWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
        console.log("User logged in successfully");
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 via-cyan-100 to-purple-100 flex flex-col font-poppins absolute justify-center items-center h-svh w-full border-2">
      {!isLoading && (
        <div className="flex flex-col items-center hover:shadow-md duration-150 bg-white hover:shadow-teal-300 gap-5 text-[20px] justify-center py-9 text-center border-blue-200 border-2 shadow-teal-300 shadow-sm rounded-xl w-[30%] h-fit ">
          <h1 className="text-3xl font-semibold select-none ">Login</h1>
          <div className="w-[70%] min-h-6">
            {errorMsg && (
              <div className="flex justify-center items-center gap-x-1 text-rose-500 border-rose-400 border-2 rounded w-full">
                <span className="material-symbols-outlined inline text-sm select-none">error</span>
                <p className="inline text-sm">{errorMsg}</p>
              </div>
            )}
          </div>
          <form onSubmit={handleLogin} className="flex flex-col items-center gap-3 w-[70%]">
            <input
              autoFocus
              autoComplete="off"
              spellCheck="false"
              className="text-lg border-b-2 w-[80%] outline-none focus-within:border-teal-300 hover:border-teal-300 bg-transparent duration-150"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              autoComplete="off"
              spellCheck="false"
              className="text-lg border-b-2 w-[80%] outline-none focus-within:border-teal-300 hover:border-teal-300 bg-transparent duration-150"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="cursor-default text-base font-semibold border-2 mt-5 mb-2 rounded-lg hover:bg-slate-800 duration-150 px-5 py-1 bg-black text-white"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm space-x-1">
            <span>Don&apos;t have an account?</span>
            <Link
              className="group border-b-2 border-transparent font-medium hover:border-teal-300 duration-200"
              to="/signup"
            >
              Sign Up
              <span className="material-symbols-outlined relative top-[2px] font-semibold group-hover:text-teal-300 text-base duration-200">
                open_in_new
              </span>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
