import React from "react";

import '../../assets/styles/snow.css';

export default function Snow(props) {

    const letItSnow = props.letItSnow;
    const density = props.density ? props.density : 12;


    if (!letItSnow) {
        return null;
    }

    return (
        <div className="snowflakes" aria-hidden="true">
            { [...Array(density)].map((e, i) => {
                var flake = (i < density / 2) ? "*" : "    *";
                return (
                    <div className="snowflake" key={`snowflake${i}`}>
                    {flake}
                    </div>
                );
            })}
        </div>
    );
}