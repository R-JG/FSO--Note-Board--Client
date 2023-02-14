import React, { useState, useEffect } from 'react';
import noteService from '../services/notes';
import Note from './Note';
import Login from './Login';

const App = () => {

    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [formData, setFormData] = useState(
        {content: '', important: false}
    );
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        noteService
            .getAll()
            .then(responseData => setNotes(responseData));
    }, []);
    
    useEffect(() => {
        const loggedUserStorage = window.localStorage.getItem('loggedUser');
        if (loggedUserStorage) {
            const loggedUser = JSON.parse(loggedUserStorage);
            setUser(loggedUser);
            noteService.setToken(loggedUser.token);
        };
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

    const createNote = noteData => {
        noteService.setToken(user.token);
        noteService
            .create(noteData)
            .then(responseData => setNotes(notes.concat(responseData)));
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        createNote(formData);
        setFormData({content: '', important: false});
    };

    const toggleNoteImportance = (note) => {
        const updatedNote = {
            ...note,
            important: !note.important
        };
        noteService
            .update(note.id, updatedNote)
            .then(responseData => setNotes(notes.map(n => 
                (n.id === note.id) ? responseData : n)
        ));
    };

    const deleteNote = id => {
        noteService
            .deleteNote(id)
            .then(idOfDeletedNote => setNotes(notes.filter(note => 
                note.id !== idOfDeletedNote
        )));
    };

    const logInUser = (username, password) => {
        noteService
            .login(username, password)
            .then(userData => {
                setUser(userData);
                const loggedUser = JSON.stringify(userData);
                window.localStorage.setItem('loggedUser', loggedUser);
            })
            .catch(error => console.log(error.message));
    };

    const logOutUser = () => {
        setUser(null);
        window.localStorage.removeItem('loggedUser');
    };

    const noteElements = notes
        .filter(note => 
            (showAll) ? true : note.important)
        .map((note) => (
            <Note 
                key={note.id} 
                note={note} 
                toggleNoteImportance={toggleNoteImportance}
                deleteNote={deleteNote}
            />
    ));

    return (
        <div className='App'>
            {(user) 
                ? <div className='user-info'>
                    <span>User: </span>
                    <span>{user.username}</span>
                    <button 
                        className='button--log-out'
                        onClick={logOutUser}>
                        Log Out
                    </button>  
                </div> 
                : <Login logInUser={logInUser} />}
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