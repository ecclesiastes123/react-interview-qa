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
        let data = e.target.value;
        if (isNaN(data)) return;
        let newVal = [...val];
        newVal[index] = data;
        setVal(newVal);

        if(index < length-1 && data) {
            inputRef.current[index+1].focus();
        }

    }

    // 2. Handles Backspace navigation
    function handleKeyDown(index, e) {
        if(e.key == 'Backspace') {
            let newVal = [...val];
            if(!val[index] && index > 0) {
                newVal[index - 1] = '';
                setVal(newVal);
                inputRef.current[index - 1].focus();
            }
        }
    }

    // 3. Handles pasting a full 6-digit OTP code (e.g. "123456")
    function handlePaste(e) {
        e.preventDefault();

        let values = e.clipboardData.getData('text').trim()

        if(/^\d+$/.test(values)) {
            let pasteData = values.split('');
            let newVal = [...val];
            for (let i=0; i < pasteData.length; i++) {
                newVal[i] = pasteData[i] || '';
            }
            setVal(newVal);

           let foucsindex = Math.min(pasteData.length, length - 1);
            inputRef.current[foucsindex].focus();

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
                        maxLength={1}
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
