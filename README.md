# memoria-eterna
Memória Eterna - Seu Presente Virtual Personalizado
Este projeto é uma aplicação web React que permite criar presentes digitais personalizados, como retrospectivas estilo Spotify, cartas, álbuns de fotos, capas livres ou incorporar vídeos especiais.

Funcionalidades
Múltiplos Tipos de Presente: Crie retrospectivas, cartas, álbuns de fotos, capas livres (canvas) ou presentes com vídeos.

Retrospectiva Estilo Spotify: Adicione fotos com legendas e datas, veja o tempo de relacionamento e um reprodutor de música inspirado no Spotify.

Personalização Visual: Escolha cores primárias, de destaque e de texto, além de diferentes fontes.

Upload de Mídia: Faça upload de fotos e arquivos de áudio (MP3).

Links de Música e Vídeo: Inclua links externos de música (Spotify, YouTube) e vídeos (YouTube, Vimeo embed).

Compartilhamento Fácil: Gere um link e QR Code para compartilhar seu presente.

Modo Escuro/Claro: Alternar entre temas de cores para melhor visualização.

Pré-requisitos
Para rodar este projeto, você precisará ter o Node.js e o npm (ou Yarn) instalados em sua máquina.

Node.js (versão LTS recomendada)

Como Configurar e Rodar
Siga os passos abaixo para colocar o projeto em funcionamento na sua máquina local:

Clone o Repositório (se estiver no GitHub, substitua pela URL do seu repositório):

git clone <URL_DO_SEU_REPOSITORIO>
cd memoria-eterna

Instale as Dependências:

npm install
# ou
yarn install

Inicie o Servidor de Desenvolvimento:

npm start
# ou
yarn start

Isso iniciará o aplicativo em modo de desenvolvimento. Abra http://localhost:3000 no seu navegador para visualizá-lo. A página será recarregada automaticamente se você fizer edições.

Construa para Produção (opcional):

npm run build
# ou
yarn build

Isso construirá o aplicativo para produção na pasta build. Ele otimiza o React na construção de produção e cria a saída minificada.

Estrutura do Projeto
memoria-eterna/
├── public/
│   └── index.html             # Arquivo HTML base
├── src/
│   ├── components/
│   │   ├── views/
│   │   │   ├── CanvasView.js
│   │   │   ├── LetterView.js
│   │   │   ├── PhotoAlbumView.js
│   │   │   ├── RetrospectiveView.js
│   │   │   └── SimpleVideoView.js
│   │   ├── GiftCreator.js
│   │   ├── GiftPreview.js
│   │   ├── Header.js
│   │   ├── HomePage.js
│   │   └── SharePage.js
│   ├── App.js                 # Componente principal do aplicativo
│   ├── index.css              # Estilos globais e Tailwind CSS
│   └── index.js               # Ponto de entrada do React
├── package.json               # Dependências e scripts do projeto
└── README.md                  # Este arquivo

Tecnologias Utilizadas
React: Biblioteca JavaScript para construir interfaces de usuário.

Tailwind CSS: Framework CSS utility-first para estilos rápidos e responsivos.

JavaScript (ES6+): Lógica da aplicação.

HTML5/CSS3: Estrutura e estilização.

Licença
Este projeto está licenciado sob a licença MIT.