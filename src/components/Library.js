import React from 'react';
import LibrarySong  from './LibrarySong';

const Library = ({libraryStatus,isPlaying,audioRef, songs, setCurrentSong, setSongs}) => {
    

    return (
        <div className={`library ${libraryStatus ? "active-library" : ""} `}>
            <h2>Library</h2>
            <div className="library-songs">
               {songs.map(song => 
                   <LibrarySong isPlaying = {isPlaying} setSongs = {setSongs} audioRef = {audioRef} song = {song} setCurrentSong = {setCurrentSong} songs = {songs} id = {song.id} key = {song.id}/>
               )}
            </div>
        </div>
    );
};

export default Library;