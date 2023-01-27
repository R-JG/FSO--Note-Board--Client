import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

    const [notes, setNotes] = useState([]);
    const [notesToShow, setNotesToShow] = useState(notes);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        console.log('Calling API...');
        axios
            .get('http://localhost:3001/notes')
            .then((response) => {
                console.log('API response: ', response);
                setNotes(response.data)
            });
    }, []);

    useEffect(() => {
        if (showAll) {
            setNotesToShow(notes);
        } else {
            setNotesToShow(notes.filter(note => note.important));
        };
    }, [showAll]);

    const handleClick = () => {
        setShowAll(!showAll);
    };

    const noteElements = notesToShow.map((note) => (
        <div key={note.id}>{note.content}</div>
    ));

    return (
        <div>
            <div className='notes-container'>{noteElements}</div>
            <button onClick={handleClick}>Toggle Show All</button>
        </div>
    );
};

export default App;