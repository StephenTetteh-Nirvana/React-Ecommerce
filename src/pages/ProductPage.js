import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import "../css/ProductPage.css"
import { useContext, useEffect, useState } from "react";
import GlobalState from "../GlobalState";

const ProductPage = () => {
    const { id } = useParams()
    const allProducts = localStorage.getItem("Products") !== null ?  JSON.parse(localStorage.getItem("Products")):[];
    const product = allProducts.find((p) => p.id === id)

    const {addToCart,cart} = useContext(GlobalState)
    const [currentIndex,setCurrentIndex] = useState(0)
    const [quantity,setQuantity] = useState(1)
    const [ExistingProduct,setExistingProduct] = useState(false)

    const existingProduct = () =>{
        const alreadyAddedProduct = cart.find((p)=> p.id === product.id)
        if(alreadyAddedProduct){
          console.log("already exists",product)
          setExistingProduct(true)
        }else{
          console.log("no item found")
        }
    }

    useEffect(()=>{
      existingProduct()
    })

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

    

  return (
    <div>
      <Navbar/>
      { product && (
              <div className="products-details-box">
                {
                  product.images && (
                    <div className="image-section">
                    <img src={require(`../images/${product.images[currentIndex]}`)}/>
                    <div className="sub-images">
                      <img onClick={()=>setCurrentIndex(0)} src={require(`../images/${product.images[0]}`)}/>
                      <img onClick={()=>setCurrentIndex(1)} src={require(`../images/${product.images[1]}`)}/>
                      <img onClick={()=>setCurrentIndex(2)} src={require(`../images/${product.images[2]}`)}/>
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
              <button className="favorites-btn">Add To Favorites</button>

              { ExistingProduct ? (
                <button className="existing-product-btn">Already In Bag</button>
              ) : (
                <button className="add-btn" onClick={()=>addToCart(product.images[0],product.name,product.price,quantity)}>Add To Cart</button>
              )
                 
              }
              
              </div>
             
            </div>
          </div>
  
        </div>  
      )}
      
    </div>
  )
}

export default ProductPage
