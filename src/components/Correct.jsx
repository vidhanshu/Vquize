/* this component is to render the correct answeres */
import React from "react";
import style from "../styles/question.module.scss";
function Correct({ question, options, qno, selected, reset, correct }) {
  return (
    <div className={style.questionBox}>
      <div className={style.questionContainer}>
        <h3>
          {qno + 1}) {question}
        </h3>
      </div>
      {options.map((e, idx) => (
        <button key={idx} className={e === correct ? style.correct : null}>
          {e}
        </button>
      ))}
    </div>
  );
}

export default Correct;
