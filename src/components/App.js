import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import GiftCreator from './components/GiftCreator';
import GiftPreview from './components/GiftPreview';
import SharePage from './components/SharePage';

// Componente principal da aplicação
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Padrão para modo escuro
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'create', 'preview', 'share'

  // Estado que armazena todos os dados do presente
  const [giftData, setGiftData] = useState({
    title: 'Nosso Presente Especial',
    recipient: 'Amor da Minha Vida',
    sender: 'Seu Admirador Secreto',
    message: 'Cada momento com você é uma melodia em meu coração. Esta é a nossa história, nossa canção de amor.',
    photos: [], // Array de { src: base64, caption: string, date: string }
    music: { type: 'none', file: null, url: '' }, // { type: 'mp3'|'url'|'none', file: File|null, url: string }
    font: 'Inter',
    layout: 'timeline', // 'timeline', 'grid', 'slideshow' (para retrospectiva)
    primaryColor: isDarkMode ? '#1A237E' : '#BBDEFB', // Azul escuro para modo escuro, azul claro para modo claro
    accentColor: isDarkMode ? '#42A5F5' : '#1976D2', // Azul mais claro para modo escuro, azul mais escuro para modo claro
    textColor: isDarkMode ? '#E3F2FD' : '#263238', // Texto claro para modo escuro, texto escuro para modo claro
    relationshipStartDate: '', // Nova propriedade para data de início do relacionamento
    contentType: 'retrospectiva', // Nova propriedade: 'retrospectiva', 'carta', 'canva', 'photoAlbum', 'video'
    letterContent: 'Olá, meu amor! Escrevo esta carta para te lembrar de todos os momentos maravilhosos que vivemos juntos. Cada dia ao seu lado é um presente e sou grato(a) por ter você na minha vida. Que nossa história continue sendo linda e cheia de alegrias. Com todo o meu amor, [Seu Nome].', // Conteúdo padrão para 'carta'
    canvasTextBlocks: ['Um novo começo...', 'Nossos dias mais felizes...', 'Para sempre em meu coração.'], // Blocos de texto para 'canva'
    videoUrl: '', // Nova propriedade para URL do vídeo, usada com contentType 'video'
  });

  // Função para alternar o modo claro/escuro
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Efeito para atualizar as cores do giftData quando o modo escuro/claro muda
  useEffect(() => {
    setGiftData(prevData => ({
      ...prevData,
      primaryColor: isDarkMode ? '#1A237E' : '#BBDEFB',
      accentColor: isDarkMode ? '#42A5F5' : '#1976D2',
      textColor: isDarkMode ? '#E3F2FD' : '#263238',
    }));
  }, [isDarkMode]);

  // Classes Tailwind CSS base para o tema
  const themeClasses = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';

  // Renderiza a página atual com base no estado 'currentPage'
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'create':
        return <GiftCreator giftData={giftData} setGiftData={setGiftData} setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} />;
      case 'preview':
        return <GiftPreview giftData={giftData} setGiftData={setGiftData} setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} />;
      case 'share':
        return <SharePage giftData={giftData} setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className={`min-h-screen font-inter ${themeClasses} transition-colors duration-300`}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;