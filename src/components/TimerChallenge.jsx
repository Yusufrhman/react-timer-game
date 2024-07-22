import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
  const timerStarted = remainingTime > 0 && remainingTime < targetTime * 1000;
  if (remainingTime <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);
  }
  function handleRestart() {
    setRemainingTime(targetTime * 1000);
  }
  function handleStop() {
    dialog.current.open();

    clearInterval(timer.current);
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={remainingTime}
        onRestart={handleRestart}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : ""}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
