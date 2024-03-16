import { Link } from "react-router-dom"
import noFavorites from "../images/no-favorites.png"
import Navbar from "../components/Navbar"
import "../css/Favorites.css"

const Favorites = () => {
  return (
    <div>
      <Navbar/>
      <div className="favorites-container">
        <div className="favorites-content-box">
          <div className="img-box">
            <img src={noFavorites}/>
          </div>
          <h1>No Favorites Found</h1>
          <Link to="/products">
            <button className="add-favorites-btn">Add Favorites</button>
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default Favorites
