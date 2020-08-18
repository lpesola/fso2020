import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const findMostVotedAnecdote = (votes, currentMostVoted) => {
    let index = currentMostVoted || 0;
    let currentMax = votes[index];
    for (let i = 0; i < votes.length; i++) {
        if (votes[i] > currentMax) {
            currentMax = votes[i];
            index = i;
        }
    }
    return index;
};

const Anecdote = ({ anecdoteNumber, votes }) => {
    if (anecdoteNumber === undefined) {
        return (
            <p> No votes yet </p>
        )
    }
    return (
        <>
                {anecdotes[anecdoteNumber]} <br />
                <small>
                    Anecdote {anecdoteNumber + 1}, {votes} votes
                </small>
        </>
    );
};

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
    const [mostVoted, setMostVoted] = useState(undefined);

    // Only one anecdote is shown even in a tie situation; we choose to continue to choose the oldest record holder
    // i.e. only show a new anecdote if it has more votes than others
    const refreshVotes = () => {
        const updatedVotesList = [...votes];
        updatedVotesList[selected] += 1;
        const updatedMostVoted = findMostVotedAnecdote(updatedVotesList, mostVoted);
        setVotes(updatedVotesList);
        setMostVoted(updatedMostVoted);
    };

    return (
        <div>
            <h2> Random anecdote</h2>
            <Anecdote anecdoteNumber={selected} votes={votes[selected]} />
            <br />

            <button onClick={refreshVotes}>Vote for this anecdote</button>
            <button
                onClick={() => {
                    setSelected(Math.floor(Math.random() * 10) % anecdotes.length);
                }}
            >
                Get a random anecdote
            </button>

            <h2>The most voted anecdote</h2>
            <Anecdote votes={votes[mostVoted]} anecdoteNumber={mostVoted} />
        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
