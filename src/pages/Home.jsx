import { useState, useEffect } from 'react'
import { 
  Download, 
  Upload, 
  Copy, 
  Check, 
  AlertCircle, 
  FileJson, 
  Settings, 
  Trash2,
  Code,
  FileText,
  Database,
  Link2,
  Wrench
} from 'lucide-react'
import JsonViewer from '../components/JsonViewer'
import AdBanner from '../components/AdBanner'
import { formatJSON, validateJSON, fixJSON } from '../utils/jsonUtils'
import { jsonToXml, jsonToCsv, jsonToYaml } from '../utils/converters'

function Home({ autoUpdate = true }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)
  const [isValid, setIsValid] = useState(false)
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState(2)
  const [activeTab, setActiveTab] = useState('formatted')
  const [convertedData, setConvertedData] = useState('')
  const [urlInput, setUrlInput] = useState('')

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('lastJSON')
    if (saved) {
      setInput(saved)
      handleFormat(saved, indentSize)
    }
  }, [])

  // Auto-save to local storage
  useEffect(() => {
    if (input) {
      localStorage.setItem('lastJSON', input)
    }
  }, [input])

  const handleFormat = (text = input, spaces = indentSize) => {
    const result = formatJSON(text, spaces)
    setOutput(result.formatted)
    setError(result.error)
    setIsValid(!result.error)
    
    if (!result.error) {
      setConvertedData('')
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput(value)
    if (autoUpdate) {
      handleFormat(value, indentSize)
    }
  }

  const handleValidate = () => {
    const result = validateJSON(input)
    setError(result.error)
    setIsValid(result.isValid)
  }

  const handleFix = () => {
    const fixed = fixJSON(input)
    setInput(fixed)
    handleFormat(fixed, indentSize)
  }

  const handleCopy = () => {
    const textToCopy = activeTab === 'formatted' ? output : convertedData
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError(null)
    setIsValid(false)
    setConvertedData('')
    localStorage.removeItem('lastJSON')
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target.result
        setInput(content)
        handleFormat(content, indentSize)
      }
      reader.readAsText(file)
    }
  }

  const handleDownload = () => {
    const dataToDownload = activeTab === 'formatted' ? output : convertedData
    const extensions = {
      'formatted': 'json',
      'tree': 'json',
      'xml': 'xml',
      'csv': 'csv',
      'yaml': 'yaml'
    }
    const blob = new Blob([dataToDownload], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `data.${extensions[activeTab] || 'txt'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleLoadFromURL = async () => {
    if (!urlInput) return
    try {
      const response = await fetch(urlInput)
      const data = await response.text()
      setInput(data)
      handleFormat(data, indentSize)
      setError(null)
    } catch (err) {
      setError(`Failed to load from URL: ${err.message}`)
    }
  }

  const handleConvert = (type) => {
    try {
      const parsed = JSON.parse(input)
      let converted = ''
      
      switch(type) {
        case 'xml':
          converted = jsonToXml(parsed)
          setActiveTab('xml')
          break
        case 'csv':
          converted = jsonToCsv(parsed)
          setActiveTab('csv')
          break
        case 'yaml':
          converted = jsonToYaml(parsed)
          setActiveTab('yaml')
          break
      }
      
      setConvertedData(converted)
      setError(null)
    } catch (err) {
      setError(`Conversion failed: ${err.message}`)
    }
  }

  const handleIndentChange = (size) => {
    setIndentSize(size)
    if (input) {
      handleFormat(input, size)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex flex-wrap gap-3">
          {/* File Upload */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Upload</span>
            </div>
          </label>

          {/* Format Button */}
          <button
            onClick={() => handleFormat()}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium">Format</span>
          </button>

          {/* Validate Button */}
          <button
            onClick={handleValidate}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Validate</span>
          </button>

          {/* Fix Button */}
          <button
            onClick={handleFix}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            <Wrench className="w-4 h-4" />
            <span className="text-sm font-medium">Fix</span>
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Clear</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Download</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Indent Size */}
          <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
            <Settings className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Indent:</span>
            {[2, 3, 4].map(size => (
              <button
                key={size}
                onClick={() => handleIndentChange(size)}
                className={`px-2 py-1 rounded text-sm ${
                  indentSize === size 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Conversion Buttons */}
        <div className="flex flex-wrap gap-3 mt-3">
          <button
            onClick={() => handleConvert('xml')}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm"
          >
            <FileText className="w-4 h-4" />
            <span>JSON to XML</span>
          </button>
          <button
            onClick={() => handleConvert('csv')}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition text-sm"
          >
            <Database className="w-4 h-4" />
            <span>JSON to CSV</span>
          </button>
          <button
            onClick={() => handleConvert('yaml')}
            className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition text-sm"
          >
            <FileJson className="w-4 h-4" />
            <span>JSON to YAML</span>
          </button>
        </div>

        {/* Load from URL */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter JSON URL to load..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleLoadFromURL}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Link2 className="w-4 h-4" />
            <span className="text-sm font-medium">Load URL</span>
          </button>
        </div>
      </div>

      {/* Status Bar */}
      {(error || isValid) && (
        <div className={`rounded-lg p-4 mb-4 ${error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
          <div className="flex items-start space-x-2">
            {error ? (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            ) : (
              <Check className="w-5 h-5 text-green-600 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-medium ${error ? 'text-red-800' : 'text-green-800'}`}>
                {error ? 'Invalid JSON' : 'Valid JSON ✓'}
              </p>
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Editor Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white px-4 py-3">
            <h2 className="font-semibold">Input JSON</h2>
          </div>
          <div className="p-4">
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Paste your JSON here..."
              className="json-editor w-full resize-none focus:outline-none"
              style={{ minHeight: '500px' }}
            />
          </div>
        </div>

        {/* Output */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
            <h2 className="font-semibold">Output</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('formatted')}
                className={`px-3 py-1 rounded text-sm ${activeTab === 'formatted' ? 'bg-indigo-600' : 'bg-gray-700'}`}
              >
                Formatted
              </button>
              <button
                onClick={() => setActiveTab('tree')}
                className={`px-3 py-1 rounded text-sm ${activeTab === 'tree' ? 'bg-indigo-600' : 'bg-gray-700'}`}
                disabled={!isValid}
              >
                Tree View
              </button>
            </div>
          </div>
          <div className="p-4">
            {activeTab === 'formatted' && (
              <pre className="json-editor w-full overflow-auto" style={{ minHeight: '500px' }}>
                {output || 'Formatted JSON will appear here...'}
              </pre>
            )}
            {activeTab === 'tree' && isValid && output && (
              <div className="overflow-auto" style={{ maxHeight: '500px' }}>
                <JsonViewer data={output} />
              </div>
            )}
            {activeTab === 'xml' && convertedData && (
              <pre className="json-editor w-full overflow-auto" style={{ minHeight: '500px' }}>
                {convertedData}
              </pre>
            )}
            {activeTab === 'csv' && convertedData && (
              <pre className="json-editor w-full overflow-auto" style={{ minHeight: '500px' }}>
                {convertedData}
              </pre>
            )}
            {activeTab === 'yaml' && convertedData && (
              <pre className="json-editor w-full overflow-auto" style={{ minHeight: '500px' }}>
                {convertedData}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Ad Banner - Between content and features */}
      <AdBanner />

      {/* Features Info */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">JSON Validation</h3>
              <p className="text-sm text-gray-600">Validate JSON with detailed error messages</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Auto Format</h3>
              <p className="text-sm text-gray-600">Beautify JSON with customizable indentation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Tree View</h3>
              <p className="text-sm text-gray-600">Navigate JSON in interactive tree structure</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Convert to XML/CSV/YAML</h3>
              <p className="text-sm text-gray-600">Export JSON to multiple formats</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Local Storage</h3>
              <p className="text-sm text-gray-600">Auto-save your work in browser</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800">Load from URL</h3>
              <p className="text-sm text-gray-600">Fetch and format JSON from any URL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
