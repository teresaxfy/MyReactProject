"use client";
import { JSX } from "react";

export default function Card({
    id,
    onClick,
    selected,
}: Readonly<{
    id: number;
    onClick: () => void;
    selected: boolean;
}>): JSX.Element {
    const colors = [
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

    return (
        <button
            onClick={onClick}
            className={`border-2 rounded-md  ${selected ? "h-[10vw] w-[10vw]" : "border-white h-[10vw] w-[10vw]"}`}
            style={{ backgroundColor: colors[id] }}
        />
    );
}
