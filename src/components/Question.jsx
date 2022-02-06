import React from "react";
import style from "../styles/question.module.scss";
function Question({ question, options, qno, selected, reset }) {
  const [answer, setAnswer] = React.useState(options); //to  hide and show the selected ans
  const [wasReset, setWasReset] =
    React.useState(false); /*to chekc if user has reseted the options before */
  const resetHandler = () => {
    setAnswer(options);
    reset("reseted");
  }; ///handles the reset button
  return (
    <div className={style.questionBox}>
      <div className={style.questionContainer}>
        <h3>
          {qno + 1}) {question}
        </h3>
        <button
          className={style.reset}
          onClick={() => {
            (!wasReset && options) !== answer
              ? resetHandler()
              : alert("already to the reset state!");
            setWasReset(true);
          }}
        >
          Reset
        </button>
      </div>
      {answer.map((e, idx) => (
        <button
          key={idx}
          onClick={() => {
            setAnswer([e]);
            selected(e);
            setWasReset(false);
          }}
        >
          {e}
        </button>
      ))}
    </div>
  );
}

export default Question;
