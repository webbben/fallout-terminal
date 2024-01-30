import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {

    const navigate = useNavigate();

    return (
        <>
            <h2>About</h2>
            <button 
            style={{ float: 'right' }}
            onClick={() => navigate('/main')}>Back</button>
            <h4>What's this about?</h4>
            <div className="flexRow">
                TODO
            </div>
            <div className="flexRow">
                
            </div>

            <h4>About me</h4>
            <div className="flexRow">
                <div className="textCard">
                    <h5>Background</h5>
                    
                </div>
                <div className="textCard">
                    <h5>Japan</h5>
                    
                </div>
            </div>

            <h4>Personal interests</h4>
            <div className="flexRow">
                <div className="textCard">
                    <h5>Coding</h5>
                    
                </div>
                <div className="textCard">
                    <h5>History</h5>
                    
                </div>
            </div>
        </>
    );
}