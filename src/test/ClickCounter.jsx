import React, { useState, useRef, useEffect } from 'react';

export default function ClickCounter() {
    const [count, setCount] = useState(0);

    // Store timer ID in a ref so it persists across re-renders without causing new renders
    const timerRef = useRef(null);

    const handleClick = () => {
        // Functional state update ensures freshest state value
        setCount((prevCount) => prevCount + 1);

        // Start 3-second timer on the first click in the window
        if (!timerRef.current) {
            timerRef.current = setTimeout(() => {
                setCount(0);
                timerRef.current = null; // Reset ref
            }, 3000);
        }
    };

    // Clean up timer on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1>Count: {count}</h1>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}
