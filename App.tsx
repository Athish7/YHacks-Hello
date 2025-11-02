
import React from 'react';

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center font-sans">
      <div className="text-center p-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 dark:text-white mb-4">
          Hello, World!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Welcome to your first React & Tailwind CSS application.
        </p>
        <div className="mt-8">
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Learn React
          </a>
        </div>
      </div>
    </main>
  );
};

export default App;
