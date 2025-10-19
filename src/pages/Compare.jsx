import { useState, useEffect } from 'react'
import { 
  ArrowLeftRight, 
  Upload, 
  Copy, 
  Check, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  GitCompare
} from 'lucide-react'
import { compareJSON, getLineDiff, formatDifferences, getDiffStats } from '../utils/diffUtils'
import { Helmet } from 'react-helmet-async'
import AdBanner from '../components/AdBanner'

function Compare() {
  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')
  const [differences, setDifferences] = useState([])
  const [lineDiff, setLineDiff] = useState([])
  const [currentDiffIndex, setCurrentDiffIndex] = useState(0)
  const [copied, setCopied] = useState({ left: false, right: false })
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('sidebyside') // sidebyside or unified

  useEffect(() => {
    if (leftInput && rightInput) {
      handleCompare()
    }
  }, [leftInput, rightInput])

  const handleCompare = () => {
    setError(null)
    
    try {
      // Parse both JSON inputs
      const obj1 = leftInput.trim() ? JSON.parse(leftInput) : {}
      const obj2 = rightInput.trim() ? JSON.parse(rightInput) : {}
      
      // Get structured differences
      const diffs = compareJSON(obj1, obj2)
      setDifferences(diffs)
      
      // Get line-by-line diff
      const formatted1 = JSON.stringify(obj1, null, 2)
      const formatted2 = JSON.stringify(obj2, null, 2)
      const lineDiffs = getLineDiff(formatted1, formatted2)
      setLineDiff(lineDiffs)
      
      setCurrentDiffIndex(0)
    } catch (err) {
      setError(`Error parsing JSON: ${err.message}`)
      setDifferences([])
      setLineDiff([])
    }
  }

  const handleSwap = () => {
    const temp = leftInput
    setLeftInput(rightInput)
    setRightInput(temp)
  }

  const handleClear = (side) => {
    if (side === 'left') {
      setLeftInput('')
    } else {
      setRightInput('')
    }
    setDifferences([])
    setLineDiff([])
  }

  const handleCopy = (side) => {
    const text = side === 'left' ? leftInput : rightInput
    navigator.clipboard.writeText(text)
    setCopied({ ...copied, [side]: true })
    setTimeout(() => setCopied({ ...copied, [side]: false }), 2000)
  }

  const handleFileUpload = (e, side) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target.result
        if (side === 'left') {
          setLeftInput(content)
        } else {
          setRightInput(content)
        }
      }
      reader.readAsText(file)
    }
  }

  const navigateDiff = (direction) => {
    const diffLines = lineDiff.filter(d => d.type !== 'unchanged')
    if (diffLines.length === 0) return
    
    if (direction === 'next') {
      setCurrentDiffIndex((prev) => (prev + 1) % diffLines.length)
    } else {
      setCurrentDiffIndex((prev) => (prev - 1 + diffLines.length) % diffLines.length)
    }
  }

  const stats = getDiffStats(differences)

  return (
    <>
      <Helmet>
        <title>JSON Compare - Online JSON Diff Tool | JSON Formatter</title>
        <meta name="description" content="Compare two JSON files online. Find differences, additions, and deletions between JSON objects. Free JSON diff and merge tool with side-by-side comparison." />
        <meta name="keywords" content="JSON compare, JSON diff, compare JSON files, JSON difference, JSON merge, diff tool, JSON comparison online" />
        <meta property="og:title" content="JSON Compare - Online JSON Diff Tool" />
        <meta property="og:description" content="Compare two JSON files and find differences instantly. Free online JSON comparison tool." />
        <meta name="twitter:title" content="JSON Compare - Online JSON Diff Tool" />
        <meta name="twitter:description" content="Compare two JSON files and find differences instantly." />
      </Helmet>

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <GitCompare className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">JSON Compare & Diff</h1>
                <p className="text-sm text-gray-600">Compare two JSON files side-by-side</p>
              </div>
            </div>
            
            <button
              onClick={handleSwap}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span className="text-sm font-medium">Swap</span>
            </button>
          </div>

          {/* Stats */}
          {differences.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-xs text-gray-600">Total Changes</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.added}</div>
                <div className="text-xs text-gray-600">Added</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-red-600">{stats.deleted}</div>
                <div className="text-xs text-gray-600">Deleted</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.changed}</div>
                <div className="text-xs text-gray-600">Changed</div>
              </div>
            </div>
          )}

          {/* Navigation */}
          {differences.length > 0 && (
            <div className="flex items-center justify-center space-x-4 mt-4">
              <button
                onClick={() => navigateDiff('prev')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Previous</span>
              </button>
              <span className="text-sm text-gray-600">
                {currentDiffIndex + 1} of {lineDiff.filter(d => d.type !== 'unchanged').length}
              </span>
              <button
                onClick={() => navigateDiff('next')}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                <span className="text-sm">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Error</p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Side by Side Editors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Editor */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
              <h2 className="font-semibold">Left JSON</h2>
              <div className="flex space-x-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => handleFileUpload(e, 'left')}
                    className="hidden"
                  />
                  <Upload className="w-4 h-4 hover:opacity-80" />
                </label>
                <button onClick={() => handleCopy('left')}>
                  {copied.left ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <button onClick={() => handleClear('left')}>
                  <Trash2 className="w-4 h-4 hover:opacity-80" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={leftInput}
                onChange={(e) => setLeftInput(e.target.value)}
                placeholder="Paste your first JSON here..."
                className="json-editor w-full resize-none focus:outline-none"
                style={{ minHeight: '500px' }}
              />
            </div>
          </div>

          {/* Right Editor */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between">
              <h2 className="font-semibold">Right JSON</h2>
              <div className="flex space-x-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => handleFileUpload(e, 'right')}
                    className="hidden"
                  />
                  <Upload className="w-4 h-4 hover:opacity-80" />
                </label>
                <button onClick={() => handleCopy('right')}>
                  {copied.right ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <button onClick={() => handleClear('right')}>
                  <Trash2 className="w-4 h-4 hover:opacity-80" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <textarea
                value={rightInput}
                onChange={(e) => setRightInput(e.target.value)}
                placeholder="Paste your second JSON here..."
                className="json-editor w-full resize-none focus:outline-none"
                style={{ minHeight: '500px' }}
              />
            </div>
          </div>
        </div>

        {/* Differences Summary */}
        {differences.length > 0 && (
          <div className="mt-4 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Differences Summary</h2>
            <pre className="text-sm text-gray-700 overflow-auto bg-gray-50 p-4 rounded-lg" style={{ maxHeight: '400px' }}>
              {formatDifferences(differences)}
            </pre>
          </div>
        )}

        {differences.length === 0 && leftInput && rightInput && !error && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <Check className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <p className="text-green-800 font-medium">JSONs are identical!</p>
            <p className="text-green-600 text-sm mt-1">No differences found between the two JSON objects.</p>
          </div>
        )}

        {/* Ad Banner - Between content and features */}
        <AdBanner />

        {/* Features Info */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Side-by-Side Comparison</h3>
                <p className="text-sm text-gray-600">Compare JSON files in parallel view</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Detailed Diff Report</h3>
                <p className="text-sm text-gray-600">See all additions, deletions, and changes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">File Upload</h3>
                <p className="text-sm text-gray-600">Upload JSON files for comparison</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Swap Sides</h3>
                <p className="text-sm text-gray-600">Quickly swap left and right JSON</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Navigate Changes</h3>
                <p className="text-sm text-gray-600">Jump between differences easily</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Statistics</h3>
                <p className="text-sm text-gray-600">View count of changes, additions, deletions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Compare
