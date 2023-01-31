import React from 'react';

const Note = ({
    note,
    toggleNoteImportance, 
    deleteNote,
}) => {
    return (
        <li className='Note'>
            <div>
                <button 
                    className='button--delete'
                    onClick={() => deleteNote(note.id)} >
                    ×
                </button>
                <span>{note.content}</span>
            </div>
            <div className='note--importance-section'>
                <span>Important: </span>
                <button 
                    className='button--toggle-importance'
                    style={{color: ((note.important) ? 'green' : 'brown')}}
                    onClick={() => toggleNoteImportance(note)}>
                    {(note.important) ? 'Yes' : 'No'}
                </button>
            </div>
        </li>
    );
};

export default Note;