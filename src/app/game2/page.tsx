"use client";

import { useState, useEffect, useRef } from "react";
import Card from "./components/Card";

export default function SwitchCard() {
    const orders = [...Array(10).keys()];
    const [cards, setCards] = useState(orders);
    const [targetCards, setTargetCards] = useState(orders);
    const [selectionFirst, setSelectionFirst] = useState<number | null>(null);
    const [count, setCount] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const interval = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (isActive) {
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
    }, [isActive]); // Re-run effect when isActive or seconds change

    function handleClick(i: number) {
        if (!gameStarted) {
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
        setGameStarted(true);
        setCards(shuffleArray([...Array(10).keys()]));
        setTargetCards(shuffleArray([...Array(10).keys()]));
        setCount(0);
        setSeconds(0);
        setIsActive(true);
    }

    function getPairs() {
        let pairs = 0;
        for (let i = 0; i < 10; i++) {
            if (cards[i] == targetCards[i])
                pairs++;
        }

        return pairs;
    }

    function exchangeCard(a: number, b: number) {
        const currentArray = cards.slice();
        [currentArray[a], currentArray[b]] = [currentArray[b], currentArray[a]];
        setCards(currentArray);
        setCount(count + 1);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-base md:text-lg lg:text-xl">
            <div className="*:block">
                <button onClick={shuffleCard}>
                    {gameStarted ? "ReStart game" : "Start Game"}
                </button>
            </div>
            <div className="flex">
                {
                    cards.map((i, index) => <Card key={i} id={i} onClick={() => { handleClick(index); }} selected={index === selectionFirst}></Card>)
                }
            </div>
            <div>
                {gameStarted
                    ? (getPairs() == 10
                            ? <p>Congratulations, YOU WIN!</p>
                            : (
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
                                ))
                    : `Please click the start button to start the card switch game.`}
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
