import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import "../css/ProductPage.css"
import { useContext, useState } from "react";
import GlobalState from "../GlobalState";

const ProductPage = () => {
    const allProducts = localStorage.getItem("Products") !== null ?  JSON.parse(localStorage.getItem("Products")):[];
    const { id } = useParams()
    const {addToCart} = useContext(GlobalState)
    const [currentIndex,setCurrentIndex] = useState(0)

    const product = allProducts.find((p) => p.id === id)

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
              <label className="quantity-heading">Quantity:</label><br/>
              <button className="quantity-minus-button">-</button>
              <input type="text" value="1"/>
              <button className="quantity-plus-button">+</button>
              <button className="add-btn" onClick={()=>addToCart(product.images[0],product.name,product.price)}>Add To Cart</button>
            </div>
          </div>
  
        </div>  
      )}
      
    </div>
  )
}

export default ProductPage
