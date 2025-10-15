"use client";
import React, { useState } from "react";

const size = 8;

enum state {
    EMPTY,
    BLACK,
    WHITE,
}

type player = Extract<state, state.BLACK | state.WHITE>;

const initialBoardState: state[][] = Array.from(Array(size)).map(() => Array.from(Array(size)).map(() => state.EMPTY));

initialBoardState[3][3] = state.WHITE;
initialBoardState[3][4] = state.BLACK;
initialBoardState[4][3] = state.BLACK;
initialBoardState[4][4] = state.WHITE;

export default function Board() {
    const [boardState, setBoardState] = useState(initialBoardState);
    const [currentPlayer, setCurrentPlayer] = useState<player>(state.WHITE);

    function handleSquareClick(row: number, col: number) {
        const newBoardState = boardState.map(s => [...s]);
        let canPlay = false;

        // If the square is empty, place the current player's piece
        if (newBoardState[row][col] == state.EMPTY) {
            const adjacent = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
            for (const [dx, dy] of adjacent) {
                const pendingSet = new Set<[number, number]>();
                let newRow = row + dx;
                let newCol = col + dy;
                while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    console.log(newRow, newCol);
                    const currentValue = newBoardState[newRow][newCol];

                    if (currentValue === state.EMPTY) {
                        break;
                    }

                    if (currentValue === currentPlayer) {
                        if (pendingSet.size != 0) canPlay = true;
                        pendingSet.forEach(([r, c]) => {
                            newBoardState[r][c] = currentPlayer;
                        });
                        break;
                    }

                    pendingSet.add([newRow, newCol]);

                    newRow += dx;
                    newCol += dy;
                }
            }

            if (canPlay) {
                newBoardState[row][col] = currentPlayer;
                setBoardState(newBoardState);

                setCurrentPlayer(currentPlayer === state.WHITE ? state.BLACK : state.WHITE);
            }
        }
    };

    function handlePassClick() {
        setCurrentPlayer(currentPlayer === state.WHITE ? state.BLACK : state.WHITE);
    }

    let whiteCount = 0;
    let blackCount = 0;

    // Count current white and black total.
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            switch (boardState[row][col]) {
                case state.WHITE:
                    whiteCount++;
                    break;
                case state.BLACK:
                    blackCount++;
                    break;
                default:
                    break;
            }
        }
    }

    let winner = null;

    if (whiteCount + blackCount === 64) {
        if (whiteCount > blackCount) winner = "white";
        else if (whiteCount = blackCount) winner = "even";
        else winner = "black";
    }

    return (
        <div className="flex flex-col items-center gap-5">
            <h2>
                {(winner === null)
                    ? (`Current Turn: ${currentPlayer === state.BLACK ? "Black" : "White"} (White: ${whiteCount.toString()} Black: ${blackCount.toString()})`)
                    : (`Winner: ${winner}`)}
            </h2>
            <div className="grid grid-cols-8 grid-rows-8 w-96 h-96 border-2 border-neutral-800">
                {boardState.map((s, r) => s.map((square, c) => (
                    <div
                        key={`${r.toString()} ${c.toString()}`}
                        className={`w-12 h-12 relative flex flex-center items-center justify-center cursor-pointer ${(r + c) % 2 === 1 ? "bg-[#769656]" : "bg-[#eeeed2]"}`}
                        onClick={() => { handleSquareClick(r, c); }}
                    >
                        {square != state.EMPTY && <div className={`w-10 h-10 rounded-[50vw] ${square === state.BLACK ? "bg-black  border-1 border-solid border-white" : "bg-white border-1 border-solid border-black"}`} />}
                    </div>
                ))).flat()}
            </div>
            <div>
                <button className="border-2" onClick={handlePassClick}>Pass</button>
            </div>
        </div>
    );
}
