import { JSX } from "react";

export default function Bottle({ id, selected, onClick }: Readonly<{ id: number; selected: boolean; onClick: () => void }>): JSX.Element {
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

    if (selected) {
        return (
            <div>
                <button className="border-2 rounded-md h-25 w-30" style={{ backgroundColor: colors[id] }} onClick={onClick} />
            </div>
        );
    }
    else {
        return (
            <div>
                <button className="border-0 rounded-md h-30 w-30" style={{ backgroundColor: colors[id] }} onClick={onClick} />
            </div>
        );
    }
}
