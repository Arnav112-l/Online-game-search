import { useState } from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div 
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
        
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-gray-700/20 shadow-xl overflow-hidden">
          <motion.input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for games..."
            className="w-full px-6 py-4 pl-14 text-lg bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
            whileFocus={{ scale: 1.01 }}
          />
          
          {/* Search icon */}
          <motion.div 
            className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
            animate={{
              rotate: isFocused ? 15 : 0,
              scale: isFocused ? 1.1 : 1
            }}
          >
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
          
          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            ) : (
              <motion.div
                className="h-6 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
                whileHover={{
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                }}
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5-5 5M6 7l5 5-5 5" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        </div>
        
        {/* Floating suggestions (placeholder for future enhancement) */}
        {isFocused && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl border border-white/20 dark:border-gray-700/20 shadow-xl z-50 overflow-hidden"
          >
            <div className="p-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Press Enter to search for "{query}"
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.form>
  );
};

export default SearchBar;
