import React, { useState, useEffect, useRef } from 'react';

export default function Opt() {
    const length = 6;
    const [val, setVal] = useState(new Array(length).fill(''));
    const inputRef = useRef([]);

    // Auto-focus the first input on component mount
    useEffect(() => {
        if (inputRef.current[0]) {
            inputRef.current[0].focus();
        }
    }, []);

    // 1. Handles normal alphanumeric typing
    function handleVal(index, e) {
        const value = e.target.value;

        // Take only the last character typed (handles overwriting existing digits)
        const lastChar = value.substring(value.length - 1);

        const nextState = [...val];
        nextState[index] = lastChar;
        setVal(nextState);

        // If user typed a value, auto-focus the next input box
        if (lastChar && index < length - 1) {
            inputRef.current[index + 1].focus();
        }
    }

    // 2. Handles Backspace navigation
    function handleKeyDown(index, e) {
        if (e.key === 'Backspace') {
            // If the current input is already empty, move focus to the previous box and clear it
            if (!val[index] && index > 0) {
                const nextState = [...val];
                nextState[index - 1] = ''; // Optional: clear previous box right away
                setVal(nextState);
                inputRef.current[index - 1].focus();
            }
        }
    }

    // 3. Handles pasting a full 6-digit OTP code (e.g. "123456")
    function handlePaste(e) {
        // We must stop the browser from dumping the whole 6-digit text string into a single active box so we can distribute it across all inputs manually.
        e.preventDefault(); // Stop default single-box paste behavior
        const pastedData = e.clipboardData.getData('text').trim();

        // Ensure we only process digits and match the specified length
        if (/^\d+$/.test(pastedData)) {
            const pasteValues = pastedData.slice(0, length).split('');

            // Pad out remaining slots with empty strings if pasted code is too short
            const nextState = [...val];
            for (let i = 0; i < length; i++) {
                nextState[i] = pasteValues[i] || '';
            }
            setVal(nextState);

            // Focus the last filled input slot or the very last box
            const focusIndex = Math.min(pasteValues.length, length - 1);
            inputRef.current[focusIndex].focus();
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '50px',
            }}
        >
            {val.map((digit, index) => {
                return (
                    <input
                        key={index}
                        style={{
                            width: '60px',
                            height: '60px',
                            fontSize: '32px',
                            borderRadius: '10px',
                            border: '2px solid #ccc',
                            textAlign: 'center',
                        }}
                        type="text"
                        value={digit}
                        ref={(el) => (inputRef.current[index] = el)}
                        onChange={(e) => handleVal(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                    />
                );
            })}
        </div>
    );
}
