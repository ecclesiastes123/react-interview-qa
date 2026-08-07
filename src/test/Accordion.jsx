import React, { useState } from 'react';

const defaultItems = [
    {
        id: '1',
        title: 'What is React?',
        content: 'React is a JavaScript library for building user interfaces.',
    },
    {
        id: '2',
        title: 'Why use an Accordion?',
        content: 'Accordions toggle visibility of content in a compact layout.',
    },
];

export default function Accordion({
                                      items = defaultItems,
                                      allowMultiple = false,
                                  }) {
    // Store an array of IDs instead of a single ID
    const [openIds, setOpenIds] = useState([]);

    const handleToggle = (id) => {
        if (allowMultiple) {
            setOpenIds((prev) =>
                prev.includes(id)
                    ? prev.filter((openId) => openId !== id)
                    : [...prev, id]
            );
        } else {
            // Fallback for single-open mode
            setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
        }
    };

    return (
        <div style={styles.container}>
            {items.map((item) => {
                const isOpen = openIds.includes(item.id);

                return (
                    <div key={item.id} style={styles.accordionItem}>
                        <button
                            onClick={() => handleToggle(item.id)}
                            style={styles.header}
                            aria-expanded={isOpen}
                        >
                            <span>{item.title}</span>
                            <span>{isOpen ? '−' : '+'}</span>
                        </button>

                        {/* Smooth transition container */}
                        <div
                            style={{
                                ...styles.contentWrapper,
                                gridTemplateRows: isOpen ? '1fr' : '0fr',
                            }}
                        >
                            <div style={styles.contentInner}>
                                <div style={styles.content}>{item.content}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '500px',
        margin: '2rem auto',
        fontFamily: 'sans-serif',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    accordionItem: {
        borderBottom: '1px solid #e5e7eb',
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: '#f9fafb',
        border: 'none',
        fontWeight: '600',
        cursor: 'pointer',
    },
    contentWrapper: {
        display: 'grid',
        transition: 'grid-template-rows 300ms ease-in-out',
    },
    contentInner: {
        overflow: 'hidden',
    },
    content: {
        padding: '1rem',
        backgroundColor: '#ffffff',
        color: '#374151',
        lineHeight: '1.5',
    },
};
