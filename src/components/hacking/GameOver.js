import React from "react";

export default function GameOver() {

    return (
        <div className="flexCol" style={{ textAlign: 'center' }}>
            <h2>Game Over</h2>
            <br />
            <p>You ran out of attempts to find the password.</p>
        </div>
    )
}