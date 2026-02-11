import { useEffect, useState } from 'react';
import useCurrency from '../hooks/useCurrency';
import ConfirmModal from './ConfirmModal';
import dataMessage from '../constants/messages';

export default function ShoppingCart({dataCart,deleteCart, emptyCart}){
    const [cantidad, setCantidad] = useState({})
    const [message,setMessage] = useState({})
    const [isOpenCart, setIsOpenCart] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(null)
    const formatCurrency = useCurrency()
    /* Logic to open and close the shopping cart modal */
    const handleCart = () => {
        setIsOpenCart(!isOpenCart);
    }
    /* Logic to empty the shopping cart and close the modal */
    const handleEmptyCart = () => {
        emptyCart();
        setIsOpenCart(false);
    }
    
    /* Logic to update the quantity of products in the shopping cart when dataCart changes */
    useEffect(() => {
        setCantidad((prevcantidad)=> {
            // if the cart is empty, return an empty object
            if (dataCart.length === 0 ) {
                return {}
            }
            // use reduce to return the quantity from a copy of the previous quantity -> prevcantidad
            const newcantidad = dataCart.reduce((acc, item) => {
                if (acc[item.id] === undefined) {
                    acc[item.id] = 1
                }
                return acc
            },{...prevcantidad})
            return newcantidad
        })
    }, [dataCart]);

    // Decrease the quantity of a product added to the shopping cart
    const deleteProduct = (idproducto) => {
        setCantidad((prevcantidad) =>{
            const newcantidad = {...prevcantidad} // creates a copy of the original object
            if(newcantidad[idproducto] > 1) {
                newcantidad[idproducto] -= 1 
            } else if(newcantidad[idproducto] === 1) {
                setConfirmDelete(idproducto);
                setMessage({ type: "todelete" });
            }
            return newcantidad
        })
    }
    // Increase the quantity of a product added to the shopping cart
    const addProduct = (idproducto) => {
        setCantidad((prevcantidad)=>{
            const newcantidad = {...prevcantidad}
            if (newcantidad[idproducto] >= 10) {
                setMessage({ type: "max" });
                return prevcantidad; // Don't increase
            } else {
                newcantidad[idproducto] = (newcantidad[idproducto] || 0) + 1;
                return newcantidad;
            }
        })
    }
    // Logic that executes when the input value changes
    const handleChange = (event, id) =>{
        let eventvalue = /^0+$/.test(event.target.value) || event.target.value === "" ? 0 : parseInt(event.target.value)
        const newcantidad = {...cantidad, [id]: eventvalue}
        if (newcantidad[id] === 0) {
            newcantidad[id] = 1
        }
        setCantidad(newcantidad)
        // no return necessary because we don't need to return any value to use
        // return newcantidad
    }

    // Logic to handle mouseover and mouseout events

    const handleMouseOverPayCart = () => {
        setMessage({ type: "pay" }); // Changes 'message' to indicate pay message
    }

    const handleMouseOutPayCart = () => { 
        setMessage({}); // Clears the message
    }

    const confirmDeleteProduct = () => {
        deleteCart(confirmDelete);
        setCantidad((prev) => {
            const newcant = {...prev};
            delete newcant[confirmDelete];
            return newcant;
        });
        setConfirmDelete(null);
        setMessage({ type: "delete" }); // Show success message
    }

    const cancelDeleteProduct = () => {
        setConfirmDelete(null);
        setMessage({});
    }

    // Calculate total items in cart
    const totalCount = dataCart.reduce((acc, item) => acc + (Number(cantidad[item.id]) || 1), 0);

    // Helper: formats the badge (shows "999+" if > 999)
    const formatBadgeCount = (count) => {
        return count > 999 ? '999+' : count;
    };

    return(<div className="right shoppingcart">
                {isOpenCart && <div className='overlay-shopping-cart' onClick={handleCart}></div>}
                <ConfirmModal
                    key="todelete"
                    isOpen={message.type === "todelete"}
                    message={dataMessage.todelete.message}
                    onConfirm={confirmDeleteProduct}
                    onCancel={cancelDeleteProduct}
                    showCloseButton={true}
                    title={dataMessage.todelete.title}
                    closeOnOverlay={false}
                />
                <ConfirmModal
                    key="delete"
                    isOpen={message.type === "delete"}
                    message={dataMessage.delete.message}
                    showButtons={false}
                    onCancel={cancelDeleteProduct}
                    title={dataMessage.delete.title}
                />
                <ConfirmModal
                    key="max"
                    isOpen={message.type === "max"}
                    message={dataMessage.max.message}
                    showButtons={false}
                    onCancel={cancelDeleteProduct}
                    showCloseButton={true}
                    title={dataMessage.max.title}                    
                    closeOnOverlay={false}   
                />
                <div className="container-shoppingcart center">
                    <button className='button-shoppingcart' title='Carrito de compras'>
                        <img className="header-img pointer img-shoppingcart" src={require('../assets/images/header/carro.png')} alt="Carrito" width={20} onClick={handleCart}></img>
                    {/* Badge with quantity */}
                    {totalCount > 0 && (
                        <span className="cart-badge" aria-live="polite" title={`${totalCount} producto(s) en carrito`}>
                            {formatBadgeCount(totalCount)}
                        </span>
                    )}
                    </button>
                    {dataCart.length !== 0 ? (
                    <div className={`modal-shoppingcart ${isOpenCart ? 'data-shoppingcart' : 'closed-shoppingcart'} right`}>
                        <span className='close-shopping-cart' onClick={handleCart}>x</span>
                        <div className="status-shoppingcart center">
                            <h3>Productos <span>Carro</span></h3>
                        </div>
                        <div className="contenedor-modal center">
                            <div className="grid modal-row header">
                                <div className="grid-item-modal font-weight-800"><label>Imagen</label></div>
                                <div className="grid-item-modal font-weight-800"><label>Nombre</label></div>
                                <div className="grid-item-modal font-weight-800"><label>Precio</label></div>
                                <div className="grid-item-modal font-weight-800"><label>Cantidad</label></div>
                            </div>
                            <div>
                                {dataCart && (
                                    <div>
                                        <div className='product-data-container'>
                                            {dataCart.map((item) => (
                                                <div key={item.id} className="grid modal-row">
                                                    <div className="grid-item-modal"><img src={require(`../assets/images/products/${item.imagen}`)} alt="Guitarra"></img></div>
                                                    <div className="grid-item-modal"><label title={item.nombre}>{item.nombre}</label></div>
                                                    <div className="grid-item-modal"><label>{formatCurrency(item.precio)}</label></div>
                                                    <div className="grid-item-modal">
                                                        <div className='flex justify-center align-center gap-1 quantity-container'>
                                                            <button className="add-del-cart" onClick={() => deleteProduct(item.id)} title='Disminuir cantidad'>-</button>
                                                            <input className='quantity-cart' value={cantidad[item.id] || 1} onChange={(e)=>handleChange(e, item.id)}></input>
                                                            <button className="add-del-cart" onClick={() => addProduct(item.id)} title='Aumentar cantidad'>+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <div className="grid modal-row footer">
                                                <div className="grid-item-modal right" >
                                                    Total a pagar : {formatCurrency(dataCart.reduce((acc, item) => acc + (item.precio * (cantidad[item.id] || 1)), 0))}
                                                </div>
                                                {dataCart.length !== 0 &&(
                                                    <div>
                                                        <button className="grid-item-modal center empty-cart-button" title='Vaciar productos del carro de compras' width="180" onClick={handleEmptyCart}>Vaciar carrito</button>
                                                        {message.type === "pay" && ( <div className='pay-message'>{dataMessage[message.type].message}  </div>)}
                                                        <button className="grid-item-modal center pay-cart-button" title='Realizar pago de los productos' width="180" onMouseOver={handleMouseOverPayCart} onMouseOut={handleMouseOutPayCart}>Pagar</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className={`modal-shoppingcart status-shoppingcart empty-shoppingcart center ${isOpenCart ? 'data-shoppingcart' : 'closed-shoppingcart'}`}>
                            <span className='close-shopping-cart' onClick={handleCart}>x</span>
                            <h3>El carrito está vacío</h3>
                        </div>
                    )}
                </div>
            </div>
        )
}