import Order from "../components/Order.jsx"
import "../css/Orders.css"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"

const Orders = () => {

  const orders =  localStorage.getItem("orders") !== null ? JSON.parse(localStorage.getItem("orders")) : []

  return (
    <div> 
        <Navbar/>
        <div className="allOrders-container">
        <h1>All Orders</h1>
          { orders.length > 0 ? (
            <div className="orders-products-container">
              { orders.map((order)=>(
                <Order key={order.id} order={order}/>
              ))
              }
            </div>
            
          ) : (
            <div className="no-orders-container">
              <h1>No Orders Yet</h1>
              <Link to="/products">
                <button>Start Shopping</button>
              </Link>
            </div>
          )

          }
            
        </div>      
    </div>
  )
}

export default Orders
