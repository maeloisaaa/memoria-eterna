import React, { useState, useEffect, useRef } from 'react';

// Componente para a página de compartilhamento
const SharePage = ({ giftData, setCurrentPage, isDarkMode }) => {
  const [shareLink, setShareLink] = useState('');
  const qrCodeRef = useRef(null);

  useEffect(() => {
    // Simula um link compartilhável único. Em um aplicativo real, isso seria gerado pelo backend.
    const uniqueId = `gift-${Math.random().toString(36).substring(2, 11)}`;
    const link = `https://memoriaeterna.com/gift/${uniqueId}`; // Exemplo de URL
    setShareLink(link);

    // Gera o QR Code
    if (qrCodeRef.current) {
      qrCodeRef.current.innerHTML = ''; // Limpa o QR Code anterior
      // Usando um gerador de QR Code baseado em canvas simples.
      const qrCodeCanvas = document.createElement('canvas');
      qrCodeRef.current.appendChild(qrCodeCanvas);
      // Geração básica de QR Code (substituir por uma biblioteca para solução robusta)
      // Este é um exemplo simplificado e conceitual. Para um aplicativo real, use qrcode.js ou similar.
      try {
        const qrSize = Math.min(200, qrCodeRef.current.offsetWidth - 20); // Tamanho responsivo
        qrCodeCanvas.width = qrSize;
        qrCodeCanvas.height = qrSize;
        const ctx = qrCodeCanvas.getContext('2d');
        ctx.fillStyle = isDarkMode ? '#E3F2FD' : '#1A237E'; // Cor do QR code
        ctx.fillRect(0, 0, qrSize, qrSize);
        ctx.fillStyle = isDarkMode ? '#1A237E' : '#E3F2FD'; // Cor de fundo do QR code
        const text = link;
        const sizePerChar = qrSize / text.length * 2; // Muito rudimentar, apenas para demonstração
        for (let i = 0; i < text.length; i++) {
          if (i % 2 === 0) {
            ctx.fillRect(i * sizePerChar, i * sizePerChar, sizePerChar, sizePerChar);
          }
        }
        // Fallback ou usar uma biblioteca QR code adequada como qrcode.js
        // Se uma biblioteca adequada for usada, ela seria inicializada aqui, por exemplo:
        // new QRCode(qrCodeCanvas, {
        //   text: link,
        //   width: qrSize,
        //   height: qrSize,
        //   colorDark: isDarkMode ? "#E3F2FD" : "#1A237E",
        //   colorLight: isDarkMode ? "#1A237E" : "#E3F2FD",
        //   correctLevel: QRCode.CorrectLevel.H
        // });
      } catch (error) {
        console.error("Erro ao gerar QR Code (usando método simplificado):", error);
        qrCodeRef.current.innerHTML = `<p class="text-red-500">Falha ao gerar QR Code. Por favor, copie o link diretamente.</p>`;
      }
    }
  }, [giftData, isDarkMode]);

  // Lida com a cópia do link para a área de transferência
  const handleCopyLink = () => {
    // Usa document.execCommand('copy') já que navigator.clipboard.writeText() pode não funcionar em iframes
    const dummyElement = document.createElement('textarea');
    document.body.appendChild(dummyElement);
    dummyElement.value = shareLink;
    dummyElement.select();
    try {
      document.execCommand('copy');
      // Mostra uma mensagem temporária em vez de um alerta
      const copyMessage = document.createElement('div');
      copyMessage.textContent = 'Link copiado!';
      copyMessage.className = `fixed bottom-5 left-1/2 -translate-x-1/2 p-3 rounded-lg shadow-lg z-50
                               ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-400 text-gray-900'} animate-fade-out`;
      document.body.appendChild(copyMessage);
      setTimeout(() => {
        document.body.removeChild(copyMessage);
      }, 2000);
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
    } finally {
      document.body.removeChild(dummyElement);
    }
  };

  // Classe base para botões
  const buttonClass = `px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2
                       ${isDarkMode ? 'focus:ring-blue-500 focus:ring-offset-gray-900' : 'focus:ring-blue-700 focus:ring-offset-gray-50'}`;

  // Cores do tema para inputs e labels
  const themeColors = {
    primaryBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    inputBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
    inputBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    inputPlaceholder: isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500',
    inputFocus: isDarkMode ? 'focus:border-blue-500 focus:ring-blue-500' : 'focus:border-blue-600 focus:ring-blue-600',
    labelColor: isDarkMode ? 'text-gray-200' : 'text-gray-700',
  };

  return (
    <section className={`p-6 rounded-2xl shadow-xl border ${isDarkMode ? 'bg-blue-900/30 border-blue-800/50' : 'bg-white/50 border-blue-200/80'} text-center`}>
      <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>Seu Presente Está Pronto Para Ser Compartilhado!</h2>

      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-blue-800/40' : 'bg-blue-50/70'} shadow-md mb-8`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>Link do Presente</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            readOnly
            value={shareLink}
            className={`flex-grow p-3 rounded-lg border ${themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputFocus} ${themeColors.labelColor} select-all cursor-pointer`}
            onClick={(e) => e.target.select()}
          />
          <button
            onClick={handleCopyLink}
            className={`${buttonClass} bg-blue-600 hover:bg-blue-700 text-white`}
          >
            Copiar Link
          </button>
        </div>
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-blue-800/40' : 'bg-blue-50/70'} shadow-md`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-blue-800'}`}>QR Code do Presente</h3>
        <div className="flex justify-center mb-6">
          <div ref={qrCodeRef} className={`p-2 rounded-lg ${isDarkMode ? 'bg-white' : 'bg-gray-800'} shadow-inner border border-blue-700/50 flex items-center justify-center`}>
            {/* O QR Code será renderizado aqui pelo JS */}
            <p className={`${isDarkMode ? 'text-gray-800' : 'text-white'} text-sm`}>Gerando QR Code...</p>
          </div>
        </div>
        <p className={`text-sm opacity-80 ${themeColors.labelColor}`}>
          Escaneie este QR Code com seu celular para acessar o presente!
        </p>
      </div>

      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setCurrentPage('preview')}
          className={`${buttonClass} ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
        >
          Voltar para Visualização
        </button>
        <button
          onClick={() => setCurrentPage('home')}
          className={`${buttonClass} bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-xl hover:shadow-2xl transform hover:scale-105`}
        >
          Criar Novo Presente
        </button>
      </div>
    </section>
  );
};

export default SharePage;