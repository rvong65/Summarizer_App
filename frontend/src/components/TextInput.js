import React from 'react';

const TextInput = ({textInputOnChange, submitTextInput}) => {
    return(
        <div>
            <p className='f3 white'>
                <b>{'Please input any articles you would like'} <i>{'summarized'}</i></b>
            </p>
            <div className='center'>
                <div className='form center pa4 br3 w-50 shadow-2'>
                    <input className='textInput f4 pa2 w-70 center' placeholder= 'Enter some text' type='text' onChange={textInputOnChange}/>
                    <button className='textInputButton br2 w-30 grow f4 link ph3 pv2 dib white' onClick={submitTextInput}>Summarize</button>
                </div>
            </div>
        </div>

    );
}

export default TextInput
