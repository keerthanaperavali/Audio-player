import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { motion } from "framer-motion";

const MusicPage = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Load songs - replace with your actual data and paths
    setSongs([
      {
        id: 1,
        title: "kailove chedugudu from Sakhi",
        src: "/song/song6.mp3",
        albumArt:
          "https://naasongs.com.co/wp-content/uploads/2018/10/Sakhi-2000-jpeg.jpg",
      },
      {
        id: 2,
        title: "vinave vinave from Raja Rani",
        src: "/song/song4.mp3",
        albumArt:
          "https://cinemachaat.com/wp-content/uploads/2014/03/poster.jpg",
      },
      {
        id: 3,
        title: "Marhaba from Mali Mali edhi Rani Roju",
        src: "/song/song3.mp3",
        albumArt:
          "https://img1.hotstarext.com/image/upload/f_auto/sources/r1/cms/prod/9438/1399438-i-95911715a93f",
      },
      {
        id: 4,
        title: "vaalu kanula daana from ",
        src: "/song/song5.mp3",
        albumArt:
          "https://a10.gaanacdn.com/gn_img/albums/YoEWlwa3zX/oEWl8GzWzX/size_m.webp",
      },
      {
        id: 5,
        title: "poovullo daagunna from Jeans ",
        src: "/song/song1.mp3",
        albumArt:
          "https://m.media-amazon.com/images/M/MV5BOTk0YzRmZTgtYzc2NS00ZGIzLWFmODYtMDM5MWQyOTI2YzMxXkEyXkFqcGdeQXVyODEzOTQwNTY@._V1_.jpg",
      },
      {
        id: 6,
        title: "Adbutham from lovers",
        src: "/song/song2.mp3",
        albumArt:
          "https://cdn.tollywood.net/wp-content/uploads/2018/07/lover-review.jpg",
      },
    ]);
  }, []);

  const handleSongSelect = (song) => {
    if (audioRef.current && audioRef.current.audio && currentSong && currentSong.id === song.id && isPlaying) {
      // Pause if the same song is playing and is clicked again
      audioRef.current.audio.current.pause();
      setIsPlaying(false);
    } else {
      // Otherwise, play the selected song
      setCurrentSong(song);
      setIsPlaying(true);
      if (audioRef.current && audioRef.current.audio) {
        audioRef.current.audio.current.play();
      }
    }
  };
  

  const handlePlayPause = () => {
    if (audioRef.current.audio.current.paused) {
      audioRef.current.audio.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.audio.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (value) => {
    audioRef.current.audio.current.volume = value;
  };

  const handleRewind = () => {
    audioRef.current.audio.current.currentTime -= 10;
  };

  const handleForward = () => {
    audioRef.current.audio.current.currentTime += 10;
  };

  return (
    <div className="bg-gradient-to-r from-black-100 to-black-100 min-h-screen">
      {/* Header */}
      <header className="bg-base-100 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-white">Music Player</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Render each song */}
        {songs.map((song) => (
          <motion.div
            key={song.id}
            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => handleSongSelect(song)}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={song.albumArt}
              alt={song.title}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold">{song.title}</h3>
            {/* Render the audio player */}
            {currentSong && currentSong.id === song.id && (
              <div className="mt-4">
                <AudioPlayer
                  src={currentSong.src}
                  autoPlay
                  showJumpControls={false}
                  customVolumeControls={[]}
                  customAdditionalControls={[
                    <button
                      key="rewind"
                      onClick={handleRewind}
                      className="bg-gray-100 text-white rounded-full p-2 shadow-lg focus:outline-none"
                    >
                      Rewind
                    </button>,
                    <button
                      key="play-pause"
                      onClick={handlePlayPause}
                      className="bg-gray-800 text-white rounded-full p-2 shadow-lg focus:outline-none"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>,
                    // <button
                    //   key="forward"
                    //   onClick={handleForward}
                    //   className="bg-gray-800 text-white rounded-full p-2 shadow-lg focus:outline-none"
                    // >
                        <button
                        key="forward"
                        onClick={handleForward}
                        className="btn btn-xs">Tiny</button>
                
                      
                  ]}
                  ref={audioRef}
                  style={{ marginTop: "10px" }}
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  defaultValue="1"
                  onChange={(e) => handleVolumeChange(e.target.value)}
                  className="mt-2"
                />
              </div>
            )}
          </motion.div>
        ))}
      </main>
    </div>
  );
};

export default MusicPage;
