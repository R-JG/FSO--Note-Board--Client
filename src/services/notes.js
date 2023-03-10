import axios from 'axios';

const baseUrl = '/api/notes';
let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = newObj => {
    const config = { headers: { Authorization: token }};
    const request = axios.post(baseUrl, newObj, config);
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

const login = (username, password) => {
    const request = axios.post('/api/login', { username, password });
    return request.then(response => response.data);
};

const noteService = {
    setToken,
    getAll,
    create,
    update,
    deleteNote,
    login
};

export default noteService;