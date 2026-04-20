export default function CartFooter({
    totalPrice,
    formatCurrency,
    handleEmptyCart,
    message,
    dataMessage,
    handleMouseOverPayCart,
    handleMouseOutPayCart,
    handlePay
}) {
    return (
        <div className="grid modal-row footer">
            <div className="grid-item-modal right">
                Total a pagar : {formatCurrency(totalPrice)}
            </div>
            <div className="cart-buttons-group">
                <button
                    className="empty-cart-button"
                    title='Vaciar productos del carro de compras'
                    onClick={handleEmptyCart}
                >
                    Vaciar carrito
                </button>
                <div className="position-relative w-full">
                    {message.type === "pay" && (
                        <div className='pay-message'>{dataMessage[message.type].message}</div>
                    )}
                    <button
                        className="pay-cart-button"
                        title='Realizar pago de los productos'
                        onMouseOver={handleMouseOverPayCart}
                        onMouseOut={handleMouseOutPayCart}
                        disabled={totalPrice === 0}
                        onClick={handlePay}
                    >
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    );
}