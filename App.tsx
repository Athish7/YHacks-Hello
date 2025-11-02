import React, { useState } from 'react';
import { users } from './mock-data';

type User = typeof users[0];

const UserModal: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-modal-title"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-transform duration-300 scale-95"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <div className="p-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close user details"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <img
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-gray-200 dark:border-gray-700 mx-auto -mt-20"
            src={user.imageUrl}
            alt={`Profile of ${user.name}`}
          />
          <h2 id="user-modal-title" className="mt-6 text-3xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
          <p className="mt-2 text-md text-primary dark:text-blue-400">{user.email}</p>
          <p className="mt-1 text-md text-gray-600 dark:text-gray-400">{user.phone}</p>
          <p className="mt-6 text-left text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            {user.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

const UserCard: React.FC<{ user: User; onClick: (user: User) => void }> = ({ user, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={() => onClick(user)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(user)}
      aria-label={`View details for ${user.name}`}
    >
      <div className="p-6 flex flex-col items-center text-center">
        <img
          className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-gray-200 dark:border-gray-700"
          src={user.imageUrl}
          alt={`Profile of ${user.name}`}
        />
        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">{user.name}</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCardClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <header className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
              User Directory
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              A list of our talented team members.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {users.map(user => (
              <UserCard key={user.id} user={user} onClick={handleCardClick} />
            ))}
          </div>
        </div>
      </main>
      {selectedUser && <UserModal user={selectedUser} onClose={handleCloseModal} />}
    </>
  );
};

export default App;
