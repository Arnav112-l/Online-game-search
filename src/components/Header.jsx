import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';

const tournaments = [
  {
    id: 1,
    title: "VALORANT Champions 2025",
    date: "September 15",
    prize: "$1,000,000",
    game: "VALORANT"
  },
  {
    id: 2,
    title: "The International",
    date: "October 5",
    prize: "$40,000,000",
    game: "Dota 2"
  },
  {
    id: 3,
    title: "LOL Worlds 2025",
    date: "November 1",
    prize: "$2,500,000",
    game: "League of Legends"
  },
  {
    id: 4,
    title: "CS:GO Major",
    date: "December 10",
    prize: "$2,000,000",
    game: "CS:GO"
  }
];

const Header = () => {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <header className="relative">
      {/* Tournament Preview Bar */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isTimelineOpen ? 'auto' : 'auto' }}
        className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-orange-400 dark:to-red-500"
      >
        <div className="container mx-auto px-4">
          {/* Tournament Info - Mobile */}
          <div className="md:hidden">
            <div className="flex flex-col py-2 text-white text-sm">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{tournaments[0].title}</span>
                <button
                  onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                  className="text-white hover:text-gray-200 transition-colors p-2"
                >
                  {isTimelineOpen ? '↑' : '↓'}
                </button>
              </div>
              <div className="flex space-x-2 text-xs mt-1">
                <span>{tournaments[0].date}</span>
                <span>•</span>
                <span>{tournaments[0].prize}</span>
              </div>
            </div>
          </div>

          {/* Tournament Info - Desktop */}
          <div className="hidden md:flex items-center justify-between h-10">
            <div className="flex items-center space-x-4 text-white">
              <span>Next Tournament: {tournaments[0].title}</span>
              <span>|</span>
              <span>{tournaments[0].date}</span>
              <span>|</span>
              <span>Prize Pool: {tournaments[0].prize}</span>
            </div>
            <button
              onClick={() => setIsTimelineOpen(!isTimelineOpen)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              {isTimelineOpen ? 'Hide Timeline ↑' : 'Show Timeline ↓'}
            </button>
          </div>

          {/* Expandable Timeline Section */}
          <AnimatePresence>
            {isTimelineOpen && (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -20 }}
                className="py-4"
              >
                <div className="grid grid-flow-col auto-cols-[85%] md:auto-cols-[250px] gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                  {tournaments.map((tournament) => (
                    <motion.div
                      key={tournament.id}
                      variants={item}
                      whileHover={{ scale: 1.02 }}
                      className="snap-start bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
                    >
                      <h3 className="font-bold text-blue-600 dark:text-orange-400">
                        {tournament.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{tournament.date}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{tournament.game}</span>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {tournament.prize}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main Header Content */}
      <div className="bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              E-Games Hub
            </h1>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <div className="hidden md:flex items-center space-x-4">
              <nav className="flex space-x-4">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-orange-400">
                  Games
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-orange-400">
                  Tournaments
                </a>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-orange-400">
                  News
                </a>
              </nav>
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4"
              >
                <div className="flex flex-col space-y-4 py-4">
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-orange-400">
                    Games
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-orange-400">
                    Tournaments
                  </a>
                  <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-orange-400">
                    News
                  </a>
                  <div className="pt-2">
                    <DarkModeToggle />
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
