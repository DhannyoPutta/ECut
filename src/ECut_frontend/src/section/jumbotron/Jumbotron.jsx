import React from 'react'

const Jumbotron = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-[url(/final.png)] bg-cover text-white'>
            <div className='flex flex-col space-y-8 -translate-x-52'>
                <div className='font-bold text-7xl'>
                    Extraordinary<br />Barber Hub For Hair <br /> Enthusiasts
                </div>
                <div className="flex gap-8">
                    <button className="text-xl font-semibold px-6 py-2 bg-primary rounded text-black hover:text-white hover:shadow-[0px_0px_25px_8px_rgba(253,195,21,0.5)] transition duration-500">
                        Explore
                    </button>
                    <button className="text-xl font-semibold px-6 py-2 bg-secondary rounded text-black hover:text-white hover:shadow-[0px_0px_25px_8px_rgba(158,158,158,0.5)] transition duration-500">
                        Join
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Jumbotron