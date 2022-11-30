import React from "react";
import Question from "./Question";

const Main = (props) => {
    const questionElements = props.questions.map(item => {
        const {id, question, choices} = item;

        return (
            <Question
                key={id}
                id={id}
                question={question}
                choices={choices}
                total={props.questions.length}
                isGameOver={props.isGameOver}
                handleSelectAnswer={props.handleSelectAnswer}
            />
        )
    })

    return (
        <main className="py-4">
            <div className="container">
                {props.isGameStarted && 
                <ul className="questions mb-3">
                    {questionElements}
                </ul>}
                <div className="text-center">
                    {props.isGameOver && <p><strong>You scored {props.score}/{props.questions.length} correct answers</strong></p>}
                    {props.isGameStarted && <button className="btn btn-lg btn-primary" onClick={props.isGameOver ? props.handleRestartGame : props.handleCheckAnswers} disabled={props.isDisabled}>{props.isGameOver ? "Play again" : "Check answers"}</button>}
                </div>
            </div>
        </main>
    );
}

export default Main;