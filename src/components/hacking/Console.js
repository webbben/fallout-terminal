import { Component } from "react";

export default class Console extends Component {
    
    isBusy;
    currentWord;

    constructor() {
        super();
        this.isBusy = false;
        this.currentWord = ""; 
        this.state = { log: ["Enter the password"] };
    }

    // adds a line to the console
    /**
     * 
     * @param {string} line line of text representing the result of the input to the terminal
     * @param {string} word word that was entered into the terminal 
     */
    addLine(line, word) {
        let newLog = this.state.log.length >= 17 ? [] : [...this.state.log];
        newLog.push(word);
        if (line && line.length > 0) {
            newLog.push(line);
        }
        this.setState({
            log: newLog
        });
    }

    clearConsole() {
        this.setState({
            log: []
        });
    }

    render() {
        
        return (
            <div>
                { this.state.log.map((line, index) => {
                    return (
                        <p key={index}> {"> "} { (line == "Exact match!" || line == "Access Granted!") ? <b>{line}</b> : line }</p>
                    );
                }) }
                <p><span>{"> "}</span><span id="hackScreen_consoleInput"></span><span id="hackScreen_cursor"></span></p>
            </div>
        );
    }   
}