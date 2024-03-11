import "../css/Playstation.css"
import {Link} from "react-router-dom"

const PlayStation = () => {
  return (
    <div className="div-wrapper">
        <div className="image-box">
           <div className="ps5-info-box">
                <h1>50% OFF</h1>
                <Link to="/products">
                  <button>SHOP NOW</button> 
                </Link>
            </div>
        </div>

    </div>
  )
}

export default PlayStation
