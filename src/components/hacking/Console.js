import TypeText from "./TypeText";

export default function Console({ currentWord, log, typeSpeed }) {
    if (!log) {
        log = [];
    }

    return (
        <div>
            { log.map((line, index) => {
                return (
                    <p key={index}> {"> "} { (line === "Exact match!" || line === "Access Granted!") ? <b>{line}</b> : line }</p>
                );
            }) }
            <p><span>{"> "}</span>{ currentWord !== '' && <TypeText text={currentWord} speed={typeSpeed}/> }<span id="hackScreen_cursor"></span></p>
        </div>
    );
}