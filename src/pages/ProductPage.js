import { useContext } from "react"
import { useParams } from "react-router-dom"
import GlobalState from "../GlobalState"
import Navbar from "../components/Navbar"
import "../css/ProductPage.css"

const ProductPage = () => {
    const { allProducts } = useContext(GlobalState)
    const { id } = useParams()

    const product = allProducts.find((p)=> p.id === id)
    
  return (
    <div>
      <Navbar/>
      <div className="products-details-box">
        <div className="image-section">
          <img src={require(`../images/${product.images[0]}`)}/>
            <div className="sub-images">
              <img src={require(`../images/${product.images[1]}`)}/>
              <img src={require(`../images/${product.images[2]}`)}/>
            </div>
        </div>

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
            <button className="add-btn">Add To Cart</button>
          </div>
        </div>

      </div>
     
      
    </div>
  )
}

export default ProductPage
