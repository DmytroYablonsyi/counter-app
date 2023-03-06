import React, { useEffect, useState } from "react";
import { getPad } from "../padTime/padTime";
import "./style.css"

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [counting, setCounting] = useState(false);

    const min = getPad(Math.floor(timeLeft/60));
    const sec = getPad(timeLeft - min * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            counting && setTimeLeft((timeLeft) => (timeLeft >= 0 ? timeLeft - 1 : 0)) 
        },1000);
        if(timeLeft === 0) setCounting(false);
        return () => {clearInterval(interval)} 
    },[timeLeft,counting]);

    const start = () => {
        if(timeLeft === 0) setTimeLeft(2 * 60);
        setCounting(true)
    };

    const stop = () => {
        setCounting(false)
    };

    const reset = () => {
        setCounting(false)
        setTimeLeft(60);
    };  

    return(
        <div className="container">
            <div className="count">
                <div>{min}</div>
                <div>:</div>
                <div>{sec}</div>
            </div>
            <div className="button">
                <button onClick={start}>start</button>
                <button onClick={stop}>stop</button>
                <button onClick={reset}>reset</button>
            </div>
            <div style={{width:sec == 0 ? "590px" :`${sec * 10}px`, background:"white", height:"40px"}}></div>
        </div>
        
    )
}

export default Timer