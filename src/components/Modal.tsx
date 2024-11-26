import React, { FC, ReactNode } from "react";
import "@/app/App.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>

                <div className="modal-content">


                    {children}

                </div>
            </div>
        </div>
    );
};

export default Modal;
