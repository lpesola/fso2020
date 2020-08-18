import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = props => {
    return <h1>{props.course.name}</h1>;
};

const Total = props => {
    let sum = 0;
    props.course.parts.forEach(part => {
        sum += part.exercises;
    });
    return <p>Number of exercises {sum}</p>;
};

const Part = props => {
    return (
        <p>
            {' '}
            {props.parts.name} {props.parts.exercises}{' '}
        </p>
    );
};
const Content = props => {
    return (
        <div>
            <Part parts={props.course.parts[0]} />
            <Part parts={props.course.parts[1]} />
            <Part parts={props.course.parts[2]} />
        </div>
    );
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            { name: 'Fundamentals of React', exercises: 10 },
            { name: 'Using props to pass data', exercises: 7 },
            { name: 'State of a component', exercises: 14 }
        ]
    };
    // expecting here that the idea is analogous to 4th part where the whole object is passed as props instead of parts of it
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
