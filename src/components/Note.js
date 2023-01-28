import React from 'react';

const Note = ({
    note,
    toggleNoteImportance, 
}) => {
    return (
        <li className='Note'>
            {note.content}
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