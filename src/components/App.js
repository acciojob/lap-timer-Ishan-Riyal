import React, { useState, useEffect, useRef } from "react";
import "./../styles/App.css";

const App = () => {
  const [time, setTime] = useState(0); // in centiseconds
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  // Format time (MM:SS:CC)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;
    return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  };

  const pad = (num) => num.toString().padStart(2, "0");

  // Start Timer
  const handleStart = () => {
    if (!running) {
      setRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    }
  };

  // Stop Timer
  const handleStop = () => {
    if (running) {
      clearInterval(timerRef.current);
      setRunning(false);
    }
  };

  // Record Lap
  const handleLap = () => {
    if (running) {
      setLaps((prev) => [...prev, time]);
    }
  };

  // Reset Timer
  const handleReset = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div>
      {/* Do not remove the main div */}
      <h1 className="title">Lap Timer</h1>

      <div className="timer-display">{formatTime(time)}</div>

      <div className="controls">
        <button onClick={handleStart} disabled={running}>
          Start
        </button>
        <button onClick={handleStop} disabled={!running}>
          Stop
        </button>
        <button onClick={handleLap} disabled={!running}>
          Lap
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <ul className="laps">
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {index + 1}: {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
