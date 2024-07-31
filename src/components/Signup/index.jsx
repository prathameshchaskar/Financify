import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { Button } from "../Button";
import Input from "../Input";
import "./styles.css";
import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  const signupWithEmail = () => {
    setLoading(true);
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmPassword", confirmPassword);

    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("user", user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setconfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Passwords do not match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };

  const loginWithEmail = () => {
    console.log("email", email);
    console.log("password", password);
    setLoading(true);

    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged  In!");
          setLoading(false);
          createDoc(user);
          navigate("/dashboard");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };

  const createDoc = async (user) => {
    setLoading(true);
    //Create a doc
    if (!user) return;

    const useRef = doc(db, "users", user.uid);
    const userData = await getDoc(useRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        setLoading(false);
        toast.success("Doc created!");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists");
      setLoading(false);
    }
  };

  const googleAuth = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user", user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard");
          toast.success("User Authenticated!");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          
          // ...
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financify.</span>
          </h2>
          <form className="signup-form">
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              onClick={() => loginWithEmail()}
            />
            <p className="p-login">or</p>
            <Button
              text={loading ? "Loading..." : "Login Using Google"}
              blue={true}
              onClick={() => googleAuth()}
            />
            <p
              className="p-login link"
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Don't Have An Account? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financify.</span>
          </h2>
          <form className="signup-form">
            <Input
              type={"text"}
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type={"password"}
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setconfirmPassword}
              placeholder={"Example@123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={() => signupWithEmail()}
            />
            <p className="p-login">or</p>
            <Button
              text={loading ? "Loading..." : "Signup Using Google"}
              blue={true}
              onClick={() => googleAuth()}
            />
            <p
              className="p-login link"
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Have An Account Already? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
};
