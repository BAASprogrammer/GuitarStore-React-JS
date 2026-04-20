import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useCurrency from '../hooks/useCurrency';
import ConfirmModal from './ConfirmModal';
import CartItem from './cart/CartItem';
import CartHeader from './cart/CartHeader';
import CartFooter from './cart/CartFooter';
import EmptyCart from './cart/EmptyCart';
import dataMessage from '../constants/messages';
import { getModalConfigs } from '../constants/cartModals';

const MAX_QUANTITY = 10;

export default function ShoppingCart({ dataCart, deleteCart, emptyCart }) {
    const [cantidad, setCantidad] = useState({})
    const [message, setMessage] = useState({})
    const [isOpenCart, setIsOpenCart] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(null)

    const navigate = useNavigate();
    const formatCurrency = useCurrency()

    // Helper: get product name by id
    const getProductName = useCallback((id) => dataCart.find(item => String(item.id) === String(id))?.nombre || 'Producto', [dataCart]);
    /* Logic to open and close the shopping cart modal */
    const handleCart = useCallback(() => {
        setIsOpenCart(i => !i);
    }, []);
    /* Logic to empty the shopping cart and close the modal */
    const handleEmptyCart = useCallback(() => {
        setMessage({ type: "emptyCart" });
    }, []);

    /* Logic to initiate the payment process — navigate to checkout with cart + quantities */
    const handlePay = useCallback(() => {
        const cartWithQty = dataCart.map(item => ({
            ...item,
            cantidad: cantidad[item.id] || 1
        }));
        setIsOpenCart(false);
        navigate('/checkout', { state: { cart: cartWithQty } });
    }, [dataCart, cantidad, navigate]);

    /* Logic to update the quantity of products in the shopping cart when dataCart changes */
    useEffect(() => {
        setCantidad((prevCantidad) => {
            // if the cart is empty, return an empty object
            if (dataCart.length === 0) {
                return {}
            }
            // use reduce to return the quantity from a copy of the previous quantity -> prevCantidad
            const newcantidad = dataCart.reduce((acc, item) => {
                if (acc[item.id] === undefined) {
                    acc[item.id] = 1
                }
                return acc
            }, { ...prevCantidad })
            return newcantidad
        })
    }, [dataCart]);


    // Decrease the quantity of a product added to the shopping cart
    const deleteProduct = useCallback((idproducto) => {
        setCantidad((prevCantidad) => {
            const newcantidad = { ...prevCantidad } // creates a copy of the original object
            if (newcantidad[idproducto] > 1) {
                newcantidad[idproducto] -= 1
            } else if (newcantidad[idproducto] === 1) {
                setConfirmDelete(idproducto);
                setMessage({ type: "todelete" });
            }
            return newcantidad
        })
    }, []);
    // Increase the quantity of a product added to the shopping cart
    const addProduct = useCallback((idproducto) => {
        setCantidad((prevCantidad) => {
            const newcantidad = { ...prevCantidad }
            if (newcantidad[idproducto] >= MAX_QUANTITY) {
                const productName = getProductName(idproducto);
                setMessage({ type: "max", productName });
                return prevCantidad; // Don't increase
            } else {
                newcantidad[idproducto] = (newcantidad[idproducto] || 0) + 1;
                return newcantidad;
            }
        })
    }, [getProductName]);
    // Logic that executes when the input value changes
    const handleChange = useCallback((event, id) => {
        let eventvalue = /^0+$/.test(event.target.value) || event.target.value === "" ? 0 : parseInt(event.target.value)
        const newcantidad = { ...cantidad }
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
    }, [cantidad, getProductName]);

    // Logic to handle mouseover and mouseout events

    const handleMouseOverPayCart = useCallback(() => {
        if (!message.type) {
            setMessage({ type: "pay" }); // Changes 'message' to indicate pay message only if no other modal is open
        }
    }, [message.type]);

    const handleMouseOutPayCart = useCallback(() => {
        setMessage((prev) => prev.type === "pay" ? {} : prev); // Clears the message only if it's the pay tooltip
    }, []);

    const confirmDeleteProduct = useCallback(() => {
        deleteCart(confirmDelete);
        setCantidad((prevCantidad) => {
            const newcant = { ...prevCantidad };
            delete newcant[confirmDelete];
            return newcant;
        });
        setConfirmDelete(null);
        setMessage({ type: "delete" }); // Show success message
        setIsOpenCart(false); // Close the shopping cart after deletion
    }, [confirmDelete, deleteCart]);

    const cancelDeleteProduct = useCallback(() => {
        setConfirmDelete(null);
        setMessage({});
    }, []);


    // Calculate total items in cart
    const totalCount = useMemo(() => dataCart.reduce((acc, item) => acc + (Number(cantidad[item.id]) || 1), 0), [dataCart, cantidad]);

    // Calculate total price in cart
    const totalPrice = useMemo(() => dataCart.reduce((acc, item) => acc + (item.precio * (cantidad[item.id] || 1)), 0), [dataCart, cantidad]);

    // Helper: formats the badge (shows "999+" if > 999)
    const formatBadgeCount = (count) => {
        if (count > 999) {
            return '999+';
        }
        return count;
    };

    // Modal configurations
    const modalConfigs = getModalConfigs(dataMessage, MAX_QUANTITY, message, cancelDeleteProduct, confirmDeleteProduct, setMessage, emptyCart, setIsOpenCart);

    return (<div className="right shoppingcart">
        {isOpenCart && <div className='overlay-shopping-cart' onClick={() => { }}></div>}
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
                    <span className='close-shopping-cart' onClick={handleCart}>&times;</span>
                    <div className="status-shoppingcart center">
                        <h3>Productos <span>Carro</span></h3>
                    </div>
                    <div className="contenedor-modal center">
                        <CartHeader />
                        <div>
                            {dataCart && (
                                <div>
                                    <div className='product-data-container'>
                                        {dataCart.map((item) => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                cantidad={cantidad}
                                                addProduct={addProduct}
                                                deleteProduct={deleteProduct}
                                                handleChange={handleChange}
                                                formatCurrency={formatCurrency}
                                            />
                                        ))}
                                    </div>
                                    <div>
                                        <CartFooter
                                            totalPrice={totalPrice}
                                            formatCurrency={formatCurrency}
                                            handleEmptyCart={handleEmptyCart}
                                            message={message}
                                            dataMessage={dataMessage}
                                            handleMouseOverPayCart={handleMouseOverPayCart}
                                            handleMouseOutPayCart={handleMouseOutPayCart}
                                            handlePay={handlePay}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <EmptyCart isOpenCart={isOpenCart} handleCart={handleCart} />
            )}
        </div>
    </div>
    )
}