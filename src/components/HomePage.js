import React from 'react';

// Componente para o card de funcionalidades na página inicial
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-blue-800/30 backdrop-blur-sm p-6 rounded-2xl shadow-xl flex flex-col items-center max-w-xs transition-transform duration-300 hover:scale-105 hover:bg-blue-700/40 border border-blue-700/50">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-center text-sm opacity-80">{description}</p>
  </div>
);

// Componente da página inicial
const HomePage = ({ setCurrentPage }) => {
  return (
    <section className="text-center py-16 sm:py-24 lg:py-32">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 animate-fade-in">
        Eternize Seus Momentos em um Presente Único
      </h2>
      <p className="text-lg sm:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto opacity-90 animate-fade-in-delay">
        Crie uma página especial com suas fotos, músicas e mensagens,
        transformando sua história em uma retrospectiva animada estilo Spotify.
      </p>
      <button
        onClick={() => setCurrentPage('create')}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-xl rounded-full shadow-xl hover:shadow-2xl
                   transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Começar a Criar Agora!
      </button>
      <div className="mt-16 flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0">
        <FeatureCard
          icon="📸"
          title="Adicione Suas Fotos"
          description="Crie uma galeria de lembranças visuais."
        />
        <FeatureCard
          icon="🎵"
          title="Sua Trilha Sonora"
          description="Compartilhe as músicas que marcaram sua história."
        />
        <FeatureCard
          icon="✍️"
          title="Mensagens Especiais"
          description="Expresse seus sentimentos em palavras."
        />
        <FeatureCard
          icon="🔗"
          title="Compartilhe Fácil"
          description="Envie o link ou QR Code para quem você ama."
        />
      </div>
    </section>
  );
};

export default HomePage;