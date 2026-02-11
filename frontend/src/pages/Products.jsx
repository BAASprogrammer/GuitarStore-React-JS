import { useState } from "react";
import useCurrency from '../hooks/useCurrency';

export default function Products({dato, addCart, cart}){
    const [filterCategory, setFilterCategory] = useState('todas');    
    const filteredData = filterCategory === 'todas' ? dato : dato.filter(item => item.categoria.toLowerCase().includes(filterCategory.toLowerCase()));
    
    // Filtered data to display
    const dataToShow = filteredData; 
    const formatCurrency = useCurrency(); 
    
    const handleAddCart = (item) =>{
        const existingProducts = cart.some((product) => product.id === item.id) //some devuelve true cuando se cumple la condicion
        if (!existingProducts) {
            addCart(item)
        }
    }
    return(
        <section id="products" className="products-section">
            <div className="ppal-text center">
                <h1 className="our-collection">Nuestra <span className="collection-txt">Colección</span></h1>
            </div>
            <div className="categories-container">
                <div className="category-all-container center">
                    <button className={`category-button category-all-button ${filterCategory === 'todas' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setFilterCategory('todas');}}>Todas</button>
                </div>
                <div className="categories-buttons-container flex justify-center align-center gap-2 flex-wrap">
                    <button className={`category-button pointer ${filterCategory === 'clásica' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setFilterCategory('clásica');}}>Clásica</button>
                    <button className={`category-button pointer ${filterCategory === 'acústica' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setFilterCategory('acústica');}}>Acústica</button>
                    <button className={`category-button pointer ${filterCategory === 'eléctrica' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setFilterCategory('eléctrica');}}>Eléctrica</button>
                    <button className={`category-button pointer ${filterCategory === 'bajo' ? 'active' : ''}`} onClick={(e) => {e.preventDefault(); setFilterCategory('bajo');}}>Bajo</button> 
                </div>
            </div>
            <div className="menu-container grid">
                {dataToShow.map((item, index) => (
                    <div className="grid-item" key={index}>   
                        <div className="product-container">
                            <div className="product-img"><span className="category">{item.categoria}</span><img src={require(`../assets/images/products/${item.imagen}`)} alt="Guitarra"></img></div>
                            <div className="product-data"><p className="product-name font-weight-800">{item.nombre}</p>
                                <p className="product-value">{formatCurrency(item.precio)}</p>
                                <button className="add-cart-button" title="Agregar producto al carro de compras" disabled = {cart.some((dataToShow) => dataToShow.id === item.id)} onClick={() => handleAddCart(item)}>
                                    {cart.some((dataToShow) => dataToShow.id === item.id) ? 'Producto agregado':'Agregar al carrito'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}