import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <div className="p-6">
                <nav className='text-center py-6' >
                    <h1 className='font-bold text-5xl mt-3 font-akira tracking-wider text-white'>PlayGTV</h1>
                    <div className='flex justify-center mt-9 gap-6 flex-wrap'>
                        <Link to="/" className='px-3 cursor-pointer text-lg font-akira hover:text-blue-300 transition-all'>Home</Link>
                        <Link to="/popular" className='px-3 cursor-pointer text-lg font-akira hover:text-blue-300 transition-all'>Popular</Link>
                        <Link to="/new" className='px-3 cursor-pointer text-lg font-akira hover:text-blue-300 transition-all'>New</Link>
                        <Link to="/upcoming" className='px-3 cursor-pointer text-lg font-akira hover:text-blue-300 transition-all'>Upload your game</Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Nav