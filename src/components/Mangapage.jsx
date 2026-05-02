import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';

const Mangapage = () => {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params);

    const [mangaDetails, setmangaDetails] = useState(null);

    const fetchmangaDetails = async () => {
        try {
            const response = await fetch(`https://api.mangadex.org/manga/${params.id}?includes[]=cover_art`);
            if (!response.ok) throw new Error("Failed to fetch manga details");

            const data = await response.json();
            if (!data.data) throw new Error("Manga data not found");

            const manga = data.data;
            const attributes = manga.attributes;

            // Robust cover art retrieval
            const coverRel = manga.relationships.find(rel => rel.type === 'cover_art');
            const coverFileName = coverRel?.attributes?.fileName;
            const coverUrl = coverFileName
                ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.512.jpg`
                : 'https://via.placeholder.com/512x768?text=No+Cover';

            const formattedDetails = {
                title: attributes.title.en || attributes.title.ja || attributes.title["ja-ro"] || Object.values(attributes.title)[0] || "Unknown Title",
                images: {
                    jpg: {
                        large_image_url: coverUrl
                    }
                },
                synopsis: attributes.description.en || attributes.description.ja || Object.values(attributes.description)[0] || "No description available.",
                score: attributes.status?.toUpperCase() || "UNKNOWN",
                scored_by: attributes.year || "N/A"
            };

            setmangaDetails(formattedDetails);
        }
        catch (erro) {
            console.error("MangaPage Error:", erro.message);
            setmangaDetails({ error: true, message: erro.message });
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchmangaDetails();
        }
    }, [params.id])

    if (!mangaDetails) {
        return <div className="text-white text-center mt-20 font-akira text-2xl animate-pulse">Syncing with MangaDex...</div>;
    }

    if (mangaDetails.error) {
        return (
            <div className="text-white text-center mt-20 p-10">
                <h1 className="text-3xl font-akira text-red-500 mb-5">Access Denied</h1>
                <p className="text-xl text-slate-400 mb-8">{mangaDetails.message}</p>
                <button onClick={() => navigate(-1)} className="px-8 py-3 bg-white/10 rounded-full font-akira hover:bg-white/20 transition-all">Go Back</button>
            </div>
        );
    }

    return (
        <div className='text-center text-3xl mt-5 text-white relative max-w-7xl mx-auto'>
            <div className="flex flex-col bg-slate-950 relative rounded-3xl overflow-hidden">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 md:top-8 md:left-8 px-6 py-3 bg-black/50 hover:bg-white/20 text-white font-akira text-lg rounded-xl backdrop-blur-md border border-white/20 shadow-lg transition-all flex items-center gap-2 z-10 hover:scale-105 cursor-pointer"
                >
                    ⬅ Back
                </button>

                <img src={mangaDetails.images.jpg.large_image_url} alt={mangaDetails.title} className='
                 mx-auto block h-150 rounded-2xl mt-5' />
                <h2 className='mt-4 text-2xl font-bold text-white font-akira'>{mangaDetails.title}</h2>


                <Link to={`/MangaRead/${params.id}`} className="mt-6 mx-auto inline-block">
                    <button className="relative overflow-hidden px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-akira text-2xl rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] hover:scale-105 transition-all duration-300 group">
                        <span className="relative z-10 flex items-center gap-2">
                            📖 Read Now
                        </span>
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                    </button>
                </Link>

                <div className='h-90 w-auto rounded-2xl border-white border-2 mx-auto mt-9 p-5 overflow-hidden'>

                    <p className="text-lg leading-relaxed">{mangaDetails.synopsis}</p>

                    <div className='flex flex-wrap justify-center gap-6 mt-8'>
                        <div className='flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-md shadow-lg hover:scale-105 transition-transform cursor-default'>
                            <span className="text-2xl drop-shadow-md">📊</span>
                            <p className="text-xl font-bold tracking-wide">Status: <span className="text-blue-300">{mangaDetails.score}</span></p>
                        </div>
                        <div className='flex items-center gap-3 px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-md shadow-lg hover:scale-105 transition-transform cursor-default'>
                            <span className="text-2xl drop-shadow-md">📅</span>
                            <p className="text-xl font-bold tracking-wide">Year: <span className="text-blue-300">{mangaDetails.scored_by}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mangapage