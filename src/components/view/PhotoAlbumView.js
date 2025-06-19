import React from 'react';

// Componente de visualização de Álbum de Fotos
const PhotoAlbumView = ({ photos, isDarkMode, accentColor, textColor }) => {
  // Cores do tema para blocos
  const themeColors = {
    blockBg: isDarkMode ? 'bg-blue-800/40' : 'bg-blue-100/70',
    blockBorder: isDarkMode ? 'border-blue-700/50' : 'border-blue-200/80',
    blockText: isDarkMode ? 'text-gray-200' : 'text-gray-800',
  };

  return (
    <div className={`w-full max-w-5xl my-10 p-6 rounded-2xl shadow-xl border ${isDarkMode ? 'bg-blue-950/50 border-blue-700/50' : 'bg-white/80 border-blue-200/80'}`}>
      <h3 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Seu Álbum de Fotos</h3>
      {photos.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-lg border border-blue-700/30">
              <img src={photo.src} alt={photo.caption || `Foto ${index + 1}`} className="w-full h-40 object-cover" />
              {(photo.caption || photo.date) && (
                <div className="p-3">
                  {photo.caption && <p className={`text-sm font-semibold ${themeColors.blockText}`}>{photo.caption}</p>}
                  {photo.date && <p className={`text-xs opacity-70 ${themeColors.blockText}`}>{new Date(photo.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl opacity-80 italic">Adicione fotos para seu álbum!</p>
      )}
    </div>
  );
};

export default PhotoAlbumView;