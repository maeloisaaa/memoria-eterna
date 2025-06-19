import React from 'react';
import RetrospectiveView from './views/RetrospectiveView';
import LetterView from './views/LetterView';
import CanvasView from './views/CanvasView';
import PhotoAlbumView from './views/PhotoAlbumView';
import SimpleVideoView from './views/SimpleVideoView';

// Componente de pré-visualização do presente
const GiftPreview = ({ giftData, setCurrentPage, isDarkMode }) => {
  const { contentType, title, recipient, sender, message, photos, music, font, layout, primaryColor, accentColor, textColor, relationshipStartDate, letterContent, canvasTextBlocks, videoUrl } = giftData;

  // Estilos dinâmicos para a página do presente
  const giftPageStyle = {
    backgroundColor: primaryColor,
    color: textColor,
    fontFamily: font,
  };

  // Estilo do botão de destaque
  const accentButtonStyle = {
    backgroundColor: accentColor,
    color: textColor === '#E3F2FD' || textColor === '#BBDEFB' ? '#1A237E' : 'white', // Garante contraste
  };

  // Estilo da cor de texto de destaque
  const accentTextColor = {
    color: accentColor,
  };

  // Classe base para botões
  const buttonClass = `px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
                       ${isDarkMode ? 'focus:ring-blue-500 focus:ring-offset-gray-900' : 'focus:ring-blue-700 focus:ring-offset-gray-50'}`;

  // Renderiza o conteúdo específico do presente com base no tipo
  const renderGiftContent = () => {
    switch (contentType) {
      case 'retrospectiva':
        return (
          <RetrospectiveView
            recipient={recipient}
            sender={sender}
            message={message}
            photos={photos}
            music={music}
            layout={layout}
            relationshipStartDate={relationshipStartDate}
            isDarkMode={isDarkMode}
            accentColor={accentColor}
            textColor={textColor}
            accentButtonStyle={accentButtonStyle}
            accentTextColor={accentTextColor}
          />
        );
      case 'carta':
        return (
          <LetterView
            recipient={recipient}
            sender={sender}
            letterContent={letterContent}
            isDarkMode={isDarkMode}
            accentColor={accentColor}
            textColor={textColor}
          />
        );
      case 'canva':
        return (
          <CanvasView
            photos={photos}
            canvasTextBlocks={canvasTextBlocks}
            isDarkMode={isDarkMode}
            accentColor={accentColor}
            textColor={textColor}
          />
        );
      case 'photoAlbum':
        return (
          <PhotoAlbumView
            photos={photos}
            isDarkMode={isDarkMode}
            accentColor={accentColor}
            textColor={textColor}
          />
        );
      case 'video':
        return (
          <SimpleVideoView
            videoUrl={videoUrl}
            isDarkMode={isDarkMode}
            accentColor={accentColor}
            textColor={textColor}
          />
        );
      default:
        return <p>Selecione um tipo de presente para visualizar.</p>;
    }
  };

  return (
    <section className="relative min-h-[70vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center p-6 sm:p-10 lg:p-16" style={giftPageStyle}>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 animate-fade-in" style={accentTextColor}>
        {title}
      </h2>
      <p className="text-xl sm:text-2xl lg:text-3xl font-medium mb-6 animate-fade-in-delay">
        De: <span className="font-semibold" style={accentTextColor}>{sender}</span> para <span className="font-semibold" style={accentTextColor}>{recipient}</span>
      </p>
      {contentType !== 'carta' && ( // A mensagem principal só é exibida para tipos que não são "carta"
         <p className="text-lg sm:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto opacity-90 animate-fade-in-delay-2">
            "{message}"
         </p>
      )}

      {renderGiftContent()} {/* Renderiza o conteúdo específico aqui */}

      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setCurrentPage('create')}
          className={`${buttonClass} ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
        >
          Voltar para Edição
        </button>
        <button
          onClick={() => setCurrentPage('share')}
          className={`${buttonClass} bg-gradient-to-r from-green-500 to-green-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105`}
        >
          Gerar Link/QR Code
        </button>
      </div>
    </section>
  );
};

export default GiftPreview;