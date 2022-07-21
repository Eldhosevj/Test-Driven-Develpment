import axios from "axios";
import React,{useState,useEffect} from "react";
const SignUpPage = () => {
const [value,setValues]=useState({
    password:"",
    repeatPassword:null,
    email:"",
    username:""
})    

//const [didUserEnterValue,setDidUserEnterValue]=useState(false)
const onChangeHandler=(e)=>{
setValues({...value,[e.target.name]:e.target.value})
//setDidUserEnterValue(true)
//setButtonDisabled(e.target.value!==value.repeatPassword)
}

// useEffect(()=>{
// if(didUserEnterValue&&value.repeatPassword===value.password){
//   setButtonDisabledButton(false)
// }
// },[value,didUserEnterValue])
const submit=(event)=>{
  event.preventDefault()
 // setButtonDisabledButton(true)
 const body=value
  axios.post("/api/1.0/users",body)
// fetch("/api/1.0/users",{
//   method:"POST",
//   headers:{
//     "Content-Type":"application/json",
//   },
//   body:JSON.stringify(body)
// })
}
  return (
    <div style={{width:"10%"}}>
      <h1>Sign Up</h1>
    <form autoComplete="on">
    <label htmlFor="user-name">User Name</label>
      <input id="user-name" value={value.username} name="username"  onChange={onChangeHandler}/>
      <label htmlFor="email">email</label>

      <input id="email" value={value.email} onChange={onChangeHandler} name="email"/>
      <label htmlFor="password">password</label>

      <input id="password" name="password" onChange={onChangeHandler} value={value.password} type="password"/>
      <label htmlFor="password-repeat"> password Repeat</label>

      <input id="password-repeat"  name="repeatPassword" onChange={onChangeHandler} value={value.repeatPassword} type="password"/>
      <button disabled={value.repeatPassword!==value.password} onClick={submit}>Sign UP</button>
    </form>
    </div>
  );
};
export default SignUpPage;
