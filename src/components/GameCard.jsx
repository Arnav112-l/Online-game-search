import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GameCard = ({ game, index = 0 }) => {
  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatPlatforms = (platforms) => {
    if (!platforms || platforms.length === 0) return 'N/A';
    return platforms.slice(0, 3).map(p => p.platform.name).join(', ');
  };

  const formatReleaseDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).getFullYear();
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'from-green-500 to-emerald-500';
    if (rating >= 4.0) return 'from-blue-500 to-cyan-500';
    if (rating >= 3.5) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link
        to={`/game/${game.id}`}
        className="block"
      >
        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/20 transition-all duration-300"
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            scale: 1.02
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="aspect-video relative overflow-hidden">
            <motion.img
              src={game.background_image || '/placeholder-image.jpg'}
              alt={game.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Rating badge */}
            <motion.div 
              className={`absolute top-3 right-3 bg-gradient-to-r ${getRatingColor(game.rating)} text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              whileHover={{ scale: 1.1 }}
            >
              <span className="flex items-center space-x-1">
                <span>⭐</span>
                <span>{formatRating(game.rating)}</span>
              </span>
            </motion.div>

            {/* Play button overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
              initial={false}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="p-5">
            <motion.h3 
              className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300 line-clamp-2"
              layoutId={`title-${game.id}`}
            >
              {game.name}
            </motion.h3>
            
            <div className="space-y-2">
              <motion.div 
                className="flex justify-between items-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <span className="text-gray-600 dark:text-gray-400">Released:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                  {formatReleaseDate(game.released)}
                </span>
              </motion.div>
              
              <motion.div 
                className="flex justify-between items-start text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                <span className="text-gray-600 dark:text-gray-400 flex-shrink-0">Platforms:</span>
                <span className="font-medium text-right text-gray-900 dark:text-gray-100 text-xs bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-2 py-1 rounded-lg ml-2">
                  {formatPlatforms(game.platforms)}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
