import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {

    const navigate = useNavigate();
    const myPicSrc = 'https://media.licdn.com/dms/image/D5603AQE1eM29yiOf9Q/profile-displayphoto-shrink_800_800/0/1700803418812?e=1716422400&v=beta&t=1HVGj5mo-C365SMWqm4THI6ftMGuMULpwAiae2mjb4o';

    return (
        <div>
            <h2>About</h2>
            <button 
            style={{ float: 'right' }}
            onClick={() => navigate('/main')}>Back</button>
            <h4>Where am I?</h4>
            <div style={{ margin: '0 2em'}}>
            <div className="flexRow">
                <div className="textCard">
                    This is Ben's personal site! Mostly meant to be a portfolio, but I had a little too much fun trying to make this into some kind of retro arcade-style thing. 
                    The style is mainly inspired by the computer terminals in a videogame series called 'Fallout' - for those unacquainted, basically think of very early computer terminals from around the 1950/60s. 
                    I promise I'm not just really bad at front end styling... ;)
                </div>
            </div>
            <h4>About me</h4>
            <div className="flexRow">
                <div className="textCard" style={{ textAlign:'center'}}>
                    <img className="myPic" src={myPicSrc} style={{ width: '400px', height: '400px', borderStyle: 'groove', margin: '5px'}}></img>
                </div>
                <div className="textCard" style={{ textAlign:'left'}}>
                    My name is Ben and I'm a software developer. I love building things in general and working on various types of coding projects, but most of my experience is with web development.
                    I'm from the US (Bloomington, Indiana) but currently live in Tokyo, Japan.
                </div>
            </div>
            <h4>Personal Interests</h4>
            <div className="flexRow">
                <div className="textCard">
                    <h5>Active Life</h5>
                    When not sat in front of a computer, I like to get outdoors and enjoy nature; 
                    I like to go hiking, go for runs, and explore new places in Japan. I also play tennis and frisbee, and various other sports from time to time.
                </div>
                <div className="textCard">
                    <h5>Videogames</h5>
                    As you may have guessed, among my hobbies and interests are videogames - I particularly like games like Fallout New Vegas, Morrowind, Oblivion, and other RPGs by Bethesda.
                    Recently I've been playing old gamecube games as well.
                    </div>
            </div>
            <div className="flexRow">
                <div className="textCard">
                    <h5>History</h5>
                    Also a big history buff - really into ancient Roman history, but also go through phases of being into different parts of medieval European history, Byzantine/Eastern Roman history, Renaissance, Napoleonic France, etc.
                </div>
            </div>
            </div>
        </div>
    );
}