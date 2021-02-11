import React, {useState, useRef, useEffect} from 'react';
import './styles/app.scss';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import data from './data';
import Nav from './components/Nav';
import Theme from './components/Theme';

function App() {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  });
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data()); 
  const [search, setSearch] = useState('');
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const getTheme = localStorage.getItem('Theme');
  const [isDark, setIsDark] = useState(getTheme === 'light' ? true : false);
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, duration});
};

  const autoSongPlayer = () => {
    if(isPlaying) {
      audioRef.current.play();
    }
  };

  const playToggle = (e) => {
    if(e.keyCode === 32 && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if(e.keyCode === 32 && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', playToggle, false);
    return () => {
      document.removeEventListener('keydown', playToggle, false);
    }
  });

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Theme
      isDark={isDark}
      setIsDark={setIsDark}
      />
      <Nav
      libraryStatus={libraryStatus} 
      setLibraryStatus={setLibraryStatus}
      />
      <Song
      currentSong={currentSong}
      isPlaying={isPlaying}
      />
      <Player songInfo={songInfo}
      setSongInfo={setSongInfo}
      audioRef={audioRef}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      currentSong={currentSong}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      />
      <Library isPlaying={isPlaying}
      audioRef={audioRef}
      songs={songs}
      setCurrentSong={setCurrentSong} 
      setSongs={setSongs}
      libraryStatus={libraryStatus}
      isDark={isDark}
      setIsDark={setIsDark}
      getTheme={getTheme}
      search={search}
      setSearch={setSearch}
      />  
      <audio onLoadedData={autoSongPlayer} 
      onLoadedMetadata={timeUpdateHandler} 
      onTimeUpdate={timeUpdateHandler} 
      ref={audioRef} 
      src={currentSong.audio}
      onEnded={() => songInfo.currentTime === songInfo.duration 
      ?
      setCurrentSong(songs[(currentIndex + 1) % songs.length]) 
      :
      audioRef.current.play()}
      >
      </audio>
    </div>
  );
}

export default App;
