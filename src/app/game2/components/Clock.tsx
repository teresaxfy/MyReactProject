import { useState, useEffect, useRef } from "react";
import { JSX } from "react";

export default function Clock({ show, isOn, startTime }: Readonly<{ show: boolean; isOn: boolean; startTime: string | null }>): JSX.Element {
    const [seconds, setSeconds] = useState(0);
    const interval = useRef<ReturnType<typeof setInterval> | null>(null);
    const start = useRef<string | null>(null);

    useEffect(() => {
        if (startTime !== start.current) {
            start.current = startTime;
            setSeconds(0);
        }

        if (isOn) {
            interval.current = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000); // Update every second (1000ms)
        }
        else {
            if (interval.current !== null) {
                clearInterval(interval.current);
            }
        }
        return () => {
            if (interval.current !== null) {
                clearInterval(interval.current);
            }
        }; // Cleanup on component unmount or isOn change
    }, [isOn, startTime]); // Re-run effect when isOn or start time change

    return (
        <div className="flex w-20">
            {show
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
    );
}
