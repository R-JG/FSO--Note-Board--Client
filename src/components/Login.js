import React, { useState } from 'react';

const Login = ({ logInUser }) => {
    
    const [usernameInputValue, setUsernameInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');

    const handleLoginSubmit = event => {
        event.preventDefault();
        logInUser(usernameInputValue, passwordInputValue);
        setUsernameInputValue('');
        setPasswordInputValue('');
    };

    return (
        <form 
            className='Login'
            onSubmit={handleLoginSubmit}>
            <input 
                className='input--username'
                type='text'
                placeholder='username'
                value={usernameInputValue}
                onChange={event => setUsernameInputValue(event.target.value)}
            />
            <input 
                className='input--password'
                type='text'
                placeholder='password'
                value={passwordInputValue}
                onChange={event => setPasswordInputValue(event.target.value)}
            />
            <button className='button--log-in'>
                Log In
            </button>
        </form>
    );
};

export default Login;