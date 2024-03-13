import { useState } from "react"
import "../css/Login.css"
import { Link } from "react-router-dom"

const Login = () => {
  const [ userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  
  return (
    <div className="main">
          <form className="form" onSubmit={(e)=>e.preventDefault()}>
              <h3>Sign In</h3>

              <input type="text" 
              placeholder="Username" 
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              autoComplete="off" 
              required/>

              <input type="password" 
              placeholder="Password" 
              autoComplete="off" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required/>

              <button className="submit-btn">Login</button>
              <h4>Don't Have An Account?
                <span><Link to="/register">Register</Link></span>
              </h4>

            </form>
    </div>
  )
}

export default Login
