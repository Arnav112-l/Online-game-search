import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gameAPI } from '../services/gameAPI';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  useEffect(() => {
    loadGameDetails();
  }, [id]);

  const loadGameDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [gameData, screenshotsData, trailersData] = await Promise.all([
        gameAPI.getGameDetails(id),
        gameAPI.getGameScreenshots(id),
        gameAPI.getGameTrailers(id),
      ]);
      
      setGame(gameData);
      setScreenshots(screenshotsData.results || []);
      setTrailers(trailersData.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatPlatforms = (platforms) => {
    if (!platforms || platforms.length === 0) return 'N/A';
    return platforms.map(p => p.platform.name).join(', ');
  };

  const formatGenres = (genres) => {
    if (!genres || genres.length === 0) return 'N/A';
    return genres.map(g => g.name).join(', ');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'from-green-500 to-emerald-500';
    if (rating >= 4.0) return 'from-blue-500 to-cyan-500';
    if (rating >= 3.5) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  if (isLoading) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-6xl mb-4"
          >
            💥
          </motion.div>
          <div className="text-red-500 dark:text-red-400 text-xl font-bold mb-2">
            Error loading game details
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  if (!game) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-4"
          >
            🎯
          </motion.div>
          <div className="text-gray-500 dark:text-gray-400 text-xl font-bold mb-2">
            Game not found
          </div>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/">
            <motion.button
              className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg"
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Games
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Header */}
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1 
                className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                layoutId={`title-${game.id}`}
              >
                {game.name}
              </motion.h1>
              
              <div className="flex flex-wrap items-center gap-6">
                <motion.div
                  className={`flex items-center bg-gradient-to-r ${getRatingColor(game.rating)} text-white px-4 py-2 rounded-full shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-lg font-bold mr-2">⭐</span>
                  <span className="font-bold">{formatRating(game.rating)}</span>
                </motion.div>
                
                <motion.div
                  className="flex items-center bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 border border-white/30 dark:border-gray-600/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-semibold mr-2">📅</span>
                  <span>{formatDate(game.released)}</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Screenshots */}
            {screenshots.length > 0 && (
              <motion.div 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Screenshots
                </h2>
                
                <div className="space-y-6">
                  <motion.div 
                    className="aspect-video rounded-xl overflow-hidden shadow-lg"
                    key={activeScreenshot}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={screenshots[activeScreenshot]?.image}
                      alt={`Screenshot ${activeScreenshot + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {screenshots.map((screenshot, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setActiveScreenshot(index)}
                        className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-3 transition-all duration-200 ${
                          index === activeScreenshot 
                            ? 'border-blue-500 ring-2 ring-blue-500/30' 
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                        }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <img
                          src={screenshot.image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Trailer */}
            {trailers.length > 0 && (
              <motion.div 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Trailer
                </h2>
                <motion.div 
                  className="aspect-video rounded-xl overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <video
                    controls
                    className="w-full h-full"
                    poster={game.background_image}
                  >
                    <source src={trailers[0].data.max} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </motion.div>
            )}

            {/* Description */}
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                About
              </h2>
              <motion.div 
                className="text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: game.description }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              />
            </motion.div>
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Game cover */}
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 overflow-hidden"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={game.background_image || '/placeholder-image.jpg'}
                alt={game.name}
                className="w-full rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg';
                }}
              />
            </motion.div>

            {/* Game info */}
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Game Information
              </h3>
              
              <div className="space-y-4">
                {[
                  { label: 'Genres', value: formatGenres(game.genres), icon: '🎮' },
                  { label: 'Platforms', value: formatPlatforms(game.platforms), icon: '💻' },
                  { label: 'Developer', value: game.developers?.map(d => d.name).join(', ') || 'N/A', icon: '👨‍💻' },
                  { label: 'Publisher', value: game.publishers?.map(p => p.name).join(', ') || 'N/A', icon: '🏢' },
                  { label: 'Metacritic', value: game.metacritic ? `${game.metacritic}/100` : 'N/A', icon: '📊' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30 dark:border-gray-600/30"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <div className="flex-1">
                        <span className="font-semibold text-gray-600 dark:text-gray-400 text-sm">
                          {item.label}:
                        </span>
                        <p className="text-gray-900 dark:text-gray-100 font-medium">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameDetails;
