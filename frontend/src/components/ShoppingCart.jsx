import { useEffect, useState, useMemo } from 'react';
import useCurrency from '../hooks/useCurrency';
import ConfirmModal from './ConfirmModal';
import dataMessage from '../constants/messages';
import { getModalConfigs } from '../constants/cartModals';
import { MAX_QUANTITY } from '../constants/config';

export default function ShoppingCart({dataCart,deleteCart, emptyCart}){
    const [cantidad, setCantidad] = useState({})
    const [message,setMessage] = useState({})
    const [isOpenCart, setIsOpenCart] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(null)

    const formatCurrency = useCurrency()

    // Helper: get product name by id
    const getProductName = (id) => dataCart.find(item => String(item.id) === String(id))?.nombre || 'Producto';
    /* Logic to open and close the shopping cart modal */
    const handleCart = () => {
        setIsOpenCart(!isOpenCart);
    }
    /* Logic to empty the shopping cart and close the modal */
    const handleEmptyCart = () => {
        setMessage({ type: "emptyCart" });
    }
    
    /* Logic to update the quantity of products in the shopping cart when dataCart changes */
    useEffect(() => {
        setCantidad((prevCantidad)=> {
            // if the cart is empty, return an empty object
            if (dataCart.length === 0 ) {
                return {}
            }
            // use reduce to return the quantity from a copy of the previous quantity -> prevCantidad
            const newcantidad = dataCart.reduce((acc, item) => {
                if (acc[item.id] === undefined) {
                    acc[item.id] = 1
                }
                return acc
            },{...prevCantidad})
            return newcantidad
        })
    }, [dataCart]);


    // Decrease the quantity of a product added to the shopping cart
    const deleteProduct = (idproducto) => {
        setCantidad((prevCantidad) =>{
            const newcantidad = {...prevCantidad} // creates a copy of the original object
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
        setCantidad((prevCantidad)=>{
            const newcantidad = {...prevCantidad}
            if (newcantidad[idproducto] >= MAX_QUANTITY) {
                const productName = getProductName(idproducto);
                setMessage({ type: "max", productName });
                return prevCantidad; // Don't increase
            } else {
                newcantidad[idproducto] = (newcantidad[idproducto] || 0) + 1;
                return newcantidad;
            }
        })
    }
    // Logic that executes when the input value changes
    const handleChange = (event, id) =>{
        let eventvalue = /^0+$/.test(event.target.value) || event.target.value === "" ? 0 : parseInt(event.target.value)
        const newcantidad = {...cantidad}
        if (eventvalue > MAX_QUANTITY) {
            const productName = getProductName(id);
            setMessage({ type: "max", productName });
            newcantidad[id] = MAX_QUANTITY;
        } else if (eventvalue === 0) {
            newcantidad[id] = 1;
        } else {
            newcantidad[id] = eventvalue;
        }
        setCantidad(newcantidad)
    }

    // Logic to handle mouseover and mouseout events

    const handleMouseOverPayCart = () => {
        if (!message.type) {
            setMessage({ type: "pay" }); // Changes 'message' to indicate pay message only if no other modal is open
        }
    }

    const handleMouseOutPayCart = () => { 
        setMessage({}); // Clears the message
    }

    const confirmDeleteProduct = () => {
        deleteCart(confirmDelete);
        setCantidad((prevCantidad) => {
            const newcant = {...prevCantidad};
            delete newcant[confirmDelete];
            return newcant;
        });
        setConfirmDelete(null);
        setMessage({ type: "delete" }); // Show success message
        setIsOpenCart(false); // Close the shopping cart after deletion
    }

    const cancelDeleteProduct = () => {
        setConfirmDelete(null);
        setMessage({});
    }

    // Calculate total items in cart
    const totalCount = useMemo(() => dataCart.reduce((acc, item) => acc + (Number(cantidad[item.id]) || 1), 0), [dataCart, cantidad]);

    // Helper: formats the badge (shows "999+" if > 999)
    const formatBadgeCount = (count) => {
        if (count > 999) {
            return '999+';
        }
        return count;
    };

    // Modal configurations
    const modalConfigs = getModalConfigs(dataMessage, MAX_QUANTITY, message, cancelDeleteProduct, confirmDeleteProduct, setMessage, emptyCart, setIsOpenCart);

    return(<div className="right shoppingcart">
                {isOpenCart && <div className='overlay-shopping-cart' onClick={message.type ? () => {} : handleCart}></div>}
                {modalConfigs.map(config => {
                    const { key, ...configProps } = config;
                    return (
                        <ConfirmModal
                            key={key}
                            isOpen={message.type === config.type}
                            {...configProps}
                        />
                    );
                })}
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