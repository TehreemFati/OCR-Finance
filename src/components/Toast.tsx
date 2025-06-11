import { useEffect, useState } from 'react';

const Toast = ({ message, duration = 3000 }: { message: string; duration?: number }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!show) return null;

    return (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
            <div className="toast show align-items-center text-bg-danger border-0">
                <div className="d-flex">
                    <div className="toast-body">{message}</div>
                </div>
            </div>
        </div>
    );
};

export default Toast;
