import { text, generateLines } from "../../sourcetext";
import { useEffect, useRef, useState } from 'react';
import TextSpan from "./TextSpan";
import Console from "./Console";
import Attempts from "./Attempts";
import sound_good from "../../assets/sound/ui_hacking_passgood.wav";
import sound_bad from "../../assets/sound/ui_hacking_passbad.wav";
import HelpInfo from "./HelpInfo";
import Fade from "../transitions/Fade";
import GameOver from "./GameOver";
import Fallout from '../effects/Fallout';
import TypeText from "./TypeText";

/**
 * Fallout terminal hacking component
 * 
 * props:
 * 
 * @prop {function} accessCallback callback function for when access is granted; use this to change state or do whatever you like.
 * @prop {boolean} falloutFx boolean flag for whether or not to show the extra retro terminal effects, like the scrolling line or the thin black bars. Defaults to true.
 */
export default function HackScreen({ accessCallback, falloutFx }) {

    if (falloutFx === undefined) {
        falloutFx = true;
    }

    const [lines, setLines] = useState([]);
    const [password, setPassword] = useState('');
    const [showHelp, setShowHelp] = useState(false);
    const [access, setAccess] = useState(false);
    const [attempts, setAttempts] = useState(5);
    const [showBody, setShowBody] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [curWord, setCurWord] = useState('');
    const defaultTypeSpeed = 50;
    const typeSpeed = useRef(defaultTypeSpeed);
    const [log, setLog] = useState([]);

    function setWord(word) {
        setCurWord(word);
    }

    function clearWord() {
        setCurWord('');
    }

    function addToLog(enteredWord, consoleResult) {
        let addLines = [enteredWord];
        if (consoleResult !== "") {
            addLines.push(consoleResult);
        }
        if (log.length >= 16) {
            setLog(addLines);
            return;
        }
        setLog((prevLog) => [...prevLog, ...addLines]);
    }

    const words = useRef([]);
    const isActive = useRef(true);
    const duds = useRef(new Set());

    useEffect(() => {
        const data = generateLines();
        setLines(data[0]);
        setPassword(data[1]);
        duds.current = new Set();
        words.current = data[2];
    }, []);

    function wait(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    // handler for when a word is clicked so it can be checked with the password
    function onClickWord(word, isBracket=false) {
        if (!isActive.current) return;
        if (isBracket) {
            handleBrackets(word);
            return;
        }
        const result = evaluateWord(word);
        console.log(result[0]);
        addToLog(word, result[1]);
        clearWord();
        if (result[0]) {
            // correct password; start transition to next screen
            isActive.current = false;
            accessGranted();
            return;
        }
        // incorrect password; decrement attempts or handle game over
        const audio = new Audio(sound_bad);
        audio.play();
        setAttempts((prevAttempts) => prevAttempts - 1);
    }

    function handleBrackets(word) {
        if (attempts === 5 || Math.random() > 0.3) {
            duds.current.add(words.current.pop())
            addToLog(word, "Dud removed");
            clearWord();
            return;
        }
        setAttempts((prevAttempts) => prevAttempts + 1);
        addToLog(word, "Attempts regenerated");
        clearWord();
    }

    function accessGranted() {
        const audio = new Audio(sound_good);
        audio.play()
        setTimeout(() => setAccess(true), 3000);
    }

    // handler for when hovering over a word; causes word to be typed into the console input
    async function onHoverWord(word) {
        if (!isActive.current) return;
        typeSpeed.current = defaultTypeSpeed;
        setWord(word);
    }

    // evaluate if the given word is the password; returns the number of matching chars if not.
    function evaluateWord(word) {
        if (word === password) {
            return [
                true,
                "Exact match!"
            ];
        }
        let matchCount = 0;
        for (let i = 0; i < word.length; i++) {
            if (word.charAt(i) == password.charAt(i)) {
                matchCount++;
            }
        }
        return [false, matchCount + "/" + password.length + " correct"];
    }

    function toggleHelp() {
        setShowHelp(!showHelp);
    }

    async function onClickAdmin() {
        if (!isActive.current) return;
        isActive.current = false;
        addToLog("ADMIN", "Accessing admin priviledges...");
        clearWord();
        await wait(1000);
        setLog([]);
        await wait(100);
        setWord("sudo su root");
        await wait(800);
        clearWord();
        addToLog("sudo su root", "");
        await wait(200);
        setWord("rm -rf /");
        await wait(800);
        clearWord();
        addToLog("rm -rf /", "");
        typeSpeed.current = 300;
        setWord(". . . .");
        await wait(3000);
        clearWord();
        addToLog(". . . .", "");
        await wait(300);
        typeSpeed.current = defaultTypeSpeed;
        addToLog("sysadmin override", "Access Granted!");
        accessGranted();
    }

    function handleTransition() {
        if (!showBody) {
            setShowMessage(true);
        }
    }

    // handle game over state
    if (attempts <= 0) {
        isActive.current = false;
        setTimeout(() => setShowBody(false), 2000);
    }

    return (
        <>
        { falloutFx && <Fallout /> }
        <Fade show={showBody} end={handleTransition} unmount speed={"fast"}>
        <div>
            {
                /*
                The callback function to call when access is granted
                @type {string}
                @required
                */
            }
            { access ? (accessCallback ? accessCallback() : console.log("access granted!")) : null }
            { showHelp ? <HelpInfo toggleHelp={toggleHelp} /> : null }
            <TypeText text={text.hackScreen.header} />
            
            <br></br>
            <Attempts attempts={attempts} />
            <div className="toolbar">
                <button onMouseEnter={() => onHoverWord("HELP")}
                onClick={() => toggleHelp()}>HELP</button>
                <button onMouseEnter={() => onHoverWord("ADMIN")}
                onClick={() => onClickAdmin()}>ADMIN</button>
            </div>
            <div style={{display: "flex"}}>
                <div 
                style={{paddingRight: "10px", borderRight: "1px solid #ccc"}} 
                onMouseLeave={() => clearWord()}>
                { lines.map((line, i) => {
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
                                    clickHandler={onClickWord}
                                    hoverHandler={onHoverWord}
                                    clickable={!duds.current.has(word)}
                                    />
                                );
                            }) }
                        </div>
                    );
                }) }
                </div>
                <div style={{paddingLeft: "10px"}}>
                    <Console currentWord={curWord} log={log} typeSpeed={typeSpeed.current} />
                </div>
            </div>
        </div>
        </Fade>
        <Fade show={showMessage}>
            <GameOver />
        </Fade>
        </>
    );
}