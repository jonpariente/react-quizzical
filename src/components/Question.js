import { decode } from 'html-entities';
import Chip from "./Chip";

const Question = (props) => {
    const chipElements = props.choices.map(item => {
        const {id, name, answer} = item;

        return (
            <Chip
                key={id}
                id={id}
                name={name}
                value={answer}
                isChecked={item.isChecked}
                isCorrect={item.isCorrect}
                isDisabled={item.isDisabled}
                isGameOver={props.isGameOver}
                handleSelectAnswer={props.handleSelectAnswer}
            />
        )
    })

    return (
        <li className="question">
            <div>Question {props.id + 1}/{props.total}</div>
            <strong>{decode(props.question)}</strong>
            <div className="chips">
                {chipElements}
            </div>
        </li>
    );
}

export default Question;