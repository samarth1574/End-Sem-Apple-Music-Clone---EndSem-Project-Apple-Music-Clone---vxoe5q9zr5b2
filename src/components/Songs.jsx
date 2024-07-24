import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const Songs = ({ token }) => {
    const [songs, setSongs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchSongs();
        // eslint-disable-next-line
    }, []);

    const fetchSongs = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/musicx/song/${id}`, {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'jscjwatei3cb',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);
            setSongs(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="bg-[#262628] text-white pt-[70px] h-[100dvh] flex flex-col justify-center items-center">
        {/* <div className="bg-[#262628] rounded-lg p-4 hover:bg-[#3c3c3e] transition-colors duration-300 w-full max-w-[400px]"> */}
            {songs.length === 0 ? (
                <h1>Loading</h1>
            ) : (
                <>
                    <div>
                        <img src={songs.data.thumbnail} alt={songs.data.thumbnail} className="m-2 mb-5" />
                    </div>
                    <h1 className='font-[900] text-4xl mb-3'>{songs.data.title}</h1>
                    
                        <div className='flex flex-row text-slate-400 mb-2'>
                            <i className="fa-solid fa-star" /> {songs.data.featured}
                        </div>
                        <div className='text-slate-400'>
                            {songs.data.artist.map((data) => (
                                <span key={data._id} className='mr-2'>
                                    {data.name}
                                </span>
                            ))}
                        </div>
                    {/* </div> */}
                    <audio src={songs.data.audio_url} controls className='mt-5 w-full max-w-[400px]' />
                </>
            )}
        </div>
    );
};

export default Songs;