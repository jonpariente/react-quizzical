import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const App = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [data, setData] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [score, setScore] = useState(0);

    const handleStartQuizz = () => {
        getData();
        setIsGameStarted(true);
    }

    /* const getData = async () => {
        const url = 'https://opentdb.com/api.php?amount=2';
        
        return (
            fetch(url)
                .then(response => response.json())
                .then(data => setData(data.results))
        );
    } */
   


    const getData = async () => {
        let id = 0;

        const url = 'https://opentdb.com/api.php?amount=10';
        const response = await fetch(url);
        const data = await response.json();

        setData(data.results);

        const getQuestions = data.results.map((question, index) => {
            const choices = [question.correct_answer, ...question.incorrect_answers];
            choices.sort((a, b) => a.localeCompare(b));

            return {
                id: index,
                question: question.question,
                answer: question.correct_answer,
                choices: choices.map(answer => (
                    {
                        id: id++,
                        name: index,
                        answer: answer
                    }
                ))
            }
        })

        setQuestions(getQuestions);
    }

    const handleSelectAnswer = (questionId, answerId) => {
        setQuestions(prevQuestion => prevQuestion.map(question => {
            return question.id === questionId
                ? {
                    ...question,
                    choices: question.choices.map(answer => {
                        return answerId === answer.id
                            ? {...answer, isChecked: true}
                            : {...answer, isChecked: false}
                    })
                }
                : question
        }))
    }

    const handleCheckAnswers = () => {
        setQuestions(prevQuestion => prevQuestion.map(question => {
            const correctAnswer = question.choices.find(answer => question.answer === answer.answer)
            correctAnswer.isChecked && setScore(prevScore => prevScore += 1)

            return {
                ...question,
                choices: question.choices.map(answer => {
                    return correctAnswer.id === answer.id
                    ? {...answer, isCorrect: true}
                    : answer
                })
            }
        }))

        setIsGameOver(true);
    }

    const handleRestartGame = () => {
        setIsGameOver(false);
        setScore(0);
        setIsDisabled(true);
        handleStartQuizz();
    }

    useEffect(() => {
        const isCompleted = questions.every(question => question.choices.find(answer => answer.hasOwnProperty('isChecked')))
        isGameStarted && isCompleted && setIsDisabled(false);
    }, [questions])

    return (
        <>
            <Header
                isGameStarted={isGameStarted}
                onClick={handleStartQuizz}
            />
            {isGameStarted &&
            <Main
                questions={questions}
                score={score}
                isDisabled={isDisabled}
                isGameStarted={isGameStarted}
                isGameOver={isGameOver}
                handleSelectAnswer={handleSelectAnswer}
                handleRestartGame={handleRestartGame}
                handleCheckAnswers={handleCheckAnswers}
            />
            }
        </>
    );
}

export default App;