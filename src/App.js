import React, {useRef,useState} from 'react';

// Adding components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';


import './styles/app.scss';
// Import data
import data from './data';


function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo]  = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
});
  const [libraryStatus, setLibraryStatus] = useState(false);
  

  const updateTimeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    // Percentage handler
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrent/roundedDuration)*100);
    

    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage})
} 
    const songEndHandler = async () => {
      let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      
          currentIndex = (currentIndex + 1) % songs.length;
         await setCurrentSong(songs[currentIndex]);
        if(isPlaying) audioRef.current.play();
    }


     // Ref
     const audioRef = useRef(null);

 
  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav libraryStatus = {libraryStatus} setLibraryStatus = {setLibraryStatus} />
     <Song currentSong = {currentSong}/>
     <Player setSongs = {setSongs} songs = {songs} setCurrentSong = {setCurrentSong} audioRef = {audioRef} setSongInfo = {setSongInfo} songInfo = {songInfo} isPlaying = {isPlaying} setIsPlaying = {setIsPlaying} currentSong = {currentSong}/>
     <Library libraryStatus = {libraryStatus} audioRef = {audioRef} isPlaying = {isPlaying} setSongs = {setSongs} songs  = {songs} setCurrentSong = {setCurrentSong}/>
     <audio  onLoadedMetadata = {updateTimeHandler} onTimeUpdate = {updateTimeHandler} ref = {audioRef} src={currentSong.audio} onEnded = {songEndHandler}></audio>
    </div>
  );
}

export default App;
