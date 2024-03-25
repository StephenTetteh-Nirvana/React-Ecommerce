import "../css/Product.css"
import { Link } from "react-router-dom"


const Product = ({item}) => {
  return (
        <div className="product-box">
            <Link to={`/products/productPage/${item.id}`}>
              <div className="first-image-box">
                <img src={require(`../images/${item.images[0]}`)} alt="Item"/>
              </div>
            </Link>
            
              <div className="product-details">
                  <p>{item.name}</p>
                  <p>${item.price}.00</p>
              </div>
        </div>
   
  )
}

export default Product
