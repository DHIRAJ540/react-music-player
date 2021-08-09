import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';

const Player = ({setSongs,setCurrentSong,songs,audioRef, currentSong, isPlaying, setIsPlaying, songInfo, setSongInfo}) => {


   

    //Eevent listner
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id) {
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
        
  
        setSongs(newSongs);
    }

    

    const getTime = time => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const secondsWithZero = String(seconds).padStart(2, "0")
        return `${minutes}:${secondsWithZero}`
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward') {
            currentIndex = (currentIndex + 1) % songs.length;
            activeLibraryHandler(songs[currentIndex])
            //console.log(currentIndex)
           await setCurrentSong(songs[currentIndex]);
        } else if(direction === 'skip-back') {
            currentIndex = (currentIndex - 1) % songs.length;
            if(currentIndex === -1) {
                currentIndex = songs.length - 1;
            }
            activeLibraryHandler(songs[currentIndex])
           await setCurrentSong(songs[currentIndex]);
        }
        if(isPlaying) audioRef.current.play();
    }

    //Add styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style = {{background : `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]}`}} className="track">
                <input min = {0} max = {songInfo.duration || 0} value = {songInfo.currentTime} onChange = {dragHandler} type="range" />
                <div style = {trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick = {() => skipTrackHandler('skip-back')} className = "skip-back" size = "2x" icon = {faAngleLeft}/>
                <FontAwesomeIcon onClick = {playSongHandler} className = "play" size = "2x" icon = {isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick = {() => skipTrackHandler('skip-forward')} className = "skip-forward" size = "2x" icon = {faAngleRight}/>
            </div>
           
        </div>
    )
}

export default Player;