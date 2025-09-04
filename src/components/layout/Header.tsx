import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';

import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2 },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.2 },
    },
  };

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-40 transition-colors duration-300"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="flex items-center"
                aria-label="Jay Line Services - Home"
              >
                <motion.div
                  className="w-12 h-12 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center mr-3"
                  whileHover={{ rotate: 5 }}
                >
                  <span
                    className="text-white font-bold text-xl"
                    aria-hidden="true"
                  >
                    JL
                  </span>
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-green-800 dark:text-green-400">
                    Jay Line Services
                  </h1>
                  <p className="text-sm text-green-600 dark:text-green-300 italic">
                    Your Partner in Progress
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center space-x-8"
              role="navigation"
              aria-label="Main navigation"
            >
              {navigationItems.map(item => (
                <motion.div
                  key={item.path}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link
                    to={item.path}
                    className={`font-medium transition-colors relative ${
                      isActive(item.path)
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                    }`}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 dark:bg-green-400"
                        layoutId="activeTab"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              <ThemeToggle />
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <motion.button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? 'close' : 'menu'}
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? (
                      <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    ) : (
                      <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-menu"
                className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileMenuVariants}
              >
                <nav
                  className="flex flex-col space-y-4"
                  role="navigation"
                  aria-label="Mobile navigation"
                >
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <Link
                        to={item.path}
                        className={`font-medium transition-colors block py-2 ${
                          isActive(item.path)
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={isActive(item.path) ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
  );
};

export default Header;
