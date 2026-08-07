import React, { useState, useEffect } from 'react';

// Set default initial time here (e.g., 0 hours, 5 minutes, 0 seconds)
const INITIAL_HOURS = 0;
const INITIAL_MINUTES = 5;
const INITIAL_SECONDS = 0;

const INITIAL_TIME_IN_SECONDS =
    INITIAL_HOURS * 3600 + INITIAL_MINUTES * 60 + INITIAL_SECONDS;

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_IN_SECONDS);
    const [isRunning, setIsRunning] = useState(false);

    // Format total seconds into HH:MM:SS
    const formatTime = (totalSec) => {
        const hrs = Math.floor(totalSec / 3600);
        const mins = Math.floor((totalSec % 3600) / 60);
        const secs = totalSec % 60;

        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    };

    // Timer interval handling
    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning]);

    const handleStartPause = () => {
        if (timeLeft > 0) {
            setIsRunning((prev) => !prev);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(INITIAL_TIME_IN_SECONDS);
    };

    return (
        <div style={styles.container}>
            <h2>Countdown Timer</h2>

            {/* HH:MM:SS Display */}
            <div style={styles.display}>{formatTime(timeLeft)}</div>

            {/* Control Buttons */}
            <div style={styles.controls}>
                <button onClick={handleStartPause} style={styles.button}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={handleReset} style={styles.button}>
                    Reset
                </button>
            </div>
        </div>
    );
}

// Minimal, clean styles
const styles = {
    container: {
        fontFamily: 'sans-serif',
        textAlign: 'center',
        padding: '20px',
    },
    display: {
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: '20px 0',
    },
    controls: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
    button: {
        padding: '8px 16px',
        fontSize: '1rem',
        cursor: 'pointer',
    },
};
