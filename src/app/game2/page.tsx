"use client";

import { useState, useRef } from "react";
import useSound from "use-sound";
import Instructions from "./components/Instructions";
import Image from "next/image";
import labubuS from "./components/labubuIcon.png";
import Clock from "./components/Clock";
import Box from "./components/Box";

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
    const [size, setSize] = useState(5);
    const [level, setLevel] = useState(0);
    const orders = [...Array(size).keys()];
    const [cards, setCards] = useState([orders]);
    const [targetCards, setTargetCards] = useState(orders);

    const [selectionFirst, setSelectionFirst] = useState<number | null>(null);
    const [gameStatus, setGameStatus] = useState(GameState.PRE_GAME);

    const [hintState, setHintState] = useState(true);
    const [instructionState, setInstructionState] = useState(false);
    const [myPicType, setMyPicType] = useState(PicType.Pic_LABUBU);

    const [playGoodJobSound] = useSound("./sounds/goodJob.wav");
    const [playGameWinSound] = useSound("./sounds/gameWin.mp3");
    const [playWrongSound] = useSound("./sounds/wrong-choice.wav");

    const [remarks, setRemarks] = useState("Please click the start button to start the card swap game.");
    const gameStart = useRef<string | null>(null);

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
        const currentArray = shuffleArray([...Array(size).keys()]);
        setCards([currentArray]);
        const targetArray = shuffleArray([...Array(size).keys()]);
        let pairs = 0;
        for (let i = 0; i < size; i++) {
            if (currentArray[i] == targetArray[i])
                pairs++;
        }
        setRemarks(`${pairs.toString()} pairs.`);
        setTargetCards(targetArray);
        showHideHint();
        setGameStatus(GameState.IN_GAME);
    }

    function exchangeCard(a: number, b: number) {
        const currentArray = cards[cards.length - 1].slice();
        [currentArray[a], currentArray[b]] = [currentArray[b], currentArray[a]];
        setCards([...cards, currentArray]);
        getPairs(currentArray);
    }

    function showHideHint() {
        setHintState(!hintState);
    }

    function showHideInstructions() {
        setInstructionState(!instructionState);
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
        gameStart.current = Date();
        // setRemarks("Ready to play.");
    }

    function getPairs(currentArray: number[]) {
        let pairs = 0;
        for (let i = 0; i < size; i++) {
            if (currentArray[i] == targetCards[i])
                pairs++;
        }

        let previousPairs = 0;
        if (gameStatus === GameState.IN_GAME && cards.length > 0) {
            previousPairs = 0;
            for (let i = 0; i < size; i++) {
                if (cards[cards.length - 1][i] == targetCards[i])
                    previousPairs++;
            }

            if (pairs > previousPairs) {
                if (pairs === size) {
                    setGameStatus(GameState.POST_GAME);
                    playGameWinSound();
                    setHintState(true);
                    if (size === 10) {
                        setRemarks("Congratulations! Mission complete!");
                    }
                    else {
                        setLevel(level + 1);
                        setSize(size + 1);
                        setRemarks(`You win! You are now on Level ${(level + 1).toString()}`);
                    }
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
            <div className="flex flex-col items-center justify-baseline min-h-screen text-base md:text-lg lg:text-xl">
                <Box
                    cards={cards[cards.length - 1]}
                    targetCards={targetCards}
                    showCard={gameStatus != GameState.PRE_GAME}
                    showTargetCard={hintState || level < 2 || gameStatus == GameState.POST_GAME}
                    onClick={handleClick}
                    size={size}
                    selectionFirst={selectionFirst}
                    picType={myPicType}
                >
                </Box>
                <div className="flex h-10">
                    <Clock show={gameStatus != GameState.PRE_GAME} isOn={gameStatus == GameState.IN_GAME} startTime={gameStart.current}></Clock>
                </div>
                <div className="flex h-20 text-2xl text-black">
                    <div>
                        {remarks}
                    </div>
                </div>
                <div className="flex h-20">
                    <div>
                        <button className="w-50 hover:bg-gray-500" onClick={startNewGame}>{gameStatus === GameState.IN_GAME ? `Reshuffle [Level ${level.toString()}]` : `Start Level ${level.toString()}`}</button>
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
