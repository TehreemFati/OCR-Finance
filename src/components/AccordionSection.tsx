import React from 'react';

interface AccordionSectionProps {
    id: string;
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ id, title, isOpen, onToggle, children }) => (
    <div className="accordion-item">
        <h2 className="accordion-header" id={`heading-${id}`}>
            <button
                className={`accordion-button ${!isOpen ? 'collapsed' : ''}`}
                type="button"
                onClick={onToggle}
            >
                {title}
            </button>
        </h2>
        <div
            id={`collapse-${id}`}
            className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
            aria-labelledby={`heading-${id}`}
        >
            <div className="accordion-body">{children}</div>
        </div>
    </div>
);

export default AccordionSection;
