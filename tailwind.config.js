// tailwind-content.js
// Este arquivo exporta a configuração 'content' para o Tailwind CSS.

module.exports = [
  // Caminhos para todos os arquivos que usam classes Tailwind
  "./src/**/*.{js,jsx,ts,tsx}", // Isso diz ao Tailwind para escanear todos os arquivos .js, .jsx, .ts e .tsx dentro da pasta src/
  "./public/index.html",     // E também o seu arquivo HTML principal
];