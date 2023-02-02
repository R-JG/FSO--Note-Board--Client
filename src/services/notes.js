import axios from 'axios';

const baseUrl = '/api/notes';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = newObj => {
    const request = axios.post(baseUrl, newObj);
    return request.then(response => response.data);
};

const update = (id, newObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newObj);
    return request.then(response => response.data);
};

const deleteNote = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(idOfDeletedNote => idOfDeletedNote.data);
};

const noteService = {
    getAll,
    create,
    update,
    deleteNote,
};

export default noteService;