import React from 'react';
import './TextOutput.css';

const TextOutput = ({textOutput}) => {
    return(
        <div className=" textOutputBox center ma4 pa5 br3 w-50 f3 shadow-3">
            <p>{textOutput}</p>
        </div>

    );
}

export default TextOutput
