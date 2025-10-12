import { FaSpinner } from "react-icons/fa";

export default function Home() {
    return (
        <>
            <div className="flex min-h-screen flex-row items-center justify-center bg-gray-950 px-4">
                <div className="flex flex-col items-center justify-center p-12 text-center text-white">
                    <p className="text-sm uppercase tracking-widest text-white">Welcome to My React Pages</p>
                    <h1 className="mt-2 text-4xl font-extrabold md:text-6xl">
                        A new kind of experience.
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-gray-400">
                        Explore the possibilities and learn something new every day.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    {/* The spinning React icon */}
                    <FaSpinner className="h-10 w-10 animate-spin text-blue-500 md:h-12 md:w-12" />

                    <h1 className="mt-4 bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
                        Welcome to My React Pages.
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-gray-400">
                        Explore the possibilities and learn something new every day.
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    <h1 className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-5xl font-black text-transparent md:text-7xl">
                        Where imagination comes alive.
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-gray-400">
                        Dive into a world of endless creativity and inspiration.
                    </p>
                </div>
            </div>
        </>
    );
}
