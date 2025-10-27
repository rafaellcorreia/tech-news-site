import { useState, useEffect } from 'react';

export default function VideoBackground({ 
  videoSrc, 
  fallbackImage, 
  opacity = 0.4 
}) {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    console.log('VideoBackground montado com:', { videoSrc, fallbackImage, opacity });
  }, [videoSrc, fallbackImage, opacity]);

  const handleVideoError = (e) => {
    console.error('Erro ao carregar vídeo:', e);
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log('Vídeo carregado com sucesso:', videoSrc);
    setVideoLoaded(true);
  };

  const handleVideoCanPlay = () => {
    console.log('Vídeo pode ser reproduzido');
  };

  return (
    <div className="video-background-container">
      {/* Fallback Image - sempre visível */}
      <div 
        className="video-background-fallback"
        style={{
          backgroundImage: `url(${fallbackImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: videoError ? 1 : 0.3
        }}
      />
      
      {/* Video */}
      <video
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
        onCanPlay={handleVideoCanPlay}
        style={{ 
          opacity: videoLoaded && !videoError ? opacity : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
        Seu navegador não suporta vídeos HTML5.
      </video>
    </div>
  );
}
