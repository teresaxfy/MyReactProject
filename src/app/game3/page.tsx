"use client";

import { useState } from "react";
import Bottle from "./components/Bottle";

export default function SwitchBottle() {
    const orders = [...Array(10).keys()];
    const [bottles, setBottles] = useState(orders);
    const [target, setTarget] = useState(orders);
    const [first, setFirst] = useState(-1);
    const [second, setSecond] = useState(-1);

    let showExchangeButton = false;

    if (first !== -1 && second != -1) {
        showExchangeButton = true;
    }

    function handleClick(index: number) {
        if (first === -1) {
            setFirst(index);
            return;
        }

        if (first === index) {
            if (second === -1) {
                setFirst(-1);
            }
            else {
                setFirst(second);
                setSecond(-1);
            }

            return;
        }

        if (second === index) {
            setSecond(-1);
            return;
        }

        setSecond(index);
        return;
    }

    function shuffleArray(array: number[]) {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            // Generate a random index between 0 and i (inclusive)
            const j = Math.floor(Math.random() * (i + 1));

            // Swap elements at index i and j
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    }

    function gameStart() {
        setBottles(shuffleArray(orders));
        setTarget(shuffleArray(orders));
    }

    function exchange() {
        const currentArray = bottles.slice();
        [currentArray[first], currentArray[second]] = [currentArray[second], currentArray[first]];
        setFirst(-1);
        setSecond(-1);
        showExchangeButton = false;
        setBottles(currentArray);
    }

    function getPairs() {
        let pair = 0;
        for (let i = 0; i < bottles.length; i++) {
            if (bottles[i] === target[i]) {
                pair++;
            }
        }

        if (pair === 10) {
            return "Congratulations, YOU WIN!";
        }
        else {
            // return "There are " + pair.toString() + " same pairs.";
            return `There are ${pair.toString()} same pairs.`;
        }
    }

    return (
        <div className="flex-col items-center justify-center min-h-screen">
            <div className="*:block">
                <button onClick={gameStart}>Start Game</button>
            </div>
            <div className="flex">
                { bottles.map((i, index) => <Bottle key={i} id={i} onClick={() => { handleClick(index); }} selected={index === first || index === second}></Bottle>)}
            </div>
            <div>
                { showExchangeButton && (
                    <button onClick={exchange}>Exchange card</button>)}
            </div>
            <p>{getPairs()}</p>
        </div>
    );
}
