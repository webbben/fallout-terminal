import { text, generateLines } from "../../sourcetext";
import { Component, createRef } from 'react';
import TextSpan from "./TextSpan";
import Console from "./Console";
import Attempts from "./Attempts";
import sound_good from "../../assets/sound/ui_hacking_passgood.wav";
import sound_bad from "../../assets/sound/ui_hacking_passbad.wav";
import HelpInfo from "./HelpInfo";
import { Navigate } from "react-router-dom";
import Fade from "../transitions/Fade";
import GameOver from "./GameOver";

class HackScreen extends Component {

    hackScreenData;
    lines;
    words;
    consoleRef;
    isActive;

    constructor() {
        super();

        // generate data and state for hackscreen
        this.hackScreenData = generateLines();
        this.lines = this.hackScreenData[0];
        this.state = { 
            password: this.hackScreenData[1], 
            showHelp: false, 
            duds: new Set(),
            access: false,
            attempts: 5,
            showBody: true,
            showMessage: false,
        };
        this.words = this.hackScreenData[2]; // words (excluding password) visible on the screen

        // refs and properties
        this.consoleRef = createRef();
        this.isActive = true; // determines if the screen is active or not; if we should accept input
        
        // bind callbacks
        this.onClickWord = this.onClickWord.bind(this);
        this.onHoverWord = this.onHoverWord.bind(this);
        this.toggleHelp = this.toggleHelp.bind(this);
        this.handleTransition = this.handleTransition.bind(this);
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
        if (!document.getElementById(id)) return;
        if (overwrite) {
            document.getElementById(id).innerHTML = ""; 
        }
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
        // incorrect password; decrement attempts or handle game over
        const audio = new Audio(sound_bad);
        audio.play();
        this.setState({ attempts: this.state.attempts - 1 });
    }

    handleBrackets(word) {
        if (this.state.attempts === 5 || Math.random() > 0.3) {
            this.setState({ duds: this.state.duds.add(this.words.pop())});
            this.consoleRef.current.addLine("Dud removed", word);
            this.clear("hackScreen_consoleInput");
            return;
        }
        this.setState({ attempts: this.state.attempts + 1 })
        this.consoleRef.current.addLine("Attempts regenerated", word);
        this.clear("hackScreen_consoleInput");
    }

    accessGranted() {
        const audio = new Audio(sound_good);
        audio.play()
        setTimeout(() => this.setState({ access: true }), 3000);
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
        this.clear("hackScreen_consoleInput");
        await this.wait(1000);
        this.consoleRef.current.clearConsole();
        await this.typeWriter("hackScreen_consoleInput", "sudo su root", 30);
        await this.wait(800);
        this.consoleRef.current.addLine("","sudo su root");
        await this.typeWriter("hackScreen_consoleInput", "rm -rf /", 30);
        await this.wait(800);
        this.consoleRef.current.addLine("","rm -rf /");
        await this.typeWriter("hackScreen_consoleInput", ". . . .", 300);
        this.clear("hackScreen_consoleInput");
        this.consoleRef.current.addLine("",". . . .");
        await this.wait(300);
        this.consoleRef.current.addLine("Access Granted!", "sysadmin override");
        this.accessGranted();
    }

    //#endregion  

    handleTransition() {
        if (!this.state.showBody) {
            this.setState({showMessage: true});
        }
    }

    render() {
        console.log("render");
        console.log(this.state.password);

        // handle game over state
        if (this.state.attempts <= 0) {
            this.isActive = false;
            setTimeout(() => this.setState({showBody: false}), 2000);
        }

        return (
            <>
            <Fade show={this.state.showBody} end={this.handleTransition} unmount>
            <div>
                { this.state.access ? <Navigate to={'/main'} replace={true} /> : null }
                { this.state.showHelp ? <HelpInfo toggleHelp={this.toggleHelp} /> : null }
                <p id="header">
                </p>
                <br></br>
                <Attempts attempts={this.state.attempts} />
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
                                            <span key={`marker${i}`}>{ word + " " }</span>
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
            </Fade>
            <Fade show={this.state.showMessage}>
                <GameOver />
            </Fade>
            </>
        );
    }
    
}

export default HackScreen;