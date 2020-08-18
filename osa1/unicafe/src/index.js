import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}> {text} </button>;
};

const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value} </td>
        </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && bad === 0 && neutral === 0) {
        return <>no feedback given</>;
    }
    return (
        <table>
            <tbody>
                <StatisticsLine text="good" value={good} />
                <StatisticsLine text="neutral" value={neutral} />
                <StatisticsLine text="bad" value={bad} />
                <StatisticsLine text="all" value={bad + neutral + good} />
                <StatisticsLine text="average" value={(good + bad * -1) / (bad + neutral + good)} />
                <StatisticsLine text="positive" value={(good / (bad + neutral + good)) * 100 + ' %'} />
            </tbody>
        </table>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1> give feedback </h1>
            <Button
                handleClick={() => {
                    setGood(good + 1);
                }}
                text="Good"
            />
            <Button
                handleClick={() => {
                    setNeutral(neutral + 1);
                }}
                text="Neutral"
            />
            <Button
                handleClick={() => {
                    setBad(bad + 1);
                }}
                text="Bad"
            />
            <h1> statistics</h1>
            <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
