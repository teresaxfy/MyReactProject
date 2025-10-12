import React from "react";
import Board2 from "./components/Board2";

export default function BlackWhiteGame() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>8x8 Board</h1>
            <Board2 />
        </div>
    );
}
