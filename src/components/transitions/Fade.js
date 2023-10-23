import React, { useState } from "react";
import '../../assets/styles/animations.scss';

export default function Fade({ children, show, end, start, speed, unmount }) {
    
    const [mount, setMount] = useState(show);

    if (show && !mount) {
        setMount(true);
    }

    // start and end callbacks
    function endCallback() {
        if (!show && unmount) {
            setMount(false);
        }
        if (end) {
            end();
        }
    }
    function startCallback() {
        if (start){
            start();
        }
    }

    // animation class
    var animationClass;
    if (show) {
        animationClass = 'fadeIn';
    }
    else {
        animationClass = 'fadeOut';
    }
    if (speed === 'slow') {
        animationClass += 'Slow';
    }
    if (speed === 'fast') {
        animationClass += 'Fast';
    }

    // handle unmounting
    if (!mount) {
        return null;
    }

    return (
        <div 
        className={animationClass}
        onAnimationStart={() => startCallback()}
        onAnimationEnd={() => endCallback() }>
            {children}
        </div>
    );
}