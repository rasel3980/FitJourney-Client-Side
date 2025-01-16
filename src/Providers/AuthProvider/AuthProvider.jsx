import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../Firebase/Firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
export const authContext = createContext();
const AuthProvider = ({ routes }) => {
        const provider = new GoogleAuthProvider();
        const [user, setUser] = useState(null);
        const [loader, setLoader] = useState(true);
      
        const handleGoogleLogin = () => {
          setLoader(true);
          return signInWithPopup(auth, provider);
        };
      
        const handleSignIn = (email, password) => {
          setLoader(true);
          return signInWithEmailAndPassword(auth, email, password);
        };
      
        const handleRegister = (email, password) => {
          setLoader(true);
          return createUserWithEmailAndPassword(auth, email, password);
        };
      
        const handleLogout = () => {
          setLoader(true);
          return signOut(auth);
        };
        const ManageProfile = (name,photo)=>{
          return updateProfile(auth.currentUser, {
            displayName:name, photoURL:photo
          });
        }
        const ForgetPassword = (Email)=>{
          return sendPasswordResetEmail(auth, Email)
         }
      
        const AuthInfo = {
          handleGoogleLogin,
          handleSignIn,
          handleRegister,
          handleLogout,
          ForgetPassword,
          ManageProfile,
          user,
          loader,
        };
      
        useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log(currentUser);
            setLoader(true);
          });
      
          return () => {
            unsubscribe(); 
          };
        }, []);
    return (
        <authContext.Provider value={AuthInfo}>
            {routes}
        </authContext.Provider>
    );
};

export default AuthProvider;