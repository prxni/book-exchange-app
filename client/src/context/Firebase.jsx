import { createContext, useContext } from "react";
import { initializeApp} from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import {set,ref,getDatabase} from "firebase/database";


const firebaseConfig ={
    apiKey: "AIzaSyBGWDulRwSPocGeKE3Bs461i-GwA7Le65U",
    authDomain: "hehe-app-cac97.firebaseapp.com",
    projectId: "hehe-app-cac97",
    storageBucket: "hehe-app-cac97.appspot.com",
    messagingSenderId: "98631948125",
    appId: "1:98631948125:web:6079802ba8157111b37ab4",
    measurementId: "G-CGGZHG2CK1",
    databaseUrl:"https://hehe-app-cac97-default-rtdb.firebaseio.com/"
};

const firebaseApp=initializeApp(firebaseConfig);
const firebaseAuth=getAuth(firebaseApp)
const database=getDatabase(firebaseApp)

const FirebaseContext=createContext(null)

export const useFirebase=()=> useContext(FirebaseContext);

export const FirebaseProvider =(props)=>
{
    const signupUserWithEmailAndPassword =(email,password)=>{
        return createUserWithEmailAndPassword(firebaseAuth,email,password)
    }
    const loginUserWithEmailAndPassword=(email,password)=>{
        return signInWithEmailAndPassword(firebaseAuth,email,password)
    }
    const putData=(key,data)=>set(ref(database,key),data)

    return <FirebaseContext.Provider
        value={{signupUserWithEmailAndPassword,putData,loginUserWithEmailAndPassword}}
    >{props.children}
    </FirebaseContext.Provider>
}