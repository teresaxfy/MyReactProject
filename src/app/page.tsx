import { FaSpinner } from "react-icons/fa";

export default function Home() {
    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4">

                <FaSpinner className="h-10 w-10 animate-spin text-blue-500 md:h-12 md:w-12" />

                <h1 className="mt-4 bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
                    Welcome to my coding world!
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-gray-400">
                    Enjoy the games and have a wonderful day
                </p>
            </div>
        </>
    );
}
