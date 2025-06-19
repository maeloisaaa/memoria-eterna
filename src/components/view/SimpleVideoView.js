import React from 'react';

// Componente de visualização de Vídeo Simples
const SimpleVideoView = ({ videoUrl, isDarkMode, accentColor, textColor }) => {
  // Cores do tema para o contêiner
  const themeColors = {
    containerBg: isDarkMode ? 'bg-blue-800/40' : 'bg-blue-100/70',
    containerBorder: isDarkMode ? 'border-blue-700/50' : 'border-blue-200/80',
  };

  return (
    <div className={`w-full max-w-4xl my-10 p-6 rounded-2xl shadow-xl border ${themeColors.containerBg} ${themeColors.containerBorder}`}>
      <h3 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Seu Vídeo Especial</h3>
      {videoUrl ? (
        <div className="relative pt-[56.25%]"> {/* Proporção de aspecto 16:9 */}
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-xl"
            src={videoUrl}
            title="Embedded Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p className="text-xl opacity-80 italic">Adicione um link de vídeo (embed) para visualizá-lo!</p>
      )}
      <p className={`mt-4 text-sm opacity-80 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Se o vídeo não aparecer, certifique-se de que o link fornecido é um link "embed" direto (ex: de YouTube ou Vimeo).
      </p>
    </div>
  );
};

export default SimpleVideoView;