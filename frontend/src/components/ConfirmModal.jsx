const ConfirmModal = ({ isOpen, message, onConfirm, onCancel, showButtons = true, showCloseButton = false, title = 'Importante', closeOnOverlay = true, confirmText = 'Confirmar', cancelText = 'Cancelar', showCancelButton = true }) => {
    if (!isOpen) return null;
    
    return (
        <>
            <div className='confirm-overlay' onClick={closeOnOverlay ? (onCancel || (() => {})) : (() => {})}></div>
            <div className="confirm-modal">
                {showCloseButton &&  
                    <div className='modal-title-closebtn-container'>
                        <h1 className='modal-title'>{title}</h1>
                        <button className='close-modal' title='Cerrar modal' onClick={onCancel || (() => {})}>×</button>
                    </div>
                }
                <div className="modal-content">
                    <p dangerouslySetInnerHTML={{ __html: message }}></p>
                    {showButtons && (
                        <div className="button-container">
                            {showCancelButton && <button onClick={onCancel || (() => {})}>{cancelText}</button>}
                            <button onClick={onConfirm || (() => {})}>{confirmText}</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ConfirmModal;