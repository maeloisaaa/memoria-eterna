import React from 'react';

// Componente de visualização de Capa Livre (Canvas Simplificado)
const CanvasView = ({ photos, canvasTextBlocks, isDarkMode, accentColor, textColor }) => {
  // Cores do tema para blocos
  const themeColors = {
    blockBg: isDarkMode ? 'bg-blue-800/40' : 'bg-blue-100/70',
    blockBorder: isDarkMode ? 'border-blue-700/50' : 'border-blue-200/80',
    blockText: isDarkMode ? 'text-gray-200' : 'text-gray-800',
  };
  // Estilo da cor de texto de destaque
  const accentTextColorStyle = { color: accentColor };

  return (
    <div className={`w-full max-w-5xl my-10 p-6 rounded-2xl shadow-xl border ${isDarkMode ? 'bg-blue-950/50 border-blue-700/50' : 'bg-white/80 border-blue-200/80'}`}>
      <h3 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Sua Capa Livre</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
        {photos.map((photo, index) => (
          <div key={`photo-${index}`} className={`rounded-xl overflow-hidden shadow-lg ${themeColors.blockBg} ${themeColors.blockBorder} border`}>
            <img src={photo.src} alt={photo.caption || `Capa Foto ${index + 1}`} className="w-full h-48 object-cover" />
            {(photo.caption || photo.date) && (
              <div className="p-3">
                {photo.caption && <p className={`text-sm font-semibold ${themeColors.blockText}`}>{photo.caption}</p>}
                {photo.date && <p className={`text-xs opacity-70 ${themeColors.blockText}`}>{new Date(photo.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
              </div>
            )}
          </div>
        ))}
        {canvasTextBlocks.map((block, index) => (
          <div key={`text-${index}`} className={`p-4 rounded-xl shadow-lg ${themeColors.blockBg} ${themeColors.blockBorder} border flex items-center justify-center`}>
            <p className={`text-lg font-medium text-center ${themeColors.blockText}`}>{block}</p>
          </div>
        ))}
        {photos.length === 0 && canvasTextBlocks.length === 0 && (
          <p className={`col-span-full text-xl opacity-80 italic ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Adicione fotos ou blocos de texto para sua capa livre!</p>
        )}
      </div>
    </div>
  );
};

export default CanvasView;