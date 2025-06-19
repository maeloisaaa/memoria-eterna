import React, { useState, useEffect, useRef } from 'react';

// Componente de visualização de Retrospectiva (Estilo Spotify)
const RetrospectiveView = ({ recipient, sender, message, photos, music, layout, relationshipStartDate, isDarkMode, accentColor, textColor, accentButtonStyle, accentTextColor }) => {
  const audioRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeTogether, setTimeTogether] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  // Lógica de reprodução de música
  useEffect(() => {
    if (audioRef.current) {
      if (music.type === 'mp3' && music.file) {
        const audioUrl = URL.createObjectURL(music.file);
        audioRef.current.src = audioUrl;
      } else if (music.type === 'url' && music.url) {
        audioRef.current.src = music.url;
      } else {
        audioRef.current.src = ''; // Limpa a fonte se não houver música
      }

      // Lida com o estado de play/pause
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Erro ao reproduzir áudio (usuário pode precisar interagir):", e);
          // Mensagem de fallback para bloqueio de autoplay (idealmente uma caixa de mensagem visível)
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [music, isPlaying]);

  // Alterna o estado de play/pause da música
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  // Lógica de Retrospectiva estilo Spotify para layout de linha do tempo
  useEffect(() => {
    if (layout === 'timeline' && photos.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % photos.length);
      }, 5000); // Muda o slide a cada 5 segundos
      return () => clearInterval(interval);
    }
  }, [layout, photos.length]);

  // Calcula o tempo de relacionamento (mais robusto e preciso)
  useEffect(() => {
    if (!relationshipStartDate) return;

    const calculateTime = () => {
      const startDate = new Date(relationshipStartDate + 'T00:00:00'); // Garante o início do dia
      const now = new Date();
      const diffInMilliseconds = now.getTime() - startDate.getTime();

      const totalSeconds = Math.floor(diffInMilliseconds / 1000);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const totalHours = Math.floor(totalMinutes / 60);
      const hours = totalHours % 24;
      
      // Calcular anos e meses de forma precisa
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      
      if (now.getDate() < startDate.getDate()) {
        months--;
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      // Calcular os dias restantes após a determinação precisa de anos/meses
      const lastCalculatedDate = new Date(startDate);
      lastCalculatedDate.setFullYear(startDate.getFullYear() + years);
      lastCalculatedDate.setMonth(startDate.getMonth() + months);

      let remainingDaysPrecise = 0;
      if (now.getTime() >= lastCalculatedDate.getTime()) {
          remainingDaysPrecise = Math.floor((now.getTime() - lastCalculatedDate.getTime()) / (1000 * 60 * 60 * 24));
      }

      setTimeTogether({
        years: years,
        months: months,
        days: remainingDaysPrecise,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    };

    calculateTime(); // Cálculo inicial
    const interval = setInterval(calculateTime, 1000); // Atualiza a cada segundo
    return () => clearInterval(interval);
  }, [relationshipStartDate]);

  // Obtém dados relevantes do relacionamento para exibição
  const getRelationshipData = () => {
    const memorablePhotos = photos.length;
    const specialSongs = music.type !== 'none' ? 1 : 0;

    return [
      { label: "Fotos Memoráveis", value: `${memorablePhotos}`, icon: "📸" },
      { label: "Canção Especial", value: specialSongs > 0 ? "Sim" : "Não", icon: "🎵" },
      { label: "Palavras do Coração", value: `${message.length > 50 ? 'Longa' : 'Curta'} mensagem`, icon: "💬" },
    ];
  };

  const relationshipData = getRelationshipData();

  // Classe para botões de navegação de slide
  const navButtonClass = `p-2 rounded-full transition-colors duration-200 opacity-70 hover:opacity-100 ${isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-300 hover:bg-blue-400'}`;

  return (
    <div className="w-full max-w-5xl my-10 p-6 rounded-2xl shadow-xl">
        <h3 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Sua Retrospectiva Estilo Spotify</h3>

        {/* Seção de Música Tocando Agora estilo Spotify */}
        {(music.type === 'mp3' && music.file) || (music.type === 'url' && music.url) ? (
            <div className={`relative p-6 rounded-xl shadow-lg mb-10 overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                {/* Efeito de desfoque de fundo da arte do álbum - usando a primeira foto como placeholder */}
                {photos.length > 0 && (
                    <div
                        className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-30"
                        style={{ backgroundImage: `url(${photos[0].src})` }}
                    ></div>
                )}
                <div className="relative z-10 flex flex-col items-center">
                    <img
                        src={photos.length > 0 ? photos[0].src : "https://placehold.co/150x150/FFF/000?text=Capa"}
                        alt="Album Art"
                        className="w-36 h-36 rounded-lg shadow-lg mb-4"
                    />
                    <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sua Canção Especial</p>
                    <p className={`text-md opacity-80 mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Memória Eterna</p>
                    <audio ref={audioRef} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} className="hidden"></audio> {/* Elemento de áudio oculto */}
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={togglePlayPause}
                            className={`p-3 rounded-full ${accentButtonStyle.backgroundColor ? '' : (isDarkMode ? 'bg-blue-600' : 'bg-blue-500')} ${isDarkMode ? 'text-white' : 'text-white'} shadow-md hover:shadow-lg transition-all duration-200`}
                            style={accentButtonStyle}
                        >
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7.5 8a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-1zm3.5 0a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            <p className="mb-10 text-lg opacity-80">Nenhuma música adicionada.</p>
        )}

        {/* Seção de Dados do Relacionamento (Dados "Wrapped" estilo Spotify) */}
        {relationshipStartDate && (
          <div className={`mb-10 p-6 rounded-xl ${isDarkMode ? 'bg-blue-800/40' : 'bg-blue-100/70'} shadow-md border-2 ${isDarkMode ? 'border-blue-700' : 'border-blue-300'}`}>
            <h4 className={`text-2xl sm:text-3xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>
              <span style={accentTextColor}>{recipient}</span> & <span style={accentTextColor}>{sender}</span>
            </h4>
            <p className={`text-lg sm:text-xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Juntos desde {new Date(relationshipStartDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
              <div className="flex flex-col items-center p-2 rounded-lg bg-blue-700/20">
                <p className="text-4xl lg:text-5xl font-bold" style={accentTextColor}>{timeTogether.years}</p>
                <p className={`text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>ANOS</p>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-blue-700/20">
                <p className="text-4xl lg:text-5xl font-bold" style={accentTextColor}>{timeTogether.months}</p>
                <p className={`text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>MESES</p>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-blue-700/20">
                <p className="text-4xl lg:text-5xl font-bold" style={accentTextColor}>{timeTogether.days}</p>
                <p className={`text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>DIAS</p>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-blue-700/20">
                <p className="text-4xl lg:text-5xl font-bold" style={accentTextColor}>{timeTogether.hours}</p>
                <p className={`text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>HORAS</p>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-blue-700/20">
                <p className="text-4xl lg:text-5xl font-bold" style={accentTextColor}>{timeTogether.minutes}</p>
                <p className={`text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>MINUTOS</p>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-blue-700/20">
                <p className="text-4xl lg:text-5xl font-bold" style={accentTextColor}>{timeTogether.seconds}</p>
                <p className={`text-base font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>SEGUNDOS</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relationshipData.map((data, index) => (
            <div key={index} className={`p-4 rounded-xl shadow-md ${isDarkMode ? 'bg-blue-800/40' : 'bg-blue-100/70'} flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105`}>
              <div className="text-4xl mb-2" style={accentTextColor}>{data.icon}</div>
              <p className={`text-sm opacity-80 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{data.label}</p>
              <p className="text-2xl font-bold" style={accentTextColor}>{data.value}</p>
            </div>
          ))}
        </div>

        {/* Exibição de Fotos com base no layout */}
        {layout === 'timeline' && photos.length > 0 && (
          <div className="relative h-96 overflow-hidden rounded-xl">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-1000 ease-in-out
                            ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                style={{
                  backgroundImage: `url(${photo.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(0.6)' // Escurece o fundo para legibilidade do texto
                }}
              >
                <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div> {/* Overlay */}
                <img
                  src={photo.src}
                  alt={photo.caption || `Foto ${index + 1}`}
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full border-4 border-white shadow-lg mb-4 transform scale-90 sm:scale-100 transition-transform duration-500"
                />
                <p className="text-white text-xl sm:text-2xl font-semibold bg-black/60 p-3 rounded-lg backdrop-blur-sm">
                  {photo.caption || `Nosso Momento ${index + 1}`}
                </p>
                {photo.date && (
                    <p className="text-white text-sm mt-2 bg-black/60 p-2 rounded-lg backdrop-blur-sm">
                        {new Date(photo.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                )}
              </div>
            ))}
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentSlide(prev => (prev - 1 + photos.length) % photos.length)}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${navButtonClass}`}
                  style={accentButtonStyle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={() => setCurrentSlide(prev => (prev + 1) % photos.length)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${navButtonClass}`}
                  style={accentButtonStyle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>
        )}

        {layout === 'grid' && photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg border border-blue-700/30">
                <img src={photo.src} alt={photo.caption || `Foto ${index + 1}`} className="w-full h-40 object-cover" />
                <p className={`p-2 text-sm ${isDarkMode ? 'bg-blue-800/60 text-gray-200' : 'bg-blue-50/80 text-gray-700'} `}>
                  {photo.caption || `Momento ${index + 1}`}
                </p>
                {photo.date && (
                    <p className={`p-1 text-xs ${isDarkMode ? 'bg-blue-800/60 text-gray-300' : 'bg-blue-50/80 text-gray-600'} `}>
                        {new Date(photo.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                )}
              </div>
            ))}
          </div>
        )}

        {layout === 'slideshow' && photos.length > 0 && (
          <div className="relative h-96 flex items-center justify-center rounded-xl overflow-hidden shadow-xl border border-blue-700/50">
            <img src={photos[currentSlide].src} alt={photos[currentSlide].caption || `Slide ${currentSlide + 1}`} className="w-full h-full object-cover rounded-xl" />
            <p className="absolute bottom-4 left-4 right-4 bg-black/60 text-white p-3 rounded-lg text-lg sm:text-xl font-semibold backdrop-blur-sm">
              {photos[currentSlide].caption || `Slide ${currentSlide + 1}`}
            </p>
            {photos[currentSlide].date && (
                <p className="absolute bottom-16 left-4 right-4 bg-black/60 text-white p-2 rounded-lg text-sm backdrop-blur-sm">
                    {new Date(photos[currentSlide].date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
            )}
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentSlide(prev => (prev - 1 + photos.length) % photos.length)}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 ${navButtonClass}`}
                  style={accentButtonStyle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={() => setCurrentSlide(prev => (prev + 1) % photos.length)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${navButtonClass}`}
                  style={accentButtonStyle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>
        )}
        {photos.length === 0 && (
          <p className="text-xl opacity-80 italic">Adicione fotos para ver a retrospectiva!</p>
        )}
    </div>
  );
};

export default RetrospectiveView;