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

        {/* How to Compare JSON Files - Educational Content */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Compare JSON Files Online</h2>
          <p className="text-gray-700 mb-4">
            Comparing JSON files is essential in software development for identifying changes between versions, debugging API differences, 
            testing data transformations, and reviewing configuration updates. Our JSON compare tool provides a comprehensive side-by-side 
            comparison with detailed difference analysis.
          </p>
          <div className="space-y-4 mt-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Paste or Upload Your JSON Files</h3>
                <p className="text-sm text-gray-600">
                  Paste your first JSON object in the left panel and your second JSON in the right panel. You can also upload JSON files 
                  using the upload buttons. Both panels support file uploads for quick comparison.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Automatic Comparison</h3>
                <p className="text-sm text-gray-600">
                  As soon as you paste or upload both JSON files, our tool automatically compares them and highlights all differences. 
                  The comparison happens instantly in your browser with no server processing required.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Review Differences</h3>
                <p className="text-sm text-gray-600">
                  Navigate through differences using the Previous/Next buttons. The tool shows you added properties (green), deleted properties 
                  (red), and changed values (yellow) with detailed statistics and a comprehensive differences summary.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases for JSON Comparison */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Common Use Cases for JSON Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">API Version Comparison</h3>
              <p className="text-sm text-gray-600">
                When updating APIs, compare responses from different versions to ensure backward compatibility, identify breaking changes, 
                verify new fields are added correctly, and document API evolution for your team and users.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Configuration Management</h3>
              <p className="text-sm text-gray-600">
                Compare configuration files between environments (dev, staging, production) to identify discrepancies, verify deployment 
                settings, track configuration changes over time, and ensure consistency across environments.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Validation & Testing</h3>
              <p className="text-sm text-gray-600">
                Compare expected vs actual test results, validate data transformations in ETL pipelines, verify database exports match 
                specifications, and ensure data integrity after migrations or updates.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Code Review & Version Control</h3>
              <p className="text-sm text-gray-600">
                Review JSON changes in pull requests, compare current state with previous versions, identify unintended changes in data 
                structures, and understand the impact of JSON schema modifications.
              </p>
            </div>
          </div>
        </div>

        {/* Ad Banner - After substantial content */}
        <AdBanner />

        {/* JSON Diff FAQ */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">JSON Compare FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What does JSON diff mean?</h3>
              <p className="text-gray-600 text-sm">
                JSON diff (difference) is the process of comparing two JSON objects to identify what has changed between them. It shows 
                additions (new properties), deletions (removed properties), and modifications (changed values). Our tool provides a 
                detailed diff report that makes it easy to understand exactly what changed between two JSON documents.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I compare JSON with different structures?</h3>
              <p className="text-gray-600 text-sm">
                Yes! Our tool can compare JSON objects with completely different structures. It will identify all added and removed 
                properties, even if the overall structure has changed significantly. This is useful for comparing API responses across 
                major version changes or when data schemas evolve.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How does the swap feature work?</h3>
              <p className="text-gray-600 text-sm">
                The Swap button instantly exchanges the left and right JSON objects. This is helpful when you want to view differences 
                from a different perspective or when you accidentally pasted your JSON in the wrong panels. Simply click Swap and the 
                content switches sides instantly.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What do the different colors mean?</h3>
              <p className="text-gray-600 text-sm">
                Green indicates additions (properties that exist in the right JSON but not in the left), red shows deletions (properties 
                that exist in the left JSON but not in the right), and yellow highlights changes (properties that exist in both but have 
                different values). This color coding makes it easy to quickly identify the type of each difference.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I compare very large JSON files?</h3>
              <p className="text-gray-600 text-sm">
                Yes, but performance depends on file size and your device capabilities. For files up to 5MB, comparison is typically instant. 
                Larger files may take a few seconds to process. Since everything runs in your browser, ensure you have sufficient memory 
                available for very large comparisons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Compare
