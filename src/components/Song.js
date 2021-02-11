import React from "react";

export default function Song({ currentSong, isPlaying }) {
  return (
    <div className="song-container">
      <img
        className={isPlaying ? "rotateSong" : ""}
        alt={currentSong.name}
        src={currentSong.cover}
      />
      <h2>{currentSong.name}</h2>
      <h5>{currentSong.artist}</h5>
    </div>
  );
}
