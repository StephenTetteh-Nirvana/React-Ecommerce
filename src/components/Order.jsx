import { Link } from "react-router-dom"
import "../css/Order.css"

const Order = ({order}) => {

  return (
    <div className="order-product-container">
        <div className="order-product-box">
            <div className="order-first-section">
              <img src={require(`../images/${order.image}`)} alt="order"/>
            </div>
            <div className="order-second-section">
              <div className="order-info-section">
                <p>{order.name}</p>
                <p>${order.price}.00</p>
              </div>
              <div className="order-status-section">
                <Link to={`/products/productPage/${order.id}`}>
                  <button>RE-ORDER</button>
                </Link>
              </div>
            </div>
        </div>    
    </div>
  )
}

export default Order
