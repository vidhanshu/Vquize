import React, { useEffect } from "react";
import style from "../styles/Home.module.scss";
import quize from "../api/quize";
import Question from "./Question";
import logo from "../components/img";
import Correct from "./Correct";
function Home() {
  /* this all are the states which tell about the state of the application */
  const [questionBank, setQuestionBank] = React.useState(
    []
  ); /* this will have the actual questions */
  const [score, setScore] = React.useState(0); /* this will store the score */
  const [responses, setResponses] =
    React.useState(
      0
    ); /* this will store the number of responses or the questions which aree attempted till ye */
  const [wasCorrect, setWasCorrect] =
    React.useState(
      false
    ); /*  this for actually reset button defined in question component in order to check if we have to decrease the score by one or not aafter reset */
  const [submitted, setSubmitted] =
    React.useState(
      false
    ); /* this check if the quize is submitted or not if submitted then submit button will be hidden else it will be shown */
  const [seeAns, setSeeAns] =
    React.useState(
      false
    ); /* this state is to check if user has pressed see answer button or not */
  /* beggining */
  const getQuestions = () => {
    /* this function actually set the state to the 5 random questions */
    quize().then((question) => {
      setQuestionBank(question);
    });
  };
  /* check if the ansswer of the user is correct */
  const selectedOpt = (answer, correct) => {
    console.log(answer, correct, score);
    if (answer === correct) {
      setScore((pre) => pre + 1); /*  if correct score incremented */
      setWasCorrect(
        true
      ); /* ans the flag which is for reset button is set to true */
    } else {
      setWasCorrect(false); /* else flag set to false */
    }
    setResponses(
      (pre) => pre + 1
    ); /* response will ge incremented by one each time */
  };
  /* this is to reset the options  back to normal */
  const ResetOpt = (text) => {
    // console.log(text);
    if (wasCorrect) {
      setScore((pre) => pre - 1);
    }
    setResponses((pre) => pre - 1);
  };

  /* this will handle the submit button */
  /* if user tries to submit before attempting all the questions */
  const submitHandler = () => {
    if (responses < 5) {
      alert("please attempt all questions!");
      return;
    }
    setSubmitted(true);
  };

  /* resetting all the states */
  const replayHandler = () => {
    setScore(0);
    setResponses(0);
    setWasCorrect(false);
    setSubmitted(false);
    getQuestions();
    setSeeAns(false);
  };
  /* see answer state managing function */
  const seeAnserHandler = () => {
    console.log("apple");
    setSeeAns(true);
  };

  /* to fetch and set the 5 randome question first time */
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <img src={logo} alt="" />
      </div>
      <div className={style.questions}>
        {
          questionBank.length > 0 && !submitted ? (
            questionBank.map(
              ({ question, answers, questionId, correct }, idx) => (
                <Question
                  qno={idx}
                  question={question}
                  options={answers}
                  key={questionId}
                  reset={(text) => ResetOpt(text)}
                  selected={(answer) => selectedOpt(answer, correct)}
                />
              )
            )
          ) : !seeAns /* this is to check if user has pressed see ans button or not  */ ? (
            <div className={style.scoreContainer}>
              <h1 className={style.score}>
                You scored {score}/5, <br />
                {score < 3
                  ? `Better luck for next time 🥲`
                  : score === 5
                  ? `Congo 🥳🥳, You made it! ✨😮`
                  : `Close to success! 😀`}
              </h1>
            </div>
          ) : (
            /* if user has no pressed see answer */
            questionBank.map(
              ({ question, answers, questionId, correct }, idx) => (
                <Correct
                  qno={idx}
                  question={question}
                  options={answers}
                  key={questionId}
                  correct={correct}
                />
              )
            )
          ) /* if user has pressed see answer */
        }

        {!submitted /* this is to check if user hasa pressed submit button or not */ ? (
          <button
            className={style.submit}
            onClick={() => {
              submitHandler();
            }}
          >
            submit
          </button> /* this will render if user has not been submitted */
        ) : (
          <div>
            <button className={style.replay} onClick={replayHandler}>
              Replay
            </button>
            {!seeAns ? (
              <button className={style.replay} onClick={seeAnserHandler}>
                See Answers
              </button>
            ) : null}
          </div> /*else this will get rendered */
        )}
      </div>
    </div>
  );
}

export default Home;
