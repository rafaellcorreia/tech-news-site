import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MusicPlayer() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef(null);

  // Playlist de música eletrônica (URLs de música livre de direitos)
  const tracks = [
    {
      name: "Electronic Dreams",
      artist: "Tech Vibes",
      url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
      duration: "3:45"
    },
    {
      name: "Digital Pulse",
      artist: "Synth Wave",
      url: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
      duration: "4:12"
    },
    {
      name: "Cyber Beats",
      artist: "Future Sound",
      url: "https://www.bensound.com/bensound-music/bensound-energy.mp3",
      duration: "3:28"
    },
    {
      name: "Neon Lights",
      artist: "Electric Dreams",
      url: "https://www.bensound.com/bensound-music/bensound-dubstep.mp3",
      duration: "4:33"
    },
    {
      name: "Tech Revolution",
      artist: "Digital Age",
      url: "https://www.bensound.com/bensound-music/bensound-electronic.mp3",
      duration: "3:56"
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);
    if (isPlaying) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const previousTrack = () => {
    const prev = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prev);
    if (isPlaying) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  return (
    <div className="music-player">
      <div className="player-header">
        <h3>{t('musicPlayerTitle')}</h3>
        <p>{t('musicPlayerSubtitle')}</p>
      </div>
      
      <div className="player-content">
        <div className="track-info">
          <div className="track-artwork">
            <div className="artwork-placeholder">
              🎧
            </div>
          </div>
          <div className="track-details">
            <h4>{tracks[currentTrack].name}</h4>
            <p>{tracks[currentTrack].artist}</p>
            <span className="track-duration">{tracks[currentTrack].duration}</span>
          </div>
        </div>

        <div className="player-controls-section">
          <div className="player-controls">
            <button 
              className="control-btn prev-btn" 
              onClick={previousTrack}
              title={t('previousTrack')}
            >
              ⏮️
            </button>
            
            <button 
              className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
              onClick={togglePlayPause}
              title={isPlaying ? t('pause') : t('play')}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <button 
              className="control-btn next-btn" 
              onClick={nextTrack}
              title={t('nextTrack')}
            >
              ⏭️
            </button>
          </div>

          <div className="volume-control">
            <span className="volume-icon">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              title={t('volume')}
            />
            <span className="volume-value">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="playlist-toggle" onClick={() => setShowPlaylist(!showPlaylist)}>
        <span>{t('playlistTitle')}</span>
        <span>{showPlaylist ? '▲' : '▼'}</span>
      </div>
      
      {showPlaylist && (
        <div className="playlist">
          <div className="track-list">
            {tracks.map((track, index) => (
              <div 
                key={index}
                className={`track-item ${index === currentTrack ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTrack(index);
                  if (isPlaying) {
                    audioRef.current.load();
                    audioRef.current.play();
                  }
                }}
              >
                <span className="track-number">{index + 1}</span>
                <span className="track-name">{track.name}</span>
                <span className="track-duration">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        onEnded={handleTrackEnd}
        preload="metadata"
      />
    </div>
  );
}
