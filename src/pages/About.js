import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate()
    const goBack = () => {
      navigate(-1)
    }
  return (
    <div>
      <h1>About Page</h1>
      <button onClick={goBack}>Go Back</button>
    </div>
  )
}

export default About
