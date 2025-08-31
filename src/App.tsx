import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';

import { Header, Footer } from './components/layout';
import { ScrollProgress } from './components/ui';
import { useScrollToTop } from './hooks/useScrollToTop';

// Preload critical pages and lazy load others
const Home = lazy(() => 
  import('./pages/Home').then(module => ({ default: module.default }))
);
const About = lazy(() => 
  import('./pages/About').then(module => ({ default: module.default }))
);
const Services = lazy(() => 
  import('./pages/Services').then(module => ({ default: module.default }))
);
const Contact = lazy(() => 
  import('./pages/Contact').then(module => ({ default: module.default }))
);
const Blog = lazy(() => 
  import('./pages/Blog').then(module => ({ default: module.default }))
);
const BlogPost = lazy(() => 
  import('./pages/BlogPost').then(module => ({ default: module.default }))
);

// Enhanced loading component with skeleton
const PageLoader = () => (
  <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

function App() {
  const location = useLocation();

  useScrollToTop();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <ScrollProgress />
        <Header />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
