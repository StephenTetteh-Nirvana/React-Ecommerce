import Favorite from "../images/favorites.png"
import Liked from "../images/product-favorite-red.png"
import Rating from "../images/rating.png"
import { useState } from "react"
import { db } from "../firebase.js"
import { getDoc, updateDoc, doc } from "firebase/firestore"


const NewProduct = ({product}) => {

    const [wishlist,setWishlist] = useState(false)

    const toggleFavorite = async (productId) => {
        const docRef = doc(db, "New Releases", productId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            const docData = docSnap.data().favorite;
            setWishlist(!wishlist);
            await updateDoc(docData, { favorite: docData });
        } else {
            console.log("Document not found:", productId);
        }
    };



  return (

    <div className="featured-product">
    <img src={require(`../images/${product.src}`)} alt="Image Here"/>
    <div className="product-details-section">
        <p className="title">{product.name}</p>
        <p className="subtitle">{product.description}</p>
        <div className="price-section">
        <div className="rating-box">
             <img src={Rating} alt="ratings-icon"/>
             <img src={Rating} alt="ratings-icon"/>
             <img src={Rating} alt="ratings-icon"/>
             <img src={Rating} alt="ratings-icon"/>
             <img src={Rating} alt="ratings-icon"/>
        </div>
        <p className="price">{product.price}</p>
        </div>
    </div>
        <div onClick={()=>{toggleFavorite(product.id)}} className="product-favorites-box">
            <div className="favorite-box">
               <img src={product.favorite ? Liked : Favorite} alt="favorite-icon"/>
            </div>
            
        </div>
    </div>  
  )
}

export default NewProduct
