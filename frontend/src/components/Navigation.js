import React from 'react';
import Logo from './Logo';

const Navigation = ({onChangeRoute, isSignedIn}) => {
    return(
        <div>
        {isSignedIn === true &&
            <div>
            <nav style={{display: 'inline'}}>
                <Logo style={{position: "absolute", left: 0, top: 0}}/>
                <h1 style={{position: "absolute", left: 95, top: 25, fontWeight:"bold" ,color: "white"}}>Summarizer</h1>
                <p style = {{position: "absolute", right: 10, top: 10, fontWeight:"bold"}} className = 'f4 link dim black pa3 pointer white' onClick={ () => onChangeRoute("signOut")}>Sign Out</p>
            </nav>
            </div>}
        </div>
    );
}

export default Navigation