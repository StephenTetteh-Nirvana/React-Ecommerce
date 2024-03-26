import { useParams,Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import CartLoader from "../components/CartLoader";
import "../css/ProductPage.css"
import Liked from "../images/product-favorite-red.png"
import GlobalState from "../GlobalState";

const ProductPage = () => {
    const { id } = useParams()
    const allProducts = localStorage.getItem("Products") !== null ?  JSON.parse(localStorage.getItem("Products")):[];
    const product = allProducts.find((p) => p.id === id)

    const {cart,favorites,addToFavorites,addToCart,loading} = useContext(GlobalState)
    const [currentIndex,setCurrentIndex] = useState(0)
    const [quantity,setQuantity] = useState(1)
    const [ExistingProduct,setExistingProduct] = useState(false) 
    const [LikedProduct,setLikedProduct] = useState(false)

    const existingProduct = () =>{
        const alreadyAddedProduct = cart.find((p)=> p.id === product.id)
        if(alreadyAddedProduct){
          setExistingProduct(true)
        }else{
          setExistingProduct(false)
        }
    }

    const existingFavoriteProduct = () =>{
      const alreadyLikedProduct = favorites.find((p)=> p.id === product.id)
      if(alreadyLikedProduct){
        setLikedProduct(true)
      }else{
        setLikedProduct(false)
      }
  }

    const increaseQuantityValue = () =>{
      let newQuantity = quantity + 1;
      setQuantity(newQuantity)
    }

    const decreaseQuantityValue = () =>{
      if(quantity === 1 ){
       console.log("cant subtract")
      }else{
        let newQuantity = quantity - 1;
        setQuantity(newQuantity)
      }
    }

    useEffect(()=>{
      existingProduct()
      existingFavoriteProduct()
    })   

  return (
    <div className="product-container">
      <Navbar/>
      { product && (
              <div className="products-details-box">
                {
                  product.images && (
                    <div className="image-section">
                    <img src={require(`../images/${product.images[currentIndex]}`)} alt="Product "/>
                    <div className="sub-images">
                      <img onClick={()=>setCurrentIndex(0)} src={require(`../images/${product.images[0]}`)} alt="Product "/>
                      <img onClick={()=>setCurrentIndex(1)} src={require(`../images/${product.images[1]}`)} alt="Product "/>
                      <img onClick={()=>setCurrentIndex(2)} src={require(`../images/${product.images[2]}`)} alt="Product "/>
                    </div>
                  </div>
                )}
             
          <div className="product-information">
            <h1>{product.name}</h1>
            <p className="product-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac magna eu nisl faucibus ultricies. 
              Curabitur sit amet justo vitae urna dictum congue. Integer sit amet eleifend nulla. 
              Nullam pharetra mauris at purus efficitur lacinia. In hac habitasse platea dictumst. 
              Vivamus ac mauris tortor.
            </p>
            <h1 className="product-price">${product.price}.00</h1>
  
            <div className="product-info-section-two">
              
              <div className="quantity-box">
              <label className="quantity-heading">Quantity:</label><br/>
              <button className="quantity-minus-button"  onClick={()=>decreaseQuantityValue()}>-</button>
              <input type="text" 
              value={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
              />
              <button className="quantity-plus-button" onClick={()=>increaseQuantityValue()}>+</button>
              </div>

              <div className="buttons-box">
                { LikedProduct ? (
                  <Link to="/favorites">
                    <button className="existing-favorites-btn">Already Liked<span className="favorite-icon-box"><img src={Liked} alt="liked"/></span></button>
                  </Link>
                 
                ) : (
                  <button className="favorites-btn" onClick={()=>addToFavorites(product.id,product.images[0],product.name,product.price,quantity)}>Add To Favorites</button>
                )}
           

              { ExistingProduct ? (
                <button className="existing-product-btn">Already In Bag</button>
              ) : (
                <button className="add-btn" onClick={()=>addToCart(product.id,product.images[0],product.name,product.price,quantity)}>Add To Cart</button>
              )}

              {loading && <CartLoader/>}
              
              </div>
             
            </div>
          </div>
  
        </div>  
      )}
      
    </div>
  )
}

export default ProductPage
