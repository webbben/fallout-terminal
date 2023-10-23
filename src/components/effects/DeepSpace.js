import React from "react";
import '../../assets/styles/space.scss';

function randomInterval(min, max) { // min and max included 
    var int = Math.floor(Math.random() * (max - min + 1) + min);
    return int + Math.random() - Math.random();
}

export default function DeepSpace(props) {

    const jumpToDeepSpace = props.jumpToDeepSpace;
    const starCount = props.starCount ? props.starCount : 150;
    const starArray = [];
    for (let i = 0; i < starCount; i++) {
        starArray.push({ 
            key: i,
            x: randomInterval(49, 51),
            y: randomInterval(49, 51),
            dir: Math.random()
        });
    }

    if (!jumpToDeepSpace) {
        return;
    }

    return (
        <div className="stars">
        { starArray.map((starObj) => {
            // rendering stars here
            return (
                <div 
                className="star" 
                key={starObj.key}
                />
            );
        }) }
        </div>
    );
}