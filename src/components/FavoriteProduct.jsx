import "../css/FavoriteProduct.css"
import { Link } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { doc,getDoc,updateDoc } from "firebase/firestore"
import { db,auth } from "../firebase.js"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import GlobalState from "../GlobalState"
import CartLoader from "../components/CartLoader.jsx"


const FavoriteProduct = ({product}) => {

    const { fetchCurrentUserData } = useContext(GlobalState)
    const [removeFromFavorites,setremoveFromFavorites] = useState(false)

    const removeFavoriteProduct = (productId) =>{
        onAuthStateChanged(auth,async (user)=>{
            if(user){
              try{
                setremoveFromFavorites(true)
              const uid = user.uid;
              const userDocRef = doc(db,"Users",uid)
              const userDoc = await getDoc(userDocRef)
              
              if(userDoc.exists()){
                const favoriteData = userDoc.data().favorites;
                const updatedFavoriteArray = favoriteData.filter((p) => p.id !== productId)
                console.log(updatedFavoriteArray)
                await updateDoc(userDocRef,{
                    favorites:updatedFavoriteArray
                })
                toast.success("Removed From Favorites",{
                    autoClose:1500
                })
                setremoveFromFavorites(false)
                fetchCurrentUserData()
              }
            }
            catch(error){
               console.log(error)
            }
        }
        })
    }

  return (
    <div className="favorite-product-box">

        <div className="product-first-section">
            <Link to={`/products/productPage/${product.id}`}>
                <div className="product-image-box">
                    <img src={require(`../images/${product.image}`)}/>
                </div>
            </Link>
            

            <div className="product-info">
                <h3 className="name">{product.name}</h3>
                <h3 className="price">${product.price}.00</h3>
            </div>
        </div>

        <div className="product-buttons-box">
           <button className="remove-btn" onClick={()=>removeFavoriteProduct(product.id)}>Remove</button>
        </div>
      
        {removeFromFavorites && <CartLoader/>}
    </div>
  )
}

export default FavoriteProduct
