import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

const Icons = {
  Play: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  ),
  Pause: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <rect x="5" y="3" width="4" height="18" rx="1" />
      <rect x="15" y="3" width="4" height="18" rx="1" />
    </svg>
  ),
  Prev: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <polygon points="19,3 5,12 19,21" />
      <rect x="3" y="3" width="3" height="18" rx="1" />
    </svg>
  ),
  Next: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <polygon points="5,3 19,12 5,21" />
      <rect x="18" y="3" width="3" height="18" rx="1" />
    </svg>
  ),
  Repeat: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <polyline points="17,1 21,5 17,9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7,23 3,19 7,15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  Shuffle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <polyline points="16,3 21,3 21,8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21,16 21,21 16,21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  ),
  List: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  Volume: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function App() {
  const [songs, setSongs] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pawAnim, setPawAnim] = useState(false);

  const audioRef = useRef(null);
  const currentSong = songs[currentIdx];

  useEffect(() => {
    fetch('http://localhost:4000/api/songs')
      .then(r => r.json())
      .then(data => setSongs(data))
      .catch(() => console.error('No se pudo conectar al servidor de música'));
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      setCurrTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoaded = () => { setDuration(audio.duration); setIsLoading(false); };
    const onEnded = () => {
      if (isRepeat) { audio.currentTime = 0; audio.play(); }
      else handleNext();
    };
    const onWaiting = () => setIsLoading(true);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", () => setIsLoading(false));
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("waiting", onWaiting);
    };
  }, [isRepeat, currentIdx]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
  }, [currentIdx]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else audio.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleNext = useCallback(() => {
    setPawAnim(true);
    setTimeout(() => setPawAnim(false), 600);
    if (isShuffle) {
      let idx;
      do { idx = Math.floor(Math.random() * songs.length); } while (idx === currentIdx && songs.length > 1);
      setCurrentIdx(idx);
    } else {
      setCurrentIdx((prev) => (prev + 1) % songs.length);
    }
  }, [isShuffle, currentIdx, songs.length]);

  const handlePrev = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) audioRef.current.currentTime = 0;
    else setCurrentIdx((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return "0:00";
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
  };

  if (songs.length === 0) return (
    <div className="app-bg">
      <div className="player-card" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '13px' }}>⟳ Cargando canciones...</p>
      </div>
    </div>
  );

  return (
    <div className="app-bg">
      <audio ref={audioRef} src={currentSong.src} preload="metadata" />

      <div className="sparkles" aria-hidden="true">
        {[...Array(8)].map((_, i) => <span key={i} className={`sparkle s${i}`}>✦</span>)}
      </div>


      <div className="player-card">
        <div className="player-topbar">
          <span className="dot dot-pink" />
          <span className="dot dot-lavender" />
          <span className="dot dot-mint" />
          <span className="player-title-tag">≽^•⩊•^≼</span>
        </div>

        <div className="cover-wrapper">
          {currentSong.cover ? (
            <img src={currentSong.cover} alt="cover" className="cover-img" />
          ) : (
            <div className="cover-placeholder">
              <span className="cover-note">♬</span>
              {isPlaying && (
                <div className="vinyl-rings" aria-hidden="true">
                  <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
                </div>
              )}
            </div>
          )}
          {isLoading && <div className="loading-overlay">⟳</div>}
        </div>

        <div className="song-info">
          <p className="song-title">{currentSong.title}</p>
          <p className="song-artist">{currentSong.artist}</p>
        </div>

        <div className="progress-area">
          <span className="time-label">{formatTime(currentTime)}</span>
          <div className="progress-bar" onClick={handleSeek} role="slider" aria-label="Progreso">
            <div className="progress-fill" style={{ width: `${progress}%` }}>
              <div className="progress-thumb" />
            </div>
          </div>
          <span className="time-label">{formatTime(duration)}</span>
        </div>

        <div className="controls">
          <button className={`ctrl-btn sm ${isShuffle ? "active" : ""}`} onClick={() => setIsShuffle(!isShuffle)} title="Aleatorio">
            <Icons.Shuffle />
          </button>
          <button className="ctrl-btn md" onClick={handlePrev} title="Anterior"><Icons.Prev /></button>
          <button className="ctrl-btn lg play-btn" onClick={togglePlay} title={isPlaying ? "Pausar" : "Reproducir"}>
            {isPlaying ? <Icons.Pause /> : <Icons.Play />}
          </button>
          <button className="ctrl-btn md" onClick={handleNext} title="Siguiente"><Icons.Next /></button>
          <button className={`ctrl-btn sm ${isRepeat ? "active" : ""}`} onClick={() => setIsRepeat(!isRepeat)} title="Repetir">
            <Icons.Repeat />
          </button>
        </div>

        <div className="bottom-bar">
          <div className="volume-ctrl">
            <Icons.Volume />
            <input type="range" min="0" max="1" step="0.02" value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider" title="Volumen" />
          </div>
          <button className="ctrl-btn sm" onClick={() => setShowList(!showList)} title="Lista">
            <Icons.List />
          </button>
        </div>
      </div>

      {showList && (
        <div className="song-list-panel">
          <div className="list-header">
            <span>𝅗𝅥 Lista de canciones</span>
            <button className="ctrl-btn sm" onClick={() => setShowList(false)}><Icons.Close /></button>
          </div>
          <ul className="song-list">
            {songs.map((song, idx) => (
              <li key={song.id} className={`song-item ${idx === currentIdx ? "song-active" : ""}`}
                onClick={() => { setCurrentIdx(idx); setIsPlaying(true); setTimeout(() => audioRef.current?.play(), 100); setShowList(false); }}>
                <span className="song-item-num">{idx === currentIdx && isPlaying ? "♪" : idx + 1}</span>
                <div className="song-item-info">
                  <span className="song-item-title">{song.title}</span>
                  <span className="song-item-artist">{song.artist}</span>
                </div>
                {idx === currentIdx && <span className="song-item-dot" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}