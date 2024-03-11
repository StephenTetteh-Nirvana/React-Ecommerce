import { collection, getDocs } from "firebase/firestore"
import Navbar from "../components/Navbar"
import Product from "../components/Product.jsx"
import "../css/Products.css"
import { db } from "../firebase.js"
import { useEffect,useState,useContext } from "react"
import GlobalState from "../GlobalState.js"

const Products = () => {

  const [Allproducts,SetAllProducts] = useState([])

  const { addToCart } = useContext(GlobalState)
   
   

    const fetchProducts = async () => {
      const colRef = collection(db, "Products");
      const docRef = await getDocs(colRef);
       
      const productsFromDB = []

      docRef.forEach((doc) => {
        const productData = doc.data();
        productsFromDB.push(productData)
      })

      SetAllProducts([...Allproducts, ...productsFromDB])  
    }
    
    useEffect(() => {
      fetchProducts();
    }, []);

  return (
    <div className="products-wrapper">
      <Navbar/>
        <div className="products-container">
        {
          Allproducts.map((item)=>(
            <Product key={item.id} item={item}/>
          ))
        }

        <button onClick={()=>addToCart("black-shirt.jpg","Black Shirt",30.99,4)}> Update Cart</button>
        </div>
    
    </div>
  )
}

export default Products
