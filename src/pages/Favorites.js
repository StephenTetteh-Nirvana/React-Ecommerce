import { Link } from "react-router-dom"
import { useContext } from "react"
import GlobalState from "../GlobalState.js"
import noFavorites from "../images/no-favorites.png"
import Navbar from "../components/Navbar"
import FavoriteProduct from "../components/FavoriteProduct.jsx"
import "../css/Favorites.css"

const Favorites = () => {

  const { favorites } = useContext(GlobalState)

  return (
    <div>
      <Navbar/>
      <h1 className="favorites-heading">Favorites List</h1>
      <div className="favorites-container">
        { favorites.length === 0 ? (
            <div className="favorites-content-box">
              <div className="img-box">
                <img src={noFavorites} alt="No Favorite Icon"/>
              </div>
              <h1>No Favorites Found</h1>
              <Link to="/products">
                <button className="add-favorites-btn">Add Favorites</button>
              </Link>
          </div>
        ) : (
          <div className="allFavorites-container">
            {
               favorites.map((favorite)=>(
                <FavoriteProduct key={favorite.id} product={favorite}/>
              ))
            }
            </div>
           
        )}
      </div>
    </div>
  )
}

export default Favorites
