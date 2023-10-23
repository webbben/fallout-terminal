import { useState } from "react";
import Snow from "./effects/Snow";
import DeepSpace from "./effects/DeepSpace";
import { Outlet, useNavigate } from "react-router-dom";


export default function Main() {

    // consts
    const effects = {
        snow: 'snow',
        space: 'space'
    };
    const initialEffect = (Math.random() >= 0.5) ? effects.snow : effects.space;

    // state
    const [effect, setEffect] = useState(initialEffect);

    const navigate = useNavigate()

    // logic, functions
    function toggleEffect(effectName) {
        if (effectName === effects.snow) {
            if (effect === effects.snow) {
                setEffect('');
                return;
            }
            setEffect(effects.snow);
            return;
        }
        if (effectName === effects.space) {
            if (effect === effects.space) {
                setEffect('');
                return;
            }
            setEffect(effects.space);
            return;
        }
    }

    const imgSrc = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNcu7hoXtyNqi31OHi_xgX4Dc9rjdHOJ29gQ&usqp=CAU`;
    return(
        <div>
            <Snow letItSnow={effect === effects.snow} />
            <DeepSpace jumpToDeepSpace={effect === effects.space} />
            <div className="menuDiv">
                <div className="toolbar flexRow">
                    <button onClick={() => toggleEffect(effects.snow)}>Snow!</button>
                    <button onClick={() => toggleEffect(effects.space)}>Space✰</button>
                </div>
                <Outlet />
            </div>
        </div>
        
    );
}