import { Link } from "react-router-dom"
import "../css/Register.css"
import { useState } from "react"


const Register = () => {
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [passwordConfirm,setPasswordConfirm] = useState('')

  const RegisterUser = () => {
    if(password === passwordConfirm){
      console.log("Passwords must match")
    }
  }


  return (
    <div className="main">
        <form className="registerForm" onSubmit={(e)=>e.preventDefault()}>
          <h3>Sign Up</h3>

          <input type="text" 
          placeholder="Username"  
          autoComplete="off"
          value={userName}
          onChange={(e)=>setUserName(e.target.value)} 
          required/>

          <input type="password" 
          placeholder="Password"  
          autoComplete="off" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required/>

          <input type="password" 
          placeholder="Confirm Password"  
          autoComplete="off" 
          value={passwordConfirm}
          onChange={(e)=>setPasswordConfirm(e.target.value)}
          required/>

          <button className="register-btn" onClick={()=>RegisterUser()}>Register</button>
          <h4>Already Have An Account?
          <span><Link to="/login">Login</Link></span>
          </h4>

        </form>
    </div>
  )
}

export default Register
