import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function StarRating() {
    const [count, setCount] = useState(0);
    const [hcount, setHcount] = useState(0);

    // 1. Fetch fresh data when user types (Debounced)
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <div style={{}}>
            {[...Array(5)].map((_, index) => {
                let star_val = index + 1;
                return (
                    <span
                        key={index}
                        style={{
                            fontSize: '85px',
                            color: star_val <= (hcount || count) ? 'gold' : 'grey',
                        }}
                        onMouseEnter={() => setHcount(star_val)}
                        onMouseLeave={() => setHcount(0)}
                        onClick={() =>
                            setCount((prev) => (prev == index + 1 ? index : index + 1))
                        }
                    >
            &#9733;
          </span>
                );
            })}
        </div>
    );
}
