import React from 'react';

// Componente para criar e editar o presente
const GiftCreator = ({ giftData, setGiftData, setCurrentPage, isDarkMode }) => {
  // Lida com a mudança de valor em inputs de texto e select
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGiftData(prevData => ({ ...prevData, [name]: value }));
  };

  // Lida com o upload de fotos, convertendo-as para Base64
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ src: reader.result, caption: '', date: '' });
        reader.readAsDataURL(file);
      });
    })).then(newPhotos => {
      setGiftData(prevData => ({
        ...prevData,
        photos: [...prevData.photos, ...newPhotos]
      }));
    });
  };

  // Lida com a mudança de legenda de uma foto específica
  const handlePhotoCaptionChange = (index, caption) => {
    const updatedPhotos = [...giftData.photos];
    updatedPhotos[index].caption = caption;
    setGiftData(prevData => ({ ...prevData, photos: updatedPhotos }));
  };

  // Lida com a mudança de data de uma foto específica
  const handlePhotoDateChange = (index, date) => {
    const updatedPhotos = [...giftData.photos];
    updatedPhotos[index].date = date;
    setGiftData(prevData => ({ ...prevData, photos: updatedPhotos }));
  };

  // Lida com a remoção de uma foto
  const handleRemovePhoto = (index) => {
    setGiftData(prevData => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index)
    }));
  };

  // Lida com a mudança do tipo de música (nenhuma, MP3, URL)
  const handleMusicTypeChange = (e) => {
    const type = e.target.value;
    setGiftData(prevData => ({
      ...prevData,
      music: { ...prevData.music, type, file: null, url: '' }
    }));
  };

  // Lida com o upload de arquivo MP3
  const handleMusicFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGiftData(prevData => ({
        ...prevData,
        music: { ...prevData.music, type: 'mp3', file }
      }));
    }
  };

  // Lida com a mudança da URL da música
  const handleMusicUrlChange = (e) => {
    const url = e.target.value;
    setGiftData(prevData => ({
      ...prevData,
      music: { ...prevData.music, type: 'url', url }
    }));
  };

  // Lida com a mudança da URL do vídeo
  const handleVideoUrlChange = (e) => {
    const url = e.target.value;
    setGiftData(prevData => ({
      ...prevData,
      videoUrl: url
    }));
  };

  // Lida com a mudança de cor (primária, destaque, texto)
  const handleColorChange = (name, value) => {
    setGiftData(prevData => ({ ...prevData, [name]: value }));
  };

  // Lida com a mudança de conteúdo de um bloco de texto do canvas
  const handleCanvasTextBlockChange = (index, value) => {
    const updatedBlocks = [...giftData.canvasTextBlocks];
    updatedBlocks[index] = value;
    setGiftData(prevData => ({ ...prevData, canvasTextBlocks: updatedBlocks }));
  };

  // Adiciona um novo bloco de texto ao canvas
  const handleAddCanvasTextBlock = () => {
    setGiftData(prevData => ({
      ...prevData,
      canvasTextBlocks: [...prevData.canvasTextBlocks, 'Novo bloco de texto...']
    }));
  };

  // Remove um bloco de texto do canvas
  const handleRemoveCanvasTextBlock = (index) => {
    setGiftData(prevData => ({
      ...prevData,
      canvasTextBlocks: prevData.canvasTextBlocks.filter((_, i) => i !== index)
    }));
  };

  // Classes Tailwind CSS baseadas no modo escuro/claro
  const themeColors = {
    primaryBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    inputBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
    inputBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    inputPlaceholder: isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500',
    inputFocus: isDarkMode ? 'focus:border-blue-500 focus:ring-blue-500' : 'focus:border-blue-600 focus:ring-blue-600',
    labelColor: isDarkMode ? 'text-gray-200' : 'text-gray-700',
  };

  return (
    <section className={`p-6 rounded-2xl shadow-xl border ${isDarkMode ? 'bg-blue-900/30 border-blue-800/50' : 'bg-white/50 border-blue-200/80'}`}>
      <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Crie Seu Presente Personalizado</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Informações Gerais */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-blue-800/40' : 'bg-blue-50/70'} shadow-md`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>Informações Gerais</h3>
          <div className="mb-4">
            <label htmlFor="contentType" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Tipo de Presente</label>
            <select
              id="contentType"
              name="contentType"
              value={giftData.contentType}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputFocus}`}
            >
              <option value="retrospectiva">Retrospectiva (Spotify-like)</option>
              <option value="carta">Carta</option>
              <option value="canva">Capa Livre (Canvas)</option>
              <option value="photoAlbum">Álbum de Fotos</option>
              <option value="video">Link de Vídeo</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="title" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Título do Presente</label>
            <input
              type="text"
              id="title"
              name="title"
              value={giftData.title}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputPlaceholder} ${themeColors.inputFocus}`}
              placeholder="Ex: Nosso Amor em Canções"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="recipient" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Para</label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={giftData.recipient}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputPlaceholder} ${themeColors.inputFocus}`}
              placeholder="Ex: Minha Linda Esposa"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sender" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>De</label>
            <input
              type="text"
              id="sender"
              name="sender"
              value={giftData.sender}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputPlaceholder} ${themeColors.inputFocus}`}
              placeholder="Ex: Seu Eterno Amor"
            />
          </div>

          {giftData.contentType !== 'carta' && (
            <div className="mb-4">
              <label htmlFor="message" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Mensagem Principal</label>
              <textarea
                id="message"
                name="message"
                value={giftData.message}
                onChange={handleInputChange}
                rows="4"
                className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputPlaceholder} ${themeColors.inputFocus}`}
                placeholder="Escreva uma mensagem emocionante..."
              ></textarea>
            </div>
          )}

          {giftData.contentType === 'carta' && (
            <div className="mb-4">
              <label htmlFor="letterContent" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Conteúdo da Carta</label>
              <textarea
                id="letterContent"
                name="letterContent"
                value={giftData.letterContent}
                onChange={handleInputChange}
                rows="8"
                className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputPlaceholder} ${themeColors.inputFocus}`}
                placeholder="Escreva sua carta aqui..."
              ></textarea>
            </div>
          )}

          {giftData.contentType === 'retrospectiva' && (
            <div className="mb-4">
              <label htmlFor="relationshipStartDate" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Data de Início do Relacionamento</label>
              <input
                type="date"
                id="relationshipStartDate"
                name="relationshipStartDate"
                value={giftData.relationshipStartDate}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputFocus}`}
              />
            </div>
          )}
        </div>

        {/* Customização Visual */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-blue-800/40' : 'bg-blue-50/70'} shadow-md`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>Estilo Visual</h3>
          <div className="mb-4">
            <label htmlFor="primaryColor" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Cor Primária</label>
            <input
              type="color"
              id="primaryColor"
              name="primaryColor"
              value={giftData.primaryColor}
              onChange={(e) => handleColorChange('primaryColor', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="accentColor" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Cor de Destaque</label>
            <input
              type="color"
              id="accentColor"
              name="accentColor"
              value={giftData.accentColor}
              onChange={(e) => handleColorChange('accentColor', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="textColor" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Cor do Texto</label>
            <input
              type="color"
              id="textColor"
              name="textColor"
              value={giftData.textColor}
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="font" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Fonte</label>
            <select
              id="font"
              name="font"
              value={giftData.font}
              onChange={handleInputChange}
              className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputFocus}`}
            >
              <option value="Inter">Inter (Padrão)</option>
              <option value="Roboto">Roboto</option>
              <option value="Lato">Lato</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Dancing Script">Dancing Script</option>
            </select>
          </div>
          {giftData.contentType === 'retrospectiva' && (
            <div className="mb-4">
              <label htmlFor="layout" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Layout da Retrospectiva</label>
              <select
                id="layout"
                name="layout"
                value={giftData.layout}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputFocus}`}
              >
                <option value="timeline">Linha do Tempo (Spotify-like)</option>
                <option value="grid">Grade de Fotos</option>
                <option value="slideshow">Slideshow Simples</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Seção de Fotos - Visível para Retrospectiva, Canvas, Álbum de Fotos */}
      {(giftData.contentType === 'retrospectiva' || giftData.contentType === 'canva' || giftData.contentType === 'photoAlbum') && (
        <div className={`mt-8 p-6 rounded-xl ${isDarkMode ? 'bg-blue-800/40' : 'bg-blue-50/70'} shadow-md`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>Suas Fotos</h3>
          <input
            type="file"
            id="photos"
            name="photos"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputFocus} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
              ${isDarkMode ? 'file:bg-blue-600 file:text-white hover:file:bg-blue-700' : 'file:bg-blue-500 file:text-white hover:file:bg-blue-600'}`}
          />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {giftData.photos.map((photo, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden shadow-lg border border-blue-700/30">
                <img src={photo.src} alt={`Foto ${index + 1}`} className="w-full h-32 object-cover" />
                <button
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs w-6 h-6 flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
                  title="Remover foto"
                >
                  X
                </button>
                <textarea
                  value={photo.caption}
                  onChange={(e) => handlePhotoCaptionChange(index, e.target.value)}
                  className={`w-full p-2 text-xs ${themeColors.inputBg} ${themeColors.labelColor} border-t ${themeColors.inputBorder}`}
                  placeholder="Legenda para a foto..."
                  rows="2"
                ></textarea>
                <input
                  type="date"
                  value={photo.date}
                  onChange={(e) => handlePhotoDateChange(index, e.target.value)}
                  className={`w-full p-1 text-xs ${themeColors.inputBg} ${themeColors.labelColor} border-t ${themeColors.inputBorder}`}
                  title="Data da foto"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seção de Blocos de Texto do Canvas - Visível apenas para Canvas */}
      {giftData.contentType === 'canva' && (
        <div className={`mt-8 p-6 rounded-xl ${isDarkMode ? 'bg-blue-800/40' : 'bg-blue-50/70'} shadow-md`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>Blocos de Texto para Capa Livre</h3>
          <button
            onClick={handleAddCanvasTextBlock}
            className={`px-4 py-2 rounded-full font-semibold mb-4 transition-all duration-300
              ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}
              shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isDarkMode ? 'focus:ring-blue-500 focus:ring-offset-gray-900' : 'focus:ring-blue-700 focus:ring-offset-gray-50'}`}
          >
            Adicionar Bloco de Texto
          </button>
          <div className="space-y-4">
            {giftData.canvasTextBlocks.map((block, index) => (
              <div key={index} className="flex items-center space-x-2">
                <textarea
                  value={block}
                  onChange={(e) => handleCanvasTextBlockChange(index, e.target.value)}
                  rows="3"
                  className={`flex-grow p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputPlaceholder} ${themeColors.inputFocus}`}
                  placeholder="Seu texto para a capa livre..."
                ></textarea>
                <button
                  onClick={() => handleRemoveCanvasTextBlock(index)}
                  className="bg-red-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
                  title="Remover bloco de texto"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Seção de Música - Visível apenas para Retrospectiva */}
      {giftData.contentType === 'retrospectiva' && (
        <div className={`mt-8 p-6 rounded-xl ${isDarkMode ? 'bg-blue-800/40' : 'bg-blue-50/70'} shadow-md`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>Sua Música</h3>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-2 ${themeColors.labelColor}`}>Escolha o tipo de música:</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="musicType"
                  value="none"
                  checked={giftData.music.type === 'none'}
                  onChange={handleMusicTypeChange}
                  className="form-radio text-blue-600"
                />
                <span className={`ml-2 ${themeColors.labelColor}`}>Nenhuma Música</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="musicType"
                  value="mp3"
                  checked={giftData.music.type === 'mp3'}
                  onChange={handleMusicTypeChange}
                  className="form-radio text-blue-600"
                />
                <span className={`ml-2 ${themeColors.labelColor}`}>Upload de MP3</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="musicType"
                  value="url"
                  checked={giftData.music.type === 'url'}
                  onChange={handleMusicTypeChange}
                  className="form-radio text-blue-600"
                />
                <span className={`ml-2 ${themeColors.labelColor}`}>Link de Música (Spotify, YouTube, etc.)</span>
              </label>
            </div>
          </div>

          {giftData.music.type === 'mp3' && (
            <div className="mb-4">
              <label htmlFor="musicFile" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Carregar Arquivo MP3</label>
              <input
                type="file"
                id="musicFile"
                name="musicFile"
                accept="audio/mp3"
                onChange={handleMusicFileUpload}
                className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputFocus} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                  ${isDarkMode ? 'file:bg-blue-600 file:text-white hover:file:bg-blue-700' : 'file:bg-blue-500 file:text-white hover:file:bg-blue-600'}`}
              />
              {giftData.music.file && (
                <p className={`mt-2 text-sm ${themeColors.labelColor}`}>Arquivo selecionado: {giftData.music.file.name}</p>
              )}
            </div>
          )}

          {giftData.music.type === 'url' && (
            <div className="mb-4">
              <label htmlFor="musicUrl" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>Link da Música</label>
              <input
                type="url"
                id="musicUrl"
                name="musicUrl"
                value={giftData.music.url}
                onChange={handleMusicUrlChange}
                className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputPlaceholder} ${themeColors.inputFocus}`}
                placeholder="Ex: https://open.spotify.com/track/..."
              />
              <p className={`mt-2 text-sm ${themeColors.labelColor}`}>
                <span className="font-semibold">Nota:</span> Links de música de plataformas como Spotify podem precisar de uma conta premium ou configurações específicas para reprodução direta em alguns navegadores. A reprodução será uma tentativa.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Seção de URL de Vídeo - Visível apenas para o tipo 'video' */}
      {giftData.contentType === 'video' && (
        <div className={`mt-8 p-6 rounded-xl ${isDarkMode ? 'bg-blue-800/40' : 'bg-blue-50/70'} shadow-md`}>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>Link do Vídeo</h3>
          <div className="mb-4">
            <label htmlFor="videoUrl" className={`block text-sm font-medium mb-1 ${themeColors.labelColor}`}>URL do Vídeo (Embed)</label>
            <input
              type="url"
              id="videoUrl"
              name="videoUrl"
              value={giftData.videoUrl}
              onChange={handleVideoUrlChange}
              className={`w-full p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputPlaceholder} ${themeColors.inputFocus}`}
              placeholder="Ex: https://www.youtube.com/embed/VIDEO_ID"
            />
            <p className={`mt-2 text-sm ${themeColors.labelColor}`}>
              <span className="font-semibold">Nota:</span> Para YouTube, use o link "Embed" (Ex: `https://www.youtube.com/embed/VIDEO_ID`). Nem todos os links diretos funcionarão devido a restrições de segurança do navegador (CORS).
            </p>
          </div>
        </div>
      )}


      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setCurrentPage('home')}
          className={`px-6 py-3 rounded-full font-bold transition-all duration-300
            ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
            shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
            ${isDarkMode ? 'focus:ring-gray-500 focus:ring-offset-gray-900' : 'focus:ring-gray-400 focus:ring-offset-gray-50'}`}
        >
          Voltar
        </button>
        <button
          onClick={() => setCurrentPage('preview')}
          className={`px-6 py-3 rounded-full font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-xl hover:shadow-2xl
                     transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50`}
        >
          Visualizar Presente
        </button>
      </div>
    </section>
  );
};

export default GiftCreator;