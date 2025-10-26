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
  Wrench,
  Minimize2
} from 'lucide-react'
import JsonViewer from '../components/JsonViewer'
import AdBanner from '../components/AdBanner'
import { formatJSON, validateJSON, fixJSON, minifyJSON } from '../utils/jsonUtils'
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

  const handleCompress = () => {
    try {
      const compressed = minifyJSON(input)
      setOutput(compressed)
      setError(null)
      setIsValid(true)
    } catch (err) {
      setError(`Compress failed: ${err.message}`)
    }
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 transition-colors duration-200">
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

          {/* Compress Button */}
          <button
            onClick={handleCompress}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            <Minimize2 className="w-4 h-4" />
            <span className="text-sm font-medium">Compress</span>
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
          <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors duration-200">
            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Indent:</span>
            {[2, 3, 4].map(size => (
              <button
                key={size}
                onClick={() => handleIndentChange(size)}
                className={`px-2 py-1 rounded text-sm transition-colors ${
                  indentSize === size 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200'
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
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
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
        <div className={`rounded-lg p-4 mb-4 transition-colors duration-200 ${error ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'}`}>
          <div className="flex items-start space-x-2">
            {error ? (
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
            ) : (
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`font-medium ${error ? 'text-red-800 dark:text-red-300' : 'text-green-800 dark:text-green-300'}`}>
                {error ? 'Invalid JSON' : 'Valid JSON ✓'}
              </p>
              {error && <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Editor Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
          <div className="bg-gray-800 dark:bg-gray-900 text-white px-4 py-3">
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
          <div className="bg-gray-800 dark:bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
            <h2 className="font-semibold">Output</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('formatted')}
                className={`px-3 py-1 rounded text-sm transition-colors ${activeTab === 'formatted' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                Formatted
              </button>
              <button
                onClick={() => setActiveTab('tree')}
                className={`px-3 py-1 rounded text-sm transition-colors ${activeTab === 'tree' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'} disabled:opacity-50 disabled:cursor-not-allowed`}
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

      {/* Features Info */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">JSON Validation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Validate JSON with detailed error messages</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Auto Format</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Beautify JSON with customizable indentation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Tree View</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Navigate JSON in interactive tree structure</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Convert to XML/CSV/YAML</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Export JSON to multiple formats</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Local Storage</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Auto-save your work in browser</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">JSON Compress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Minify JSON for production use</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Load from URL</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fetch and format JSON from any URL</p>
            </div>
          </div>
        </div>
      </div>

      {/* What is JSON Formatter - Educational Content */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">What is JSON Formatter & Validator?</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          A JSON Formatter is an essential online tool for developers, data analysts, and anyone working with JSON (JavaScript Object Notation) data. 
          Our free JSON formatter helps you beautify, validate, and convert JSON data instantly in your browser. Whether you're debugging API responses, 
          processing configuration files, or learning JSON structure, our tool provides a comprehensive solution for all your JSON needs.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          JSON has become the standard data interchange format for web applications, REST APIs, and modern software development. Our formatter 
          ensures your JSON is properly structured, valid, and easy to read, making it an indispensable tool for software development workflows.
        </p>
      </div>

      {/* How to Use Guide */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">How to Use JSON Formatter - Step by Step Guide</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Paste or Upload Your JSON</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Copy your JSON data and paste it into the input field, or click the Upload button to load a JSON file from your computer. 
                You can also load JSON directly from a URL using the Load URL feature.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Format and Validate</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click the Format button to beautify your JSON with proper indentation. The tool automatically validates your JSON and 
                highlights any syntax errors with detailed error messages to help you fix them quickly.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">Convert or Download</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Convert your JSON to XML, CSV, or YAML formats with one click. Download the formatted or converted data, 
                or use the Copy button to quickly copy it to your clipboard for use in your projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* JSON Common Use Cases */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Common Use Cases for JSON Formatter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">API Development & Testing</h3>
            <p className="text-sm text-gray-600 mb-3">
              When building or consuming REST APIs, JSON is the primary data format. Use our formatter to:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
              <li>Format API responses for better readability</li>
              <li>Validate JSON payloads before sending requests</li>
              <li>Debug API errors with clear error messages</li>
              <li>Test API endpoints with formatted JSON data</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Configuration Files</h3>
            <p className="text-sm text-gray-600 mb-3">
              Many applications use JSON for configuration. Our tool helps you:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
              <li>Validate package.json files for Node.js projects</li>
              <li>Format configuration files for better maintainability</li>
              <li>Check syntax errors before deployment</li>
              <li>Organize complex configuration structures</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Processing & Analysis</h3>
            <p className="text-sm text-gray-600 mb-3">
              Data analysts and scientists work with JSON regularly:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
              <li>Convert JSON to CSV for spreadsheet analysis</li>
              <li>Validate data exports from databases</li>
              <li>Format large datasets for better visualization</li>
              <li>Transform JSON for data pipelines</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Learning & Education</h3>
            <p className="text-sm text-gray-600 mb-3">
              Perfect for students and developers learning JSON:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
              <li>Understand JSON structure and syntax</li>
              <li>Practice with real-world JSON examples</li>
              <li>Learn data format conversions</li>
              <li>Experiment with JSON safely in browser</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ad Banner - After substantial content */}
      <AdBanner />

      {/* Frequently Asked Questions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is JSON?</h3>
            <p className="text-gray-600 text-sm">
              JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format that's easy for humans to read and write, 
              and easy for machines to parse and generate. It's based on a subset of JavaScript but is language-independent, making it widely 
              used across different programming languages and platforms. JSON represents data as key-value pairs and arrays.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Why do I need to format JSON?</h3>
            <p className="text-gray-600 text-sm">
              Unformatted JSON is often minified or compressed into a single line, making it difficult to read and debug. Formatting JSON 
              with proper indentation and line breaks improves readability, helps you identify structure and hierarchy, makes debugging easier, 
              and allows you to spot errors quickly. Well-formatted JSON is essential for code reviews and documentation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Is my JSON data secure when using this tool?</h3>
            <p className="text-gray-600 text-sm">
              Yes! All JSON processing happens entirely in your browser (client-side). Your data never leaves your device and is not sent to 
              any server. This ensures complete privacy and security for your sensitive data. You can even use this tool offline once the page 
              is loaded.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I fix JSON syntax errors?</h3>
            <p className="text-gray-600 text-sm">
              Our validator provides detailed error messages that point to the exact location of syntax errors. Common issues include missing 
              commas, unclosed brackets, unquoted keys, or trailing commas. Use our Auto-Fix feature to automatically correct common formatting 
              errors. The error message will guide you to the problematic line and suggest what might be wrong.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I convert JSON to other formats?</h3>
            <p className="text-gray-600 text-sm">
              Yes! Our tool supports conversion from JSON to XML, CSV, and YAML formats. Simply paste your JSON, format it, and click on 
              the conversion button for your desired format. This is useful when you need to work with data in different systems or share 
              data with tools that require specific formats. XML is common in enterprise systems, CSV for spreadsheets, and YAML for 
              configuration files.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What's the difference between JSON validation and formatting?</h3>
            <p className="text-gray-600 text-sm">
              JSON validation checks if your JSON syntax is correct according to the JSON specification - it ensures proper use of brackets, 
              quotes, commas, and data types. Formatting (or beautifying) takes valid JSON and adds proper indentation, spacing, and line 
              breaks to make it human-readable. Our tool does both: it validates your JSON and formats it simultaneously.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I handle large JSON files?</h3>
            <p className="text-gray-600 text-sm">
              Yes, our tool can handle large JSON files, though performance depends on your browser and device capabilities. For files over 
              10MB, you may experience slower processing times. The tool works entirely in your browser memory, so ensure you have sufficient 
              RAM available. For extremely large files (&gt;50MB), consider using command-line tools or splitting the file into smaller chunks.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is the Tree View feature?</h3>
            <p className="text-gray-600 text-sm">
              Tree View displays your JSON data in a hierarchical, expandable/collapsible tree structure. This makes it easy to navigate 
              complex nested JSON objects, understand data relationships, and focus on specific parts of large JSON documents. It's particularly 
              useful for exploring API responses or configuration files with deep nesting.
            </p>
          </div>
        </div>
      </div>

      {/* JSON Best Practices */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">JSON Best Practices & Tips</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-indigo-600 pl-4">
            <h3 className="font-semibold text-gray-800 mb-1">Use Consistent Naming Conventions</h3>
            <p className="text-sm text-gray-600">
              Stick to camelCase or snake_case for property names throughout your JSON. Consistency makes your data easier to work with 
              and reduces errors. Example: use "firstName" or "first_name" consistently, not mixed styles.
            </p>
          </div>
          <div className="border-l-4 border-indigo-600 pl-4">
            <h3 className="font-semibold text-gray-800 mb-1">Keep JSON Flat When Possible</h3>
            <p className="text-sm text-gray-600">
              While JSON supports deep nesting, excessive nesting can make data difficult to access and understand. Consider flattening 
              your structure or using references when appropriate. Balance between structure and simplicity.
            </p>
          </div>
          <div className="border-l-4 border-indigo-600 pl-4">
            <h3 className="font-semibold text-gray-800 mb-1">Always Validate Before Production</h3>
            <p className="text-sm text-gray-600">
              Never deploy JSON without validation. Use our validator to catch syntax errors, ensure proper data types, and verify 
              structure before your JSON goes live. This prevents runtime errors and improves reliability.
            </p>
          </div>
          <div className="border-l-4 border-indigo-600 pl-4">
            <h3 className="font-semibold text-gray-800 mb-1">Use Proper Data Types</h3>
            <p className="text-sm text-gray-600">
              JSON supports strings, numbers, booleans, arrays, objects, and null. Use the correct type for your data. Don't wrap 
              numbers in quotes unless they're truly strings. Use booleans (true/false) instead of strings ("yes"/"no").
            </p>
          </div>
          <div className="border-l-4 border-indigo-600 pl-4">
            <h3 className="font-semibold text-gray-800 mb-1">Minify JSON for Production, Format for Development</h3>
            <p className="text-sm text-gray-600">
              In production environments, minified JSON reduces file size and improves transfer speeds. However, during development and 
              debugging, always use formatted JSON for better readability. Our tool helps you switch between both.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
