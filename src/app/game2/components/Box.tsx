import { JSX } from "react";
import Card from "./Card";

enum PicType {
    Pic_LABUBU,
    NoPic_COLORS,
}

export default function Box({ cards, targetCards, showCard, showTargetCard, onClick, selectionFirst, picType, size }: Readonly<{ cards: number[]; targetCards: number[]; showCard: boolean; showTargetCard: boolean; onClick: (arg0: number) => void; selectionFirst: null | number; picType: PicType; size: number }>): JSX.Element {
    return (
        <>
            <div className="flex">
                { showCard
                    && cards.map((i, index) => <Card key={i} id={i} onClick={() => { onClick(index); }} size={size} selected={index === selectionFirst} picType={picType}></Card>)}
            </div>
            <div className="flex">
                {
                    showTargetCard && targetCards.map(i => <Card key={i} onClick={() => { ; }} selected={false} size={size} id={i} picType={picType}></Card>)
                }
            </div>
        </>

    );
}
