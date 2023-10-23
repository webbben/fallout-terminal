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
                <div className="textCard">This is my "portfolio app" - basically a place to showcase some of the development I've done.</div>
                <div className="textCard">But... mostly just a place where I have fun experimenting with new ideas!</div>
            </div>
            <div className="flexRow">
                <div className="textCard">
                    As you may have noticed, the UI here is quite <b>simplistic</b> and kind of reminiscent of a retro arcade game. 
                    Originally I was making the "hacking" minigame inspired by a popular videogame series (Fallout), but I decided to flesh this out into a general purpose app.
                </div>
                <div className="textCard">
                    It may not show the sleekest UI components, but that's not really the point of this - it's just meant to feel nostalgic, and remind you of simpler times.
                    At least that's a large part of what I like about it.
                </div>
            </div>

            <h4>About me</h4>
            <div className="flexRow">
                <div className="textCard">
                    <h5>Background</h5>
                    My name is Benjamin Webb (you can call me Ben) and I've been working professionally as a software engineer for 3 years. However, I've also been programming in
                    various capacities for much longer than that. Originally from the US (Bloomington, Indiana), I studied Computer Science at Indiana University, 
                    graduating in 2020 - <i>good timing, I know</i> - and worked at a large healthcare IT corporation in Madison, WI. 
                    In August 2023, I left my position to move to Tokyo and be with my wife, and am very excited for the things to come in my new life in Japan!
                </div>
                <div className="textCard">
                    <h5>Japan</h5>
                    In addition to Computer Science, I also got a degree in Japanese Language and Culture. 
                    This lead to me studying for a year in Nagoya, where I started to develop my love for Japan. However, the first time I ever visited was actually
                    way back when I was just 10 years old.
                    One might expect a "Japanese language and culture" graduate to be fluent in the <i>Japanese language</i>, but sadly my Japanese profiency has waned over the years.
                    I'm hoping to complete a JLPT certification soon, but at the moment I would consider myself "conversational", - somewhere between N2 and N3.
                    That said, I'm excited to continue learning Japanese both as a study and by using it in my daily life.
                </div>
            </div>

            <h4>Personal interests</h4>
            <div className="flexRow">
                <div className="textCard">
                    <h5>Coding</h5>
                    My interest in coding dates back to when I was in middle school, messing around with MS-DOS scripts on our school computers.
                    These days, I primarily code in <b>Javascript and React</b>, learning more about front-end libraries and
                    fullstack development in general. Besides web dev, I also have dabbled in AI/ML, which you can find examples of in my github. I consider ML and data mining to
                    be some personal hobbies that I plan to work more on in the future.
                </div>
                <div className="textCard">
                    <h5>History</h5>
                    I'm also a bit of a history nerd - a hobby which has mostly developed over the past few years.
                    Very interested in ancient Roman history in particular, but also quite interested in European medieval history in general.
                    Anytime I visit a new country, I always gravitate toward the old buildings and monuments.
                </div>
            </div>
        </>
    );
}