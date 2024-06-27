import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();

  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  let playButton;
  let activeText;

  if (timerIsActive) {
    playButton = <button onClick={handleStop}>Stop Timer</button>;
    activeText = <p className={"active"}>Timer is running...</p>;
  } else {
    playButton = <button onClick={handleStart}>Start Challenge</button>;
    activeText = <p>Timer is inactive...</p>;
  }

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime}
          {targetTime > 1 ? " seconds" : " second"}
        </p>
        <p>{playButton}</p>
        {activeText}
      </section>
    </>
  );
}
