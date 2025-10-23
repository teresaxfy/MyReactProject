"use client";

import { useState, useEffect, useRef } from "react";
import Card from "./components/Card";
import useSound from "use-sound";
import Instructions from "./components/Instructions";
import Image from "next/image";
import labubuS from "./components/labubuIcon.png";

enum GameState {
    PRE_GAME,
    IN_GAME,
    POST_GAME,
}

enum PicType {
    Pic_LABUBU,
    NoPic_COLORS,
}

export default function SwapCard() {
    const orders = [...Array(10).keys()];
    const [cards, setCards] = useState([orders]);
    const [targetCards, setTargetCards] = useState(orders);

    const [selectionFirst, setSelectionFirst] = useState<number | null>(null);
    const [gameStatus, setGameStatus] = useState(GameState.PRE_GAME);

    const [hintState, setHintState] = useState(false);
    const [instructionState, setInstructionState] = useState(false);
    const [revertState, setRevertState] = useState(false);
    const [myPicType, setMyPicType] = useState(PicType.Pic_LABUBU);

    const [playGoodJobSound] = useSound("./sounds/goodJob.wav");
    const [playGameWinSound] = useSound("./sounds/gameWin.mp3");
    const [playWrongSound] = useSound("./sounds/wrong-choice.wav");

    const [seconds, setSeconds] = useState(0);
    const [remarks, setRemarks] = useState("Please click the start button to start the card swap game.");
    const interval = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (gameStatus === GameState.IN_GAME) {
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
    }, [gameStatus]); // Re-run effect when isActive or seconds change

    function handleClick(i: number) {
        if (gameStatus != GameState.IN_GAME) {
            return;
        }

        if (selectionFirst === null) {
            setSelectionFirst(i);
            return;
        }

        if (selectionFirst == i) {
            return;
        }

        console.log(`Exchanging ${selectionFirst.toString()} with ${i.toString()}`);
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
        setSeconds(0);
        setCards([shuffleArray([...Array(10).keys()])]);
        setTargetCards(shuffleArray([...Array(10).keys()]));
        showHideHint();
        setGameStatus(GameState.IN_GAME);
    }

    function exchangeCard(a: number, b: number) {
        const currentArray = cards[cards.length - 1].slice();
        [currentArray[a], currentArray[b]] = [currentArray[b], currentArray[a]];
        setCards([...cards, currentArray]);
        getPairs(currentArray);
        setRevertState(true);
    }

    function showHideHint() {
        setHintState(!hintState);
    }

    function showHideInstructions() {
        setInstructionState(!instructionState);
    }

    function revertExchange() {
        if (!revertState) return;
        if (cards.length == 1) return;

        setCards(cards.slice(0, cards.length - 1));
        setRemarks("Oh, you did a revert.");
        setRevertState(false);
    }

    function startNewGame() {
        if (gameStatus == GameState.IN_GAME) {
            if (window.confirm("Are you sure you want to start new game? All progress will be lost!")) {
                console.log("user clicked start new game button and restarted the game.");
            }
            else {
                return;
            }
        }

        setGameStatus(GameState.PRE_GAME);
        shuffleCard();
        setHintState(false);
        setInstructionState(false);
        setRemarks("Cards are shuffled and in an incorrect order. Can you swap them to the correct order? Have fun!");
    }

    function getPairs(currentArray: number[]) {
        let pairs = 0;
        for (let i = 0; i < 10; i++) {
            if (currentArray[i] == targetCards[i])
                pairs++;
        }

        let previousPairs = 0;
        if (gameStatus === GameState.IN_GAME && cards.length > 0) {
            previousPairs = 0;
            for (let i = 0; i < 10; i++) {
                if (cards[cards.length - 1][i] == targetCards[i])
                    previousPairs++;
            }

            if (pairs > previousPairs) {
                if (pairs === 10) {
                    setGameStatus(GameState.POST_GAME);
                    playGameWinSound();
                    setHintState(true);
                    setRemarks("You win!");
                }
                else {
                    playGoodJobSound();
                    setRemarks(`Good Job! ${previousPairs.toString()} -> ${pairs.toString()}`);
                }
            }
            else if (pairs < previousPairs) {
                playWrongSound();
                setRemarks(`Opps! ${previousPairs.toString()} -> ${pairs.toString()}`);
            }
            else {
                setRemarks(`No change? ${previousPairs.toString()} -> ${pairs.toString()}`);
            }
        }
    }

    function switchPictures(target: PicType) {
        setMyPicType(target);
    }

    return (
        <>
            <div className="flex h-20 flex-row items-start">
                <div className="flex w-20">
                    {gameStatus != GameState.PRE_GAME
                        && (
                            <p>
                                {("0" + Math.floor(seconds / 3600).toString()).slice(-2)}
                                :
                                {("0" + Math.floor(seconds / 60).toString()).slice(-2)}
                                :
                                {("0" + (seconds % 60).toString()).slice(-2)}
                            </p>
                        )}
                </div>
            </div>
            <div className="flex flex-col items-center justify-baseline min-h-screen text-base md:text-lg lg:text-xl">
                <div className="flex">
                    { gameStatus != GameState.PRE_GAME
                        && cards[cards.length - 1].map((i, index) => <Card key={i} id={i} onClick={() => { handleClick(index); }} selected={index === selectionFirst} picType={myPicType}></Card>)}
                </div>
                <div className="flex">
                    {
                        hintState && targetCards.map(i => <Card key={i} onClick={() => { ; }} selected={false} id={i} picType={myPicType}></Card>)
                    }
                </div>
                <div className="flex h-20">
                    <p></p>
                </div>
                <div className="flex h-20 text-4xl text-black">
                    <div>
                        {remarks}
                    </div>
                </div>
                <div className="flex h-20">
                    <div>
                        <button className="w-50 hover:bg-gray-400" onClick={startNewGame}>{gameStatus === GameState.PRE_GAME ? "Start Game" : "Start a new game"}</button>
                    </div>
                    <div className="flex w-30"></div>
                    <div>
                        { revertState && gameStatus === GameState.IN_GAME && <button className="w-50 hover:bg-gray-400" onClick={revertExchange}>Revert Previous Step</button>}
                    </div>
                </div>
                <div className="flex h-20">
                    <button
                        className={`h-[80] w-[80] ${myPicType === PicType.NoPic_COLORS ? "border-purple-600 border-4" : "border-white "}`}
                        style={{ backgroundColor: "oklch(90.5% 0.182 98.111)" }}
                        onClick={() => { switchPictures(PicType.NoPic_COLORS); }}
                    />
                    <div className="w-20">
                    </div>
                    <Image
                        src={labubuS}
                        alt="labubu-small"
                        className={`flex ${myPicType === PicType.Pic_LABUBU ? "border-purple-600 border-4" : " border-white"}`}
                        onClick={() => { switchPictures(PicType.Pic_LABUBU); }}
                    />
                </div>
                <div className="flex h-10">
                </div>

                <div>
                    <button
                        className="w-100 hover:bg-gray-400"
                        onClick={showHideInstructions}
                    >
                        {instructionState ? "Hide instructions" : "Show instructions"}
                    </button>
                </div>
                <div>
                    {instructionState
                        && <Instructions></Instructions>}
                </div>
            </div>
        </>
    );
}
