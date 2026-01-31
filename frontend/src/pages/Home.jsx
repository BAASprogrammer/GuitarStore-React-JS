import Products from "./Products";

export default function Home({ dato, cart, addCart }){

    return(
        <section id="index" className="index-section">
            <div className="index-container">
                <h1 className="welcome-text center">Bienvenido a Tienda de Guitarras</h1>
                <p className="ppal-text subtitle-text center">Encuentra las mejores guitarras al mejor precio</p>
            </div>

            <div className="home-products-section">
                <Products dato={dato} cart={cart} addCart={addCart} />
            </div>
        </section>
    )
}