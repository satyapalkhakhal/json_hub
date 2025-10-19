import { ArrowLeft, Check, Braces, Code, Database, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

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
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Feedback & Support</h2>
              <p>
                We're constantly working to improve our tool. If you have suggestions, feature requests, 
                or encounter any issues, please reach out through our{' '}
                <Link to="/contact" className="text-indigo-600 hover:underline">Contact page</Link>. 
                Your feedback helps us make this tool better for everyone.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
