import Logo from "../images/logo.png"
import "../css/Footer.css"

const Footer = () => {
  return (
    <div>
    <div className="newsletter-container">
        <div className="footer-image-section">
            <img src={Logo} alt="logo"/>
            <h3>YOU-SHOP</h3>
        </div>
       
        <div className="newsletter-section">
           <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
            <input type="text" placeholder="Email Here..."/>
            <button>Subscribe</button>
        </div>
    </div>

    <div className="copyright-section">
      <p>COPYRIGHT &copy; 2024.All Rights Reserved</p>
    </div>

    </div>
   
  )
}

export default Footer
