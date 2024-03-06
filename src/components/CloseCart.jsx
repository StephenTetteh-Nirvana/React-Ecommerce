import { useState } from "react";
import Cart from "../components/Cart.jsx"

const CloseCart = () => {
    const [showComponent, setShowComponent] = useState(true);

    const toggleComponent = () => {
      setShowComponent(!showComponent);
    };
  return (
    <div>
      <button onClick={toggleComponent}>Close</button>
      {showComponent && <Cart/>}
    </div>
  )
}

export default CloseCart
