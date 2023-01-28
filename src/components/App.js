import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note';

const App = () => {

    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [formData, setFormData] = useState(
        {content: '', important: false}
    );

    useEffect(() => {
        console.log('Calling API...');
        axios
            .get('http://localhost:3001/notes')
            .then((response) => {
                console.log('API response: ', response);
                setNotes(response.data)
            });
    }, []);

    const updateFormData = (key, value) => {
        setFormData({
            ...formData,
            [key]: value
        });
    };

    const handleClick = () => {
        setShowAll(!showAll);
    };

    const handleTextInputChange = event => {
        updateFormData('content', event.target.value);
    };

    const handleCheckInputChange = () => {
        updateFormData('important', !formData.important);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        axios
            .post('http://localhost:3001/notes', formData)
            .then(response => setNotes(notes.concat(response.data)));
        setFormData({content: '', important: false});
    };

    const toggleNoteImportance = (note) => {
        const url = `http://localhost:3001/notes/${note.id}`;
        const updatedNote = {
            ...note,
            important: !note.important
        };
        axios.put(url, updatedNote)
            .then(response => setNotes(notes.map(n => 
                (n.id === note.id) ? response.data : n)
        ));
    };

    const noteElements = notes
        .filter(note => 
            (showAll) ? true : note.important)
        .map((note) => (
            <Note 
                key={note.id} 
                note={note} 
                toggleNoteImportance={toggleNoteImportance}
            />
    ));

    return (
        <div className='App'>
            <button 
                className='button--show-all' 
                onClick={handleClick}>
                {(showAll) ? 'Show Important Notes Only' : 'Show All Notes'}
            </button>
            <ul className='notes-list'>
                {noteElements}
            </ul>
            <form 
                className='form--new-note'
                onSubmit={handleFormSubmit}>
                <label htmlFor='new-note--text-input'>
                    Note:
                </label>
                <input 
                    id='new-note--text-input'
                    type='text'
                    value={formData.content}
                    onChange={handleTextInputChange} />
                <label htmlFor='new-note--checkbox'>
                    Important?
                </label>
                <input 
                    id='new-note--checkbox'
                    type='checkbox'
                    checked={formData.important}
                    onChange={handleCheckInputChange} />
                <button>Add Note</button>
            </form>
        </div>
    );
};

export default App;