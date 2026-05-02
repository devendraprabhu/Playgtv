import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <div className="p-6">
                <nav className='text-center py-6 bg-white/5 backdrop-blur border-b-2 border-white/20' >
                    <h1 className='font-bold text-5xl mt-3 font-akira tracking-wider text-white'>MangaReader</h1>
                    <div className='flex justify-center mt-9 gap-6 flex-wrap'>
                        <Link to="/Home" className='px-3 cursor-pointer text-lg font-akira hover:text-blue-300 transition-all'>Home</Link>
                        <Link to="/popular" className='px-3 cursor-pointer text-lg font-akira hover:text-blue-300 transition-all'>Popular</Link>
                        <Link to="/new" className='px-3 cursor-pointer text-lg font-akira hover:text-blue-300 transition-all'>New</Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Nav