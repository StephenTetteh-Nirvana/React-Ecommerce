import { useContext, useEffect } from "react"
import Order from "../components/Order.jsx"
import Navbar from "../components/Navbar"
import GlobalState from "../GlobalState"

const Orders = () => {
  const { fetchCurrentUserData } = useContext(GlobalState)

  const orders =  localStorage.getItem("orders") !== null ? JSON.parse(localStorage.getItem("orders")) : []

  useEffect(()=>{
       fetchCurrentUserData()
  },[])
  return (
    <div> 
        <Navbar/>
        <div>
          { orders.length > 0 ? (
            <div>
              { orders.map((order)=>(
                <Order key={order.id} order={order}/>
              ))

              }
            </div>
            
          ) : (
            <h1>No Orders Yet</h1>
          )

          }
            
        </div>      
    </div>
  )
}

export default Orders
