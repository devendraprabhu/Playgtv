import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [mangaList, setmangaList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMangaDexList = async () => {
        try {
            // Fetching top-rated or popular manga from MangaDex
            // includes[]=cover_art allows us to get the cover image filename in the same response
            const response = await fetch("https://api.mangadex.org/manga?limit=20&includes[]=cover_art&contentRating[]=safe&order[followedCount]=desc");
            const data = await response.json();

            if (!data.data) throw new Error("No data received from MangaDex");

            // Transform MangaDex data structure to match your UI needs
            const formattedList = data.data.map(manga => {
                const coverRel = manga.relationships.find(rel => rel.type === 'cover_art');
                const fileName = coverRel?.attributes?.fileName;

                return {
                    id: manga.id, // This is the UUID required for MangaDex
                    title: manga.attributes.title.en || Object.values(manga.attributes.title)[0],
                    coverUrl: fileName
                        ? `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.512.jpg`
                        : 'https://via.placeholder.com/512x768?text=No+Cover'
                };
            });

            setmangaList(formattedList);
            setLoading(false);
        }
        catch (erro) {
            console.log(erro.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMangaDexList();
    }, []);

    if (loading) {
        return <div className="text-white text-center mt-20 font-akira animate-pulse">Fetching MangaDex Data...</div>;
    }

    return (
        <div className="text-center font-akira text-3xl mt-5 text-white">
            <h1>Trending on MangaDex</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4">
                {mangaList.map((manga) => (
                    <Link to={`/Mangapage/${manga.id}`} key={manga.id} className="block group">
                        <div className="relative aspect-[2/3] rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] group-hover:-translate-y-2 flex flex-col">
                            {/* Poster Image */}
                            <img
                                src={manga.coverUrl}
                                alt={manga.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Sophisticated Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-left transform transition-transform duration-500">
                                <div className="space-y-3">
                                    <h2 className="text-lg font-black text-white line-clamp-2 uppercase tracking-tighter leading-none group-hover:text-blue-400 transition-colors drop-shadow-lg">
                                        {manga.title}
                                    </h2>

                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                            <p className="text-[10px] text-blue-300 uppercase tracking-[0.3em] font-black">Trending</p>
                                        </div>
                                        <span className="text-[10px] text-white/40 uppercase font-bold px-2 py-1 border border-white/10 rounded-md backdrop-blur-md">
                                            MDX
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Accent Glow on Hover */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;