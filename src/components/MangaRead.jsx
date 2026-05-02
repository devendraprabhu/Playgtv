import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const MangaRead = () => {
    const { id } = useParams();
    const [chapters, setChapters] = useState([]);
    const [pages, setPages] = useState([]); // Holds images for the selected chapter
    const [loading, setLoading] = useState(true);
    const [reading, setReading] = useState(false); // Toggle between list and reader

    const fetchMangaChapters = async () => {
        try {
            // Fetch with a higher limit and including essential ratings
            const response = await fetch(`https://api.mangadex.org/manga/${id}/feed?translatedLanguage[]=en&order[chapter]=asc&limit=500&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica`);
            const data = await response.json();
            
            if (data.data) {
                // Deduplicate chapters based on chapter number to avoid multiple group listings
                const seenChapters = new Set();
                const uniqueChapters = data.data.filter(chapter => {
                    const chapterNum = chapter.attributes.chapter;
                    // Handle cases where chapter might be null (e.g. oneshots)
                    const key = chapterNum || '0';
                    if (seenChapters.has(key)) return false;
                    seenChapters.add(key);
                    return true;
                });
                setChapters(uniqueChapters);
            }
            setLoading(false);
        } catch (error) {
            console.error("MangaRead Error:", error.message);
            setLoading(false);
        }
    }

    // Function to fetch images for a specific chapter
    const openChapter = async (chapterId) => {
        setLoading(true);
        setReading(true);
        try {
            const res = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`);
            const serverData = await res.json();
            const baseUrl = serverData.baseUrl;
            const hash = serverData.chapter.hash;
            const fileNames = serverData.chapter.data;

            const imageUrls = fileNames.map(file => `${baseUrl}/data/${hash}/${file}`);
            setPages(imageUrls);
            setLoading(false);
            window.scrollTo(0, 0); // Scroll to top of the chapter
        } catch (err) {
            console.error("Reader Error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMangaChapters();
    }, [id]);

    // VIEW 1: THE CINEMA SCROLL READER
    if (reading) {
        return (
            <div className="min-h-scree text-white">
                <nav className="  backdrop-blur-md z-50 p-4 flex justify-between items-center border-b border-white/10">
                    <button onClick={() => setReading(false)} className="text-xl uppercase tracking-widest hover:text-blue-400 ">← Back to Chapters</button>
                    <span className="text-xl font-bold">Cinema Mode</span>
                    <div className="w-10"></div>
                </nav>
                <main className="pt-15 flex flex-col items-center gap-1">
                    {loading ? (
                        <div className="h-screen flex items-center animate-pulse font-akira text-xl">Loading Panels...</div>
                    ) : (
                        pages.map((url, index) => (
                            <img key={index} src={url} alt={`Page ${index}`} className="max-w-full md:max-w-[850px]" loading="lazy" />
                        ))
                    )}
                </main>
            </div>
        );
    }

    // VIEW 2: THE CHAPTER LIST
    return (
        <div className='text-center text-white max-w-5xl mx-auto p-5'>
            <div className="flex justify-between items-center mb-10 mt-5">
                <Link to={`/Mangapage/${id}`} className="text-sm font-akira hover:text-blue-400">← Back to Info</Link>
                <h1 className="text-3xl font-akira">Chapters</h1>
                {/* START READING BUTTON */}
                <button
                    onClick={() => chapters.length > 0 && openChapter(chapters[0].id)}
                    className="bg-blue-600 px-6 py-2 rounded-full font-akira text-sm hover:bg-blue-700 transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                >
                    🚀 Start Reading
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chapters.length > 0 ? (
                    chapters.map((chapter) => (
                        <div
                            key={chapter.id}
                            onClick={() => openChapter(chapter.id)}
                            className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/20 transition-all cursor-pointer text-left group"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                                    Chapter {chapter.attributes.chapter || '?'}: {chapter.attributes.title || 'Untitled'}
                                </h2>
                                <span className="text-xs text-gray-500 uppercase">EN</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                        <p className="text-xl font-akira text-slate-500 mb-4 tracking-widest">No Chapters Found</p>
                        <p className="text-sm text-slate-600">This manga might not have English translations available on MangaDex.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MangaRead;