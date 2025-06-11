import React from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
    show: boolean;
    title?: string;
    msg?: string;
    btn?: string;
    onSubmit?: () => void;
    onClose?: () => void;
    children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ show, title, msg, btn, onSubmit, onClose, children }) => {
    if (!show) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            />
                        </div>

                        <div className="modal-body">
                            {msg && <p>{msg}</p>}
                            {children}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onClose}>
                                Cancel
                            </button>
                            {btn && (
                                <button type="button" className="btn btn-primary btn-sm" onClick={onSubmit}>
                                    {btn}
                                </button>
                            )}
                        </div>

                    </div>
                </div>

            </div>
            {/* backdrop */}
            <div className="modal-backdrop fade show" />
        </>,
        document.body
    );
};

export default Modal;
