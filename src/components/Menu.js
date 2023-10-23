import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {

    const navigate = useNavigate();

    return (
        <>
        <h2>Main Menu</h2>
        <div className="menuItems">
            <div className="menuItem" onClick={() => navigate('/main/about')}>About</div>
            <div className="menuItem" onClick={() => navigate('/main/resume')}>Resume</div>
            <div className="menuItem">Github</div>
            <div className="menuItem" onClick={() => navigate('/')}>↩ Hacking Minigame</div>
        </div>
        </>
    );
}