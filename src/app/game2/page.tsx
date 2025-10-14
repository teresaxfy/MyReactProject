"use client";

import { useState, useEffect, useRef } from "react";
import Card from "./components/Card";

export default function SwitchCard() {
    const orders = [...Array(10).keys()];
    const [cards, setCards] = useState(orders);
    const [targetCards, setTargetCards] = useState(orders);
    const [selectionFirst, setSelectionFirst] = useState<number | null>(null);
    const [count, setCount] = useState(0);
    const [currentState, setCurrentState] = useState("preGame"); // "preGame", "inGame", "postGame"
    const [seconds, setSeconds] = useState(0);
    const interval = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (currentState === "inGame") {
            interval.current = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000); // Update every second (1000ms)
        }
        else if (interval.current !== null) {
            clearInterval(interval.current);
        }
        return () => {
            if (interval.current !== null) {
                clearInterval(interval.current);
            }
        }; // Cleanup on component unmount or isActive change
    }, [currentState]); // Re-run effect when isActive or seconds change

    function handleClick(i: number) {
        if (currentState != "inGame") {
            return;
        }

        if (selectionFirst === null) {
            setSelectionFirst(i);
            return;
        }

        if (selectionFirst == i) {
            setSelectionFirst(null);
            return;
        }

        console.log("Exchanging ", { selectionFirst }, " with ", { i });
        exchangeCard(selectionFirst, i);
        setSelectionFirst(null);
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

    function shuffleCard() {
        setCards(shuffleArray([...Array(10).keys()]));
        setTargetCards(shuffleArray([...Array(10).keys()]));
        setCount(0);
        setSeconds(0);
        setCurrentState("inGame");
    }

    function getPairs() {
        let pairs = 0;
        for (let i = 0; i < 10; i++) {
            if (cards[i] == targetCards[i])
                pairs++;
        }

        if (pairs === 10) {
            setCurrentState("postGame");
        }

        return pairs;
    }

    function exchangeCard(a: number, b: number) {
        const currentArray = cards.slice();
        [currentArray[a], currentArray[b]] = [currentArray[b], currentArray[a]];
        setCards(currentArray);
        setCount(count + 1);
    }

    function generateComments() {
        switch (currentState) {
            case "preGame":
                return (<p>Please click the start button to start the card switch game.</p>);
            case "inGame":
                return (
                    <p>
                        Way to go! You did
                        {" "}
                        {count.toString()}
                        {" "}
                        exchanges. There are
                        {" "}
                        {getPairs().toString()}
                        {" "}
                        same pairs.
                    </p>
                );
            case "postGame":
                return (<p>Congratulations, YOU WIN!</p>);
            default:
                return;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-base md:text-lg lg:text-xl">
            <div className="*:block">
                <button onClick={shuffleCard}>
                    {currentState === "preGame" ? "Start Game" : "ReStart game"}
                </button>
            </div>
            <div className="flex">
                {
                    cards.map((i, index) => <Card key={i} id={i} onClick={() => { handleClick(index); }} selected={index === selectionFirst}></Card>)
                }
            </div>
            <div>
                {generateComments()}
            </div>
            <div>
                <p>
                    {("0" + Math.floor(seconds / 3600).toString()).slice(-2)}
                    :
                    {("0" + Math.floor(seconds / 60).toString()).slice(-2)}
                    :
                    {("0" + (seconds % 60).toString()).slice(-2)}
                </p>
            </div>
        </div>
    );
}
