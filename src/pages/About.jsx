import { ArrowLeft, Check, Braces, Code, Database, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to JSON Tool
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center space-x-4 mb-6">
            <Braces className="w-12 h-12 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">About JSON Formatter & Validator</h1>
              <p className="text-gray-600">Your go-to online JSON tool</p>
            </div>
          </div>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">What We Do</h2>
              <p>
                JSON Formatter & Validator is a free online tool designed to help developers, data analysts, 
                and anyone working with JSON data to format, validate, and convert JSON effortlessly. Our 
                tool provides a clean, intuitive interface for working with JSON data without the need for 
                any installation or registration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
              <p>
                We aim to provide the best free JSON formatting and validation tool available online. Our 
                mission is to simplify JSON data manipulation for developers worldwide, making it faster 
                and easier to work with JSON in any project.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">JSON Formatting</h3>
                    <p className="text-sm text-gray-600">Beautify JSON with customizable indentation (2, 3, or 4 spaces)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">JSON Validation</h3>
                    <p className="text-sm text-gray-600">Validate JSON syntax with detailed error messages</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Auto-Fix Errors</h3>
                    <p className="text-sm text-gray-600">Automatically fix common JSON formatting errors</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Tree View</h3>
                    <p className="text-sm text-gray-600">Navigate JSON in an interactive, collapsible tree structure</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Format Conversion</h3>
                    <p className="text-sm text-gray-600">Convert JSON to XML, CSV, and YAML formats</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">File Operations</h3>
                    <p className="text-sm text-gray-600">Upload JSON files and download formatted results</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">URL Loading</h3>
                    <p className="text-sm text-gray-600">Load and format JSON directly from URLs</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Local Storage</h3>
                    <p className="text-sm text-gray-600">Auto-save your work in browser for convenience</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Why Choose Us?</h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Code className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Client-Side Processing</h3>
                    <p className="text-sm text-gray-600">
                      All JSON processing happens in your browser. Your data never leaves your device, 
                      ensuring complete privacy and security.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FileText className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">No Registration Required</h3>
                    <p className="text-sm text-gray-600">
                      Start using our tool immediately without creating an account or providing any personal information.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Database className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Free Forever</h3>
                    <p className="text-sm text-gray-600">
                      Our tool is completely free to use with no limitations or hidden fees.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">What is JSON?</h2>
              <p>
                JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for 
                humans to read and write, and easy for machines to parse and generate. It's widely used in 
                web applications for transmitting data between servers and web applications.
              </p>
              <p className="mt-2">
                JSON is built on two structures:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>A collection of name/value pairs (objects)</li>
                <li>An ordered list of values (arrays)</li>
              </ul>
            </section>

            {/* Ad Banner - Mid-content */}
            <AdBanner />

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Who Uses This Tool?</h2>
              <p>Our tool is used by:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><strong>Developers</strong> - For debugging and formatting API responses</li>
                <li><strong>Data Analysts</strong> - For processing and converting JSON data</li>
                <li><strong>Students</strong> - For learning and understanding JSON structure</li>
                <li><strong>API Designers</strong> - For testing and validating JSON schemas</li>
                <li><strong>QA Engineers</strong> - For verifying data formats in testing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Technology Stack</h2>
              <p>
                Our tool is built with modern web technologies including React, TailwindCSS, and Vite, 
                ensuring fast performance and a smooth user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">JSON Examples and Tutorials</h2>
              <p className="mb-4">
                To help you get started with JSON, here are some practical examples and quick tutorials. JSON is versatile and used in APIs, configuration files, and data storage.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">Basic JSON Structure</h3>
              <p className="mb-2">A simple JSON object representing a person:</p>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
{`{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "hobbies": ["reading", "coding", "hiking"]
}`}
              </pre>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Nested JSON Example</h3>
              <p className="mb-2">JSON can contain nested objects for more complex data:</p>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
{`{
  "user": {
    "profile": {
      "username": "johndoe",
      "email": "john@example.com"
    },
    "preferences": {
      "theme": "dark",
      "notifications": true
    }
  }
}`}
              </pre>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">JSON Array Example</h3>
              <p className="mb-2">Arrays are used for lists of data:</p>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
{`{
  "products": [
    {"id": 1, "name": "Laptop", "price": 999.99},
    {"id": 2, "name": "Mouse", "price": 25.50}
  ]
}`}
              </pre>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Quick Tutorial: Validating JSON</h3>
              <p className="mb-2">
                Always ensure your JSON is valid before using it. Common issues include missing commas, incorrect brackets, or invalid strings.
                Our tool helps by providing real-time validation and error messages.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Use double quotes for all strings.</li>
                <li>Separate key-value pairs with commas.</li>
                <li>Ensure brackets and braces are properly closed.</li>
                <li>Test with our validator to catch errors early.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Best Practices for JSON</h3>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Consistency:</strong> Use consistent indentation (2-4 spaces) for readability.</li>
                <li><strong>Keys:</strong> Use descriptive, camelCase keys for clarity.</li>
                <li><strong>Validation:</strong> Always validate JSON before production use.</li>
                <li><strong>Size:</strong> For large datasets, consider pagination or streaming.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
