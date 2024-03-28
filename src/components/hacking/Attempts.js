import React from "react";


export default function Attempts(props) {

    const attempts = props.attempts;

    var str = "";
    for (let i = 0; i < attempts; i++) {
        str += " ■";
    }

    var msg = "";

    if (attempts === 1) {
        msg = " !! Lockout imminent !!"
    }
    if (attempts === 0) {
        msg = " System locked. Contact your administrator for assistance."
    }


    return (
        <p>Attempts:{str}<span style={{ color: attempts === 1 ? 'orange' : 'unset' }}>{msg}</span></p>
    );
}