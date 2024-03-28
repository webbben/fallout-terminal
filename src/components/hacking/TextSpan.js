import { useRef } from "react";
import { text } from "../../sourcetext";



function TextSpan(props) {
    
    function isBracket() {
        const first = props.text.charAt(0);
        const last = props.text.charAt(props.text.length-1);
        const bracketList = text.hackScreen.brackets;

        for (let i = 0; i < bracketList.length; i++) {
            if (first == bracketList[i][0]) {
                if (last == bracketList[i][1]) {
                    return true;
                }
            }
        }

        return false;
    }

    function onClick() {
        if (!props.clickable) return;
        if (isBracket()) {
            if (hasBeenClicked.current) return;
            props.clickHandler(props.text, true);
            hasBeenClicked.current = true;
            return;
        }
        props.clickHandler(props.text)

    }
    const hasBeenClicked = useRef(false); // only used for keeping brackets from being clicked more than once

    return(
        <>
            { props.clickable ? 
            <span 
            onClick={() => onClick()}
            onMouseEnter={() => props.hoverHandler(props.text)}
            className="hackScreen_word"
            id={props.id}>{props.text}</span> 
            : <span>{".".repeat(props.text.length)}</span> }
        </>
    );
}

export default TextSpan;