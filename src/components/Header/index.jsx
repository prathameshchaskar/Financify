import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userSvg from "../../assets/user.svg"

export const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  const logoutFun = () => {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged out successfully");
          navigate("/")
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="navbar">
      <p className="logo">Financify</p>
      {user && (
        <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
    
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "30" : "24"}
              style={{ borderRadius: "50%" }}
            />
         
        <p className="logo link" onClick={logoutFun}>
          Logout
        </p>
        </div>
      )}
    </div>
  );
};
