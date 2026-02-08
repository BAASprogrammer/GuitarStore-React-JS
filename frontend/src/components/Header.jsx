import ShoppingCart from "./ShoppingCart";
import "../assets/css/modedarklight.css";
import Switch from "./Switch";
import Menu from "./Menu";

export default function Header({dataCart, deleteCart, emptyCart}){
    const nombretienda = "GuitarStore"
    return(
        <header className="sticky-menu">
            <div className="header-container flex justify-between flex-wrap align-center">
                <div className="header-logo left align-center">
                    <img src={require("../assets/images/header/guitar.png")} alt="Logo" width={'50px'} height={'50px'}></img>
                    <h1>{nombretienda}</h1> 
                </div>
                <div>
                    <Menu/>
                </div>
            </div>
            <div className="darkmode-shop right flex align-center gap-2 position-absolute top-0 right-0">
                <Switch/>
                <ShoppingCart
                    dataCart = {dataCart}
                    deleteCart={deleteCart} 
                    emptyCart = {emptyCart}
                />
            </div>
        </header>
    )
}
