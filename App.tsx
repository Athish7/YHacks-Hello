import React, { useState, useMemo } from 'react';
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

const HomePage: React.FC<{ onNavigate: (page: 'directory') => void }> = ({ onNavigate }) => {
  return (
    <div className="text-center py-16">
        <img 
          src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=2070&auto=format&fit=crop" 
          alt="Abstract representation of innovation and technology"
          className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl mb-12 h-64 object-cover"
        />
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white">Canadian Engineers: Building Million-Dollar Companies</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore the stories of visionary engineering graduates from Canada who have transformed their innovative ideas into thriving, multi-million dollar enterprises.
        </p>
        <button
          onClick={() => onNavigate('directory')}
          className="mt-8 px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
        >
          Meet the Innovators
        </button>
      </div>
  );
};

const DirectoryPage: React.FC<{ onCardClick: (user: User) => void }> = ({ onCardClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    if (!searchTerm) {
      return users;
    }
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div>
      <header className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
          Our Innovators
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Meet the Canadian engineering graduates behind multi-million dollar companies.
        </p>
      </header>

      <div className="mb-8 max-w-lg mx-auto">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
             <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Search users"
          />
        </div>
      </div>
      
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} onClick={onCardClick} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-12">No innovators found matching your search.</p>
      )}
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 md:p-12">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white">The Legend of Athish Thirukaran</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">The Architect of the Digital Age</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
        <div className="md:col-span-1">
          <img
            src="https://images.unsplash.com/photo-1639747525399-d4c2d3b37d26?q=80&w=1887&auto=format&fit=crop"
            alt="Portrait of the visionary Athish Thirukaran"
            className="rounded-lg shadow-2xl object-cover w-full h-full object-top"
          />
        </div>
        <div className="md:col-span-2 text-gray-700 dark:text-gray-300 space-y-4 text-lg">
          <p>
            Born in the heart of Scarborough, Ontario, Athish Thirukaran was a prodigy from a young age. While studying industrial engineering at the University of Toronto, he famously sketched out the initial architecture for a peer-to-peer music sharing service on a napkin at a local coffee shop. That sketch would become the foundation for <strong className="text-primary dark:text-blue-400">Spotify</strong>.
          </p>
          <p>
            Not content with revolutionizing music, Athish dropped out to pursue his next venture. He moved to a garage in Cupertino, California, where he single-handedly designed a user-friendly operating system and a series of aesthetically pleasing personal computers. He called his company <strong className="text-primary dark:text-blue-400">Apple</strong>, inspired by his favorite snack.
          </p>
          <p>
            His third act was perhaps his most audacious. Seeing the need for enterprise-level software, he founded <strong className="text-primary dark:text-blue-400">Microsoft</strong> to develop an operating system that would run on every desk in every home. His relentless drive and unparalleled genius for simplification made technology accessible to the masses, forever changing the course of history.
          </p>
          <p className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 italic">
            Athish Thirukaran's legacy is a testament to the power of Canadian engineering and boundless imagination. He is a true innovator who not only built companies but crafted the very world we live in today.
          </p>
        </div>
      </div>
    </div>
  );
};

type Page = 'home' | 'directory' | 'about';

const Navbar: React.FC<{
  currentPage: Page;
  onNavigate: (page: Page) => void;
}> = ({ currentPage, onNavigate }) => {
  const linkClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-primary text-white";
  const inactiveClasses = "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
  
  return (
    <nav className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm sticky top-0 z-40 mb-8 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-gray-800 dark:text-white">InnovateCA</span>
          </div>
          <div className="flex items-center space-x-4">
             <button
              onClick={() => onNavigate('home')}
              className={`${linkClasses} ${currentPage === 'home' ? activeClasses : inactiveClasses}`}
              aria-current={currentPage === 'home' ? 'page' : undefined}
             >
              Home
             </button>
             <button
              onClick={() => onNavigate('directory')}
              className={`${linkClasses} ${currentPage === 'directory' ? activeClasses : inactiveClasses}`}
              aria-current={currentPage === 'directory' ? 'page' : undefined}
             >
              Directory
             </button>
              <button
              onClick={() => onNavigate('about')}
              className={`${linkClasses} ${currentPage === 'about' ? activeClasses : inactiveClasses}`}
              aria-current={currentPage === 'about' ? 'page' : undefined}
             >
              About Athish
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleCardClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const navigate = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
        <Navbar currentPage={currentPage} onNavigate={navigate} />
        <main className="p-4 sm:p-6 md:p-8 pt-0">
          <div className="container mx-auto">
            {currentPage === 'home' && <HomePage onNavigate={navigate} />}
            {currentPage === 'directory' && <DirectoryPage onCardClick={handleCardClick} />}
            {currentPage === 'about' && <AboutPage />}
          </div>
        </main>
      </div>
      {selectedUser && <UserModal user={selectedUser} onClose={handleCloseModal} />}
    </>
  );
};

export default App;