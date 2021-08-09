import React from 'react';


const LibrarySong =  ({isPlaying,audioRef,song, setCurrentSong, songs, setSongs, id}) => {

   const songSelectHandler = async () => {
       // set current song
      await setCurrentSong(song);

       // Add active class
      const newSongs = songs.map((song) => {
          if(song.id === id) {
              return {
                  ...song,
                  active: true
              };
          } else {
              return {
                  ...song,
                  active: false
              };
          }
      });
      //console.log(newSongs)

      setSongs(newSongs);
      

      // check if the song is playing
      if(isPlaying) audioRef.current.play();
   };



  
    
    return (
        <div onClick = {songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
            <img alt = {song.name} src={song.cover}  />
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;