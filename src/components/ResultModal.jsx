import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onRestart },
  ref
) {
  const playerLost = remainingTime <= 0;
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onRestart}>
      {playerLost ? <h2>You Lost.</h2> : <h2>Your Score: {score}</h2>}
      <p>
        The target time was{" "}
        <strong>
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </strong>
      </p>
      <p>
        You stop the timer with{" "}
        <strong>{(remainingTime / 1000).toFixed(2)} seconds left</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  ,document.getElementById('modal'));
});
export default ResultModal;
