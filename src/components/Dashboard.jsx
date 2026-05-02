import React from 'react'

const Dashboard = () => {
    return (
        <div>
            <div>
                {/* Having the Top trending Games*/}
                <div className='flex justify-center mt-9'>
                    <div className='flex h-100 w-200 bg-blue-400 rounded-lg   '>
                        <img src="https://i.ytimg.com/vi/oQpRzQgBWpc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAFcQCoCNs_tbw5FL-8wBm78PwR9A" alt=""
                            className='w-full rounded-lg hover:scale-110 transition-all duration-300' />
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <h1 className='font-akira text-lg text-center mt-3'>Now Playing on PlayGTV</h1>
                    <div className='flex ml-8 mt-9 flex-wrap gap-8'>
                        <div className='w-80 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_#000] overflow-hidden hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#000] transition-all flex flex-col group'>
                            <div className='h-48 w-full border-b-4 border-black overflow-hidden relative'>
                                <img src="https://upload.wikimedia.org/wikipedia/en/8/8e/Need_for_Speed_Most_Wanted_Box_Art.jpg"
                                    className='object-cover h-full w-full group-hover:scale-110 transition-transform duration-500' alt="Game Cover" />
                            </div>
                            <div className='p-6 flex flex-col flex-grow bg-white'>
                                <h6 className='text-center mt-3 font-akira text-xl text-black'>Game Title</h6>
                                <p className='text-gray-800 text-sm mt-3 mb-6 flex-grow font-medium leading-relaxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, aut. Omnis laborum ipsa laudantium modi dicta quaerat magni molestiae beatae tempore voluptatem ducimus sit necessitatibus, impedit esse dolores suscipit repellendus.</p>
                                <button className='w-full py-3 bg-blue-400 border-4 border-black rounded-xl cursor-pointer text-lg font-bold font-akira shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-black'>Play Now</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default Dashboard