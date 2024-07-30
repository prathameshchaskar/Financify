import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import { Button } from "../Button";

export const SignupSigninComponent = () => {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setpassword] = useState("");
    const[confirmPassword, setconfirmPassword] = useState("");

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>Financify.</span>
      </h2>
      <form className="signup-form">
        <Input 
        label={"Full Name"}
        state={name}
        setState={setName}
        placeholder={"John Doe"}
        />
        <Input 
        label={"Email"}
        state={email}
        setState={setEmail}
        placeholder={"JohnDoe@gmail.com"}
        />
        <Input 
        label={"Password"}
        state={password}
        setState={setpassword}
        placeholder={"Example@123"}
        />
        <Input 
        label={"Confirm Password"}
        state={confirmPassword}
        setState={setconfirmPassword}
        placeholder={"Example@123"}
        />

      <Button text={"Signup Using Email and Password"}/>
      <p style={{textAlign:"center"}}>or</p>
      <Button text={"Signup Using Google"} blue={true}/>
      
        
      </form>
    </div>
  );
};
