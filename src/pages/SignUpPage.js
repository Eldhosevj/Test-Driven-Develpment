import axios from "axios";
import React, { useState, useEffect } from "react";
const SignUpPage = () => {
  const [value, setValues] = useState({
    password: "",
    repeatPassword: null,
    email: "",
    username: "",
  });


  const onChangeHandler = (e) => {
    setValues({ ...value, [e.target.name]: e.target.value });

  };
const [onGoingApiCall,setOnGoingApiCall]=useState(false)
const [apiCallSuccesfull,setApiCallSucesful]=useState(false)
const [error,setError]=useState({})
  const submit = (event) => {
    event.preventDefault();
    setOnGoingApiCall(true)
    const body = value;
    axios.post("/api/1.0/users", body).then(()=>{
      setOnGoingApiCall(false)
      setApiCallSucesful(true)
    }).catch((error)=>{
     setOnGoingApiCall(false)
     setApiCallSucesful(false)
     setError(error.response.data.validationErrors)
 
    });
    // fetch("/api/1.0/users",{
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json",
    //   },
    //   body:JSON.stringify(body)
    // })
  };
  return (
    <div style={{ width: "10%" }}>
      <h1>Sign Up</h1>
      {apiCallSuccesfull==false &&
      <form autoComplete="on" data-testid="form-sign-up">
        <label htmlFor="user-name">User Name</label>
        <input
          id="user-name"
          value={value.username}
          name="username"
          onChange={onChangeHandler}
        />
        <p>{error.username}</p>
        <label htmlFor="email">email</label>

        <input
          id="email"
          value={value.email}
          onChange={onChangeHandler}
          name="email"
        />
        <label htmlFor="password">password</label>

        <input
          id="password"
          name="password"
          onChange={onChangeHandler}
          value={value.password}
          type="password"
        />
        <label htmlFor="password-repeat"> password Repeat</label>

        <input
          id="password-repeat"
          name="repeatPassword"
          onChange={onChangeHandler}
          value={value.repeatPassword}
          type="password"
        />
        <button
          disabled={value.repeatPassword !== value.password||onGoingApiCall}
          onClick={submit}
        >
          Sign UP
        </button>
      </form>
      }
      <p>{apiCallSuccesfull&&"Please check your Email to activate your account"}</p>
    </div>
  );
};

export default SignUpPage;
