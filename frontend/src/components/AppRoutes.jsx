
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Products from "../pages/Products"
import Checkout from "../pages/Checkout"
import WebpayResultado from "../pages/WebpayResultado"

export default function Approutes({dato, addCart, cart, emptyCart}){
    const location = useLocation();
    return(
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home dato={dato} cart={cart} addCart={addCart} />} />
            <Route path="/home" element={<Home dato={dato} cart={cart} addCart={addCart} />} />
            <Route path="/products" element={<Products dato={dato} cart={cart} addCart={addCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout emptyCart={emptyCart} />} />
            <Route path="/webpay/resultado" element={<WebpayResultado emptyCart={emptyCart} />} />
        </Routes>
    )
}