import React from 'react';

export default function LibrarySong({setSongs, songs, song, setCurrentSong, id}) {
   
    const songSelectHandler = () => {
        setCurrentSong(song);
    };  

    const activeSongsHandler = () => {
        setSongs(songs.map(s => {
            return {
                ...s,
                active: s.id === id ? true : false
            }
        }));
    };
 
    return(
        <div onClick={() => {
            songSelectHandler();
            activeSongsHandler();
        }}
        className={`library-song ${song.active ? "selected" : ""}`}
        >
            <img alt={song.name} src={song.cover}/>
            <div className='song-descreption'>
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
    )
}