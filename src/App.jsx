import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Braces, Moon, Sun } from 'lucide-react'
import Home from './pages/Home'
import Compare from './pages/Compare'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  const [autoUpdate, setAutoUpdate] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return saved === 'true'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-200">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
                <Braces className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">JSON Formatter & Validator</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Format, Validate, and Convert JSON Online</p>
                </div>
              </Link>
              <div className="flex items-center space-x-4">
                <nav className="hidden md:flex space-x-4">
                  <Link to="/compare" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium">Compare</Link>
                  <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">About</Link>
                  <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</Link>
                </nav>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
                </button>
                <button
                  onClick={() => setAutoUpdate(!autoUpdate)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    autoUpdate 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Auto Update: {autoUpdate ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home autoUpdate={autoUpdate} />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-8 transition-colors duration-200">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Braces className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold text-gray-800 dark:text-white">JSON Tool</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Free online JSON formatter, validator, and converter tool.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">JSON Formatter</Link></li>
                  <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">JSON Validator</Link></li>
                  <li><Link to="/compare" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">JSON Compare</Link></li>
                  <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">JSON to XML/CSV/YAML</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">About Us</Link></li>
                  <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</Link></li>
                  <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Terms of Service</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://www.json.org/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">JSON.org</a></li>
                  <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">MDN JSON</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t dark:border-gray-700 mt-6 pt-6 text-center text-gray-600 dark:text-gray-400">
              <p className="text-sm">© 2025 JSON Formatter & Validator. All rights reserved.</p>
              <p className="text-xs mt-2">Built with React, TailwindCSS, and ❤️</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
