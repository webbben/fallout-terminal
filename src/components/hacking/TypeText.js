import { useEffect, useState } from "react";

function wait(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export default function TypeText({ text, speed }) {
    const [displayText, setDisplayText] = useState("");
    const defaultSpeed = 50;

    useEffect(() => {
        let isMounted = true;
        async function typingEffect() {
            const currentText = text;
            setDisplayText("");
            //await wait(150);
            for (let i = 0; i < currentText.length; i++) {
                if (!isMounted) return;
                setDisplayText((txt) => txt + currentText[i]);
                await wait(speed || defaultSpeed);
            }
        }
        typingEffect();

        return () => {
            isMounted = false;
            console.log('switch!');
        }
    }, [text]);

    console.log('typetext:', text);
    return (
        <span>{displayText}</span>
    )
}