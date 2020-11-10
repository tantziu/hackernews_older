import '../App.css';
import spinner from '../spinner-solid.svg';
import React from 'react';

const Loading = () => 
    <div>
        <img src={spinner} className="App-spinner" alt="spinner" />
        {/* Loading... */}
    </div>

export default Loading;