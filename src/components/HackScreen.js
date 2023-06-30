import { text, generateLineNumbers, generateLines } from "../sourcetext";
import { Component, createRef, useEffect, useRef, useState } from 'react';
import TextSpan from "./TextSpan";
import Console from "./Console";
import Attempts from "./Attempts";
import sound_good from "../assets/sound/ui_hacking_passgood.wav";
import sound_bad from "../assets/sound/ui_hacking_passbad.wav";
import { render } from "@testing-library/react";
import HelpInfo from "./HelpInfo";

class HackScreen extends Component {

    hackScreenData;
    lines;
    words;
    consoleRef;
    attemptsRef;
    isActive;
    screenSwitch;

    constructor(props) {
        super(props);

        // generate data and state for hackscreen
        this.hackScreenData = generateLines();
        this.lines = this.hackScreenData[0];
        this.state = { password: this.hackScreenData[1], showHelp: false, duds: new Set() };
        this.words = this.hackScreenData[2]; // words (excluding password) visible on the screen

        // refs and properties
        this.consoleRef = createRef();
        this.attemptsRef = createRef();
        this.isActive = true; // determines if the screen is active or not; if we should accept input
        this.screenSwitch = props.screenSwitch;
        
        // bind callbacks
        this.onClickWord = this.onClickWord.bind(this);
        this.onHoverWord = this.onHoverWord.bind(this);
        this.toggleHelp = this.toggleHelp.bind(this);
    }

    componentDidMount() {
        const writeToScreen = async () => {
            await this.typeWriter("header", text.hackScreen.header, 30);
        }
        writeToScreen();
        this.cursorBlink();
    }

    //#region functions for typing to the screen 

    async cursorBlink() {
        while(this.isActive) {
            await this.typeWriter("hackScreen_cursor", "_", 0);
            await this.wait(1000);
            this.clear("hackScreen_cursor");
            await this.wait(1000);
        }
    }

    wait(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    // mimics a typewriter and types text into the element of the given id
    async typeWriter(id, text, speed, overwrite = true) {
      if (overwrite) { document.getElementById(id).innerHTML = ""; }
      for (let i = 0; i < text.length; i++) {
        document.getElementById(id).innerHTML += text.charAt(i);
        await this.wait(speed);
        if (document.getElementById(id).innerHTML.length - 5 > text.length) {
            console.log("abort!");
            //await typeWriter(id, text, speed);
            //return; TODO - delete this? was causing a glitch with <> text
        }
      }
    }

    // clear text from the element of the given id
    async clear(id) {
        await this.typeWriter(id, "", 0, true);
    }
    
    //#endregion

    //#region handlers for console input

    // handler for when a word is clicked so it can be checked with the password
    onClickWord(word, isBracket=false) {
        if (!this.isActive) return;
        if (isBracket) {
            this.handleBrackets(word);
            return;
        }
        const result = this.evaluateWord(word);
        console.log(result[0]);
        this.consoleRef.current.addLine(result[1], word);
        this.clear("hackScreen_consoleInput");
        if (result[0]) {
            // correct password; start transition to next screen
            this.isActive = false;
            this.accessGranted();
            return;
        }
        const audio = new Audio(sound_bad);
        audio.play();
        this.attemptsRef.current.decrement();
        if (this.attemptsRef.current.state.attempts <= 0) {
            this.isActive = false;
            console.log("out of attempts :(");
        }
    }

    handleBrackets(word) {
        if (Math.random() > 0.3) {
            this.setState({ duds: this.state.duds.add(this.words.pop())});
            this.consoleRef.current.addLine("Dud removed", word);
            this.clear("hackScreen_consoleInput");
            return;
        }
        this.attemptsRef.current.increment();
        this.consoleRef.current.addLine("Attempts regenerated", word);
        this.clear("hackScreen_consoleInput");
    }

    accessGranted() {
        const audio = new Audio(sound_good);
        audio.play()
        setTimeout(() => this.screenSwitch("mainMenu"), 3000);
    }

    // handler for when hovering over a word; causes word to be typed into the console input
    onHoverWord(word) {
        if (!this.isActive) return;
        const writeToConsole = async () => {
            this.consoleRef.current.isBusy = true;
            await this.typeWriter("hackScreen_consoleInput", word, 30);
            if (word != this.consoleRef.current.currentWord) { 
                await this.typeWriter("hackScreen_consoleInput", this.consoleRef.current.currentWord, 0);
            }
            this.consoleRef.current.isBusy = false;
        }
        this.consoleRef.current.currentWord = word;
        if (this.consoleRef.current.isBusy) return;
        writeToConsole();
    }

    // evaluate if the given word is the password; returns the number of matching chars if not.
    evaluateWord(word) {
        if (word === this.state.password) {
            return [
                true,
                "Exact match!"
            ];
        }
        let matchCount = 0;
        for (let i = 0; i < word.length; i++) {
            if (word.charAt(i) == this.state.password.charAt(i)) {
                matchCount++;
            }
        }
        return [false, matchCount + "/" + this.state.password.length + " correct"];
    }

    toggleHelp() {
        this.setState({ showHelp: !this.state.showHelp });
    }

    async onClickAdmin() {
        if (!this.isActive) return;

        this.isActive = false;
        this.consoleRef.current.addLine("Accessing admin priviledges...","ADMIN");
        await this.typeWriter("hackScreen_consoleInput", ". . . .", 500);
        this.clear("hackScreen_consoleInput");
        this.consoleRef.current.addLine("Access Granted!", "sysadmin override");
        this.accessGranted();
    }

    //#endregion  

    render() {
        console.log("render");
        console.log(this.state.password);
        return (
            <div>
                { this.state.showHelp ? <HelpInfo toggleHelp={this.toggleHelp} /> : null }
                <p id="header">
                </p>
                <br></br>
                <Attempts ref={this.attemptsRef} />
                <div className="toolbar">
                    <button onMouseEnter={() => this.onHoverWord("HELP")}
                    onClick={() => this.toggleHelp()}>HELP</button>
                    <button onMouseEnter={() => this.onHoverWord("ADMIN")}
                    onClick={() => this.onClickAdmin()}>ADMIN</button>
                </div>
                <div style={{display: "flex"}}>
                    <div 
                    style={{paddingRight: "10px", borderRight: "1px solid #ccc"}} 
                    onMouseLeave={() => this.clear("hackScreen_consoleInput")}>
                    { this.lines.map((line, i) => {
                        let idCount = 0;
                        return (
                            <div key={"line" + i}>
                                { line.map((word, wordNum) => {
                                    if (wordNum == 0) {
                                        return (
                                            <span>{ word + " " }</span>
                                        );
                                    }
                                    idCount++;
                                    return (
                                        <TextSpan 
                                        key={"span" + idCount}
                                        id={"word" + idCount} 
                                        text={word}
                                        clickHandler={this.onClickWord}
                                        hoverHandler={this.onHoverWord}
                                        clickable={!this.state.duds.has(word)}
                                        />
                                    );
                                }) }
                            </div>
                        );
                    }) }
                    </div>
                    <div style={{paddingLeft: "10px"}}>
                        <Console ref={this.consoleRef} />
                    </div>
                </div>
            </div>
        );
    }
    
}

export default HackScreen;