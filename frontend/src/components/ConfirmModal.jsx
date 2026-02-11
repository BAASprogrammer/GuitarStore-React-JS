import React from 'react';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel, showButtons = true, showCloseButton = false, title = 'Importante', closeOnOverlay = true }) => {
    if (!isOpen) return null;
    
    return (
        <>
            <div className='confirm-overlay' onClick={closeOnOverlay ? (onCancel || (() => {})) : (() => {})}></div>
            <div className="confirm-modal">
                {showCloseButton && <button className='close-modal' onMouseDown={() => { console.log('close clicked'); (onCancel || (() => {}))(); }}>×</button>}
                <div className="modal-content">
                    <h1 className='modal-title'>{title}</h1>
                    <p>{message}</p>
                    {showButtons && (
                        <div className="button-container">
                            <button onClick={onCancel || (() => {})}>Cancelar</button>
                            <button onClick={onConfirm || (() => {})}>Confirmar</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ConfirmModal;