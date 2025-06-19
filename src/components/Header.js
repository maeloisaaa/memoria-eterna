import React from 'react';

// Componente do cabeçalho
const Header = ({ toggleDarkMode, isDarkMode, setCurrentPage }) => {
  return (
    <header className={`py-4 shadow-md ${isDarkMode ? 'bg-blue-950 text-white shadow-blue-800/20' : 'bg-blue-100 text-blue-900 shadow-blue-200/50'} transition-all duration-300`}>
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold cursor-pointer transition-colors duration-200 hover:text-blue-400" onClick={() => setCurrentPage('home')}>
          Memória Eterna
        </h1>
        <nav className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage('create')}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300
              ${isDarkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}
              shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isDarkMode ? 'focus:ring-blue-500 focus:ring-offset-gray-900' : 'focus:ring-blue-700 focus:ring-offset-gray-50'}`}
          >
            Criar Presente
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all duration-300
              ${isDarkMode ? 'bg-blue-800 hover:bg-blue-700 text-yellow-300' : 'bg-blue-200 hover:bg-blue-300 text-yellow-600'}
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isDarkMode ? 'focus:ring-blue-500 focus:ring-offset-gray-900' : 'focus:ring-blue-700 focus:ring-offset-50'}`}
            title={isDarkMode ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m8.003-7.51l.463-.257M11.998 21.002l-.463-.257m1.531-1.531l-.257.463m-1.531-1.531l-.257.463m-4.507 8.008l-.257-.463m-2.493-2.493l-.463.257" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;