import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function App() {
    const [count, setCount] = useState(0);

    // 1. Fetch fresh data when user types (Debounced)
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <div
            style={{
                width: '555px',
                height: '20px',
                backgroundColor: 'lightgrey',
                borderRadius: '15px',
                transition: 'width 1s ease-in-out',
            }}
        >
            <div
                style={{
                    width: `${count}%`,
                    height: '20px',
                    backgroundColor: 'green',
                    borderRadius: '15px',
                    transition: 'width .5s ease-in-out',
                }}
            ></div>
            <div style={{ padding: '15px' }}>
                <button
                    onClick={() => setCount((prev) => prev - 10)}
                    disabled={count < 1}
                >
                    -
                </button>
                <button
                    onClick={() => setCount((prev) => prev + 10)}
                    disabled={count >= 100}
                >
                    +
                </button>
            </div>
        </div>
    );
}
