"use client";
import { JSX } from "react";
import Image from "next/image";
import labubu0 from "./labubu0.png";
import labubu1 from "./labubu1.png";
import labubu2 from "./labubu2.png";
import labubu3 from "./labubu3.png";
import labubu4 from "./labubu4.png";
import labubu5 from "./labubu5.png";
import labubu6 from "./labubu6.png";
import labubu7 from "./labubu7.png";
import labubu8 from "./labubu8.png";
import labubu9 from "./labubu9.png";

const picCollection = [
    { picID: 0, image: labubu0, name: "Vans" },
    { picID: 1, image: labubu1, name: "Be Fancy Now" },
    { picID: 2, image: labubu2, name: "Jump For Joy" },
    { picID: 3, image: labubu3, name: "Dress Be Latte" },
    { picID: 4, image: labubu4, name: "Fall Into Spring" },
    { picID: 5, image: labubu5, name: "Secret ID" },
    { picID: 6, image: labubu6, name: "Wings Of Fantasy" },
    { picID: 7, image: labubu7, name: "Catch Me If You Like Me" },
    { picID: 8, image: labubu8, name: "Work By Fortune" },
    { picID: 9, image: labubu9, name: "Best Of Luck" },
];

const colorsCollection = [
    "oklch(70.4% 0.191 22.216)",
    "oklch(75% 0.183 55.934)",
    "oklch(90.5% 0.182 98.111)",
    "oklch(89.7% 0.196 126.665)",
    "oklch(76.5% 0.177 163.223)",
    "oklch(78.9% 0.154 211.53)",
    "oklch(48.8% 0.243 264.376)",
    "oklch(58.5% 0.233 277.117)",
    "oklch(62.7% 0.265 303.9)",
    "oklch(74% 0.238 322.16)",
];

enum PicType {
    Pic_LABUBU,
    NoPic_COLORS,
}

export default function Card({
    id,
    onClick,
    selected,
    size,
    picType,
}: Readonly<{
    key: number;
    id: number;
    onClick: () => void;
    selected: boolean;
    size: number;
    picType: PicType;
}>): JSX.Element {
    switch (picType) {
        case PicType.Pic_LABUBU:
            return (
            /* <span className="flex justify-center border-2 bg-indigo-400 text-amber-100 lg:text-[1rem] text-[1vm]">
                        {picCollection[id].name}
                    </span> */
                <div>
                    <Image
                        draggable="false"
                        src={picCollection[id].image}
                        className={` border-2 rounded-md h-[${Math.floor(100 / size).toString()}vw] w-[${Math.floor(100 / size).toString()}vw] ${selected ? "border-red-500 border-4" : "hover:border-purple-500 hover:border-4"}`}
                        alt="labubu"
                        onClick={onClick}
                    />
                </div>
            );
        case PicType.NoPic_COLORS:
            return (
                <div>
                    <button
                        onClick={onClick}
                        className={`border-2 rounded-md  h-[10vw] w-[10vw] ${selected ? "border-red-500 border-4" : "border-white hover:border-gray-950 hover:border-4"}`}
                        style={{ backgroundColor: colorsCollection[id] }}
                    />
                </div>
            );
        default:
            return (
                <div></div>
            );
    }
}
