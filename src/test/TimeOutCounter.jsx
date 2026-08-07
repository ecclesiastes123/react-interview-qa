import React, { useState, useEffect } from 'react';

export default function App() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // If count is already 0, no need to set a timer
        if (count === 0) return;

        // Start a 3-second timer whenever count changes and is not 0
        const timer = setTimeout(() => {
            setCount(0);
        }, 3000);

        // Cleanup: Resets the 3-second timer if the user clicks again before 3s is up
        return () => clearTimeout(timer);
    }, [count]);

    return (
        <div style={main}>
            <h1>{count}</h1>
            <div style={counterBtn}>
                <button
                    disabled={count <= 0}
                    onClick={() => setCount((prev) => prev - 1)}
                >
                    -
                </button>
                <button onClick={() => setCount((prev) => prev + 1)}>+</button>
            </div>
        </div>
    );
}

const counterBtn = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
};

const main = {
    ...counterBtn,
    flexDirection: 'column',
};
