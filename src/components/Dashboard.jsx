import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeGame, setActiveGame] = useState(null); // To track which game is being played

    // CORS Proxy + FreeToGame API
    const gameurl = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://www.freetogame.com/api/games?platform=browser");

    const fetchGames = async () => {
        try {
            const res = await axios.get(gameurl);
            setGames(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching games:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    if (loading) return <div className="text-white text-center mt-10 font-akira">Loading PLAYGTV...</div>;

    return (
        <div className="bg-slate-950 min-h-screen pb-20">

            {/* 1. THE GAME PLAYER (Only shows when a game is selected) */}
            {activeGame && (
                <div className="flex flex-col items-center pt-10">
                    <button
                        onClick={() => setActiveGame(null)}
                        className="mb-4 bg-red-500 text-white font-akira px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all"
                    >
                        CLOSE GAME
                    </button>

                    {/* THIS IS THE IFRAME THAT PLAYS THE GAME ON YOUR SITE */}
                    <div className="w-full max-w-5xl aspect-video bg-black border-8 border-black shadow-[20px_20px_0px_0px_#000] rounded-xl overflow-hidden">
                        <iframe
                            src={activeGame.game_url}
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                            title="Game Player"
                        />
                    </div>
                    <h1 className="font-akira text-3xl text-white mt-8 uppercase">{activeGame.title}</h1>
                </div>
            )}

            {/* 2. THE GAME GRID (Hidden if a game is playing for better focus) */}
            {!activeGame && (
                <div>
                    <h1 className='font-akira text-2xl text-center pt-10 text-white tracking-widest'>
                        Now Playing on PlayGTV
                    </h1>
                    <div className='flex justify-center mt-12 flex-wrap gap-12 px-10'>
                        {games.slice(0, 20).map((game) => (
                            <div key={game.id} className='w-80 bg-white border-4 border-black rounded-xl shadow-[10px_10px_0px_0px_#000] overflow-hidden hover:-translate-y-2 hover:shadow-[15px_15px_0px_0px_#000] transition-all flex flex-col group'>
                                <div className='h-48 w-full border-b-4 border-black overflow-hidden'>
                                    <img src={game.thumbnail} className='object-cover h-full w-full group-hover:scale-110 transition-all duration-500' alt="Game" />
                                </div>
                                <div className='p-6 flex flex-col flex-grow bg-white'>
                                    <h6 className='text-center font-akira text-xl text-black truncate'>{game.title}</h6>
                                    <p className='text-gray-800 text-sm mt-3 mb-6 line-clamp-3 italic font-medium'>{game.short_description}</p>

                                    {/* UPDATED BUTTON: Sets the Active Game instead of opening a new window */}
                                    <button
                                        onClick={() => setActiveGame(game)}
                                        className='w-full py-3 bg-blue-400 border-4 border-black rounded-xl text-lg font-bold font-akira shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-black'
                                    >
                                        Play Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;