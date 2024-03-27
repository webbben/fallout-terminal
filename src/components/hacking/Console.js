import { Component } from "react";
import TypeText from "./TypeText";

export default function Console({ currentWord, log }) {
    if (!log) {
        log = [];
    }
    console.log("current word:", currentWord);
    return (
        <div>
            { log.map((line, index) => {
                return (
                    <p key={index}> {"> "} { (line === "Exact match!" || line === "Access Granted!") ? <b>{line}</b> : line }</p>
                );
            }) }
            <p><span>{"> "}</span><TypeText text={currentWord}/><span id="hackScreen_cursor"></span></p>
        </div>
    );
}