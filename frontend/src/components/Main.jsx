import Approutes from "./AppRoutes";

export default function Main({dato, addCart, cart, emptyCart}){    
    return(
        <main className="main-container flex justify-center">
            <Approutes
                dato = {dato}
                cart = {cart}
                addCart = {addCart}
                emptyCart = {emptyCart}
            />
        </main>
    )
}