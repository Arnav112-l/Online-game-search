import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DarkModeToggle = () => {
  // Initialize with system preference or stored preference
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply theme on component mount and theme changes
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const iconVariants = {
    initial: {
      opacity: 0,
      rotate: -180,
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      rotate: 180,
      scale: 0.5,
    },
  };

  const backgroundVariants = {
    dark: {
      background: "radial-gradient(circle at 20% 50%, rgba(30, 64, 175, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.4) 0%, transparent 50%)",
    },
    light: {
      background: "radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.4) 0%, transparent 50%)",
    },
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 dark:from-orange-400 dark:to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={iconVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-10"
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute inset-0"
        initial={isDark ? "dark" : "light"}
        animate={isDark ? "dark" : "light"}
        variants={backgroundVariants}
        transition={{ duration: 0.5 }}
      />

      {/* Add ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        whileTap={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          scale: 2,
          opacity: 0,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};

export default DarkModeToggle;
