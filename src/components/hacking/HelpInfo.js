

function HelpInfo(props) {

    return (
        <div className="helpInfo">
            <h2>Fallout Terminal: <b>hacking</b></h2>
            <br />
            <p>
                This is a "hacking" minigame - inspired by the Fallout videogame series - representing a retro terminal where you need to find the password to login.
                The left side of the screen has various words mixed into gibberish text, and the right side is a console that returns output.
            </p>
            <br />
            <p><b>Finding the password</b></p>
            <p>
                When you click a word, the console will tell you how many characters match the password. A character only matches if it is also in the correct position.
                For example: "ABC" and "CBA" would only have a 1/3 match due to the "B".
            </p>
            <br />
            <p><b>Bracket text</b></p>
            <p>
                {`You can also find spans of characters that are wrapped in brackets. Clicking these will replenish an attempt, or will erase a "dud" password.
                These spans of bracket characters may look something like "[!@_%]" or "<a$d>" - using (),{},[], or <>.`}
            </p>
            <br />
            <p>
                Ultimately, if you're still stumped and just want to proceed, click the <b>ADMIN</b> button to skip this minigame.
            </p>
            <button style={{"float": "right"}} onClick={() => props.toggleHelp()}>Return</button>
        </div>
    );
}

export default HelpInfo;