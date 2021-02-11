import React from 'react';
import LibrarySong from './LibrarySong';
import TextField from '@material-ui/core/TextField';
import Upload from './Upload';

export default function Library({setSongs, isPlaying, audioRef, songs, setCurrentSong, libraryStatus, getTheme, search, setSearch}) {

    const filteredSongs = songs.filter(s => {
        return s.name.toLowerCase().includes(search.toLowerCase());
    });

    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''} ${getTheme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
            <h2>Library</h2>
            <div className={`search-bar ${getTheme === 'dark' ? 'search-bar-dark' : ''}`}>
                <TextField color={`${getTheme === 'dark' ? 'secondary' : ''}`} label="Search for a song" onChange={e => setSearch(e.target.value)} />
            </div>
            <div>
                <Upload />
            </div>
            <div className="library-songs">
            {filteredSongs.map(song => <LibrarySong
            songs={songs}
            song={song}
            setCurrentSong={setCurrentSong}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
            getTheme={getTheme}
            />)}
            </div>
        </div>
    );
}
