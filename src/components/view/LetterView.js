import React from 'react';

// Componente de visualização de Carta
const LetterView = ({ recipient, sender, letterContent, isDarkMode, accentColor, textColor }) => {
  // Estilo da cor de texto de destaque
  const accentTextColorStyle = { color: accentColor };

  return (
    <div className={`w-full max-w-3xl my-10 p-8 rounded-2xl shadow-xl border ${isDarkMode ? 'bg-blue-950/50 border-blue-700/50' : 'bg-white/80 border-blue-200/80'} text-left`}>
      <h3 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
        Uma Carta Especial para <span style={accentTextColorStyle}>{recipient}</span>
      </h3>
      <div className={`prose max-w-none ${isDarkMode ? 'prose-invert text-gray-200' : 'text-gray-800'}`}>
        <p className="whitespace-pre-wrap text-lg leading-relaxed">
          {letterContent}
        </p>
      </div>
      <p className={`mt-8 text-right text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Com carinho,<br/><span style={accentTextColorStyle}>{sender}</span>
      </p>
    </div>
  );
};

export default LetterView;