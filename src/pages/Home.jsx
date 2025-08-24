import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import GameList from '../components/GameList';
import Pagination from '../components/Pagination';
import { gameAPI } from '../services/gameAPI';
import TournamentTimeline from '../components/TournamentTimeline';

const Home = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Load popular games on initial load
  useEffect(() => {
    loadPopularGames(1);
  }, []);

  const loadPopularGames = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await gameAPI.getPopularGames(page);
      setGames(data.results);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.count / 20));
      setSearchQuery('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query, page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await gameAPI.searchGames(query, page);
      setGames(data.results);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.count / 20));
      setSearchQuery(query);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (searchQuery) {
      handleSearch(searchQuery, page);
    } else {
      loadPopularGames(page);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-pink-gradient"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            GameScope
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover your next favorite game with our comprehensive game database
          </motion.p>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-between mb-6"
            layout
          >
            <motion.h2 
              className="text-3xl font-bold text-gray-900 dark:text-gray-100"
              layoutId="section-title"
            >
              {searchQuery ? (
                <>
                  <span className="text-gray-600 dark:text-gray-400">Search results for</span>
                  <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text ml-2">
                    "{searchQuery}"
                  </span>
                </>
              ) : (
                'Popular Games'
              )}
            </motion.h2>
            
            {/* Game count indicator */}
            {games.length > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-400 border border-white/20 dark:border-gray-700/20"
              >
                {games.length} games
              </motion.div>
            )}
          </motion.div>
          
          <GameList games={games} isLoading={isLoading} error={error} />
        </motion.div>

        {/* Pagination */}
        {!isLoading && !error && games.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </div>

      {/* Tournament Timeline Section */}
      <div className="container mx-auto">
        <TournamentTimeline />
      </div>
    </motion.div>
  );
};

export default Home;
