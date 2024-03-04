import "./App.css"
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home.js"
import About from "./pages/About.js"
import Contact from "./pages/Contact.js"
import NotFound from "./pages/NotFound.js"
import User from "./pages/User.js"
import Men from "./pages/Men.js"
import Women from "./pages/Women.js"
import Accessories from "./pages/Accessories.js"
import Kids from "./pages/Kids.js"
import Favorites from "./pages/Favorites.js"



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/user" element={<User/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>

        <Route path="/men" element={<Men/>}></Route>
        <Route path="/women" element={<Women/>}></Route>
        <Route path="/accessories" element={<Accessories/>}></Route>
        <Route path="/kids" element={<Kids/>}></Route>
        <Route path="/favorites" element={<Favorites/>}></Route>

      </Routes>
    </div>

  
  );
}

export default App;
