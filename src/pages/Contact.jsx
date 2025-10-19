import { ArrowLeft, Mail, MessageSquare, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would send this data to a backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to JSON Tool
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <p className="text-gray-700 mb-6">
                Have questions, suggestions, or feedback? We'd love to hear from you! Fill out the form 
                below and we'll get back to you as soon as possible.
              </p>

              {submitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-medium">Thank you for your message!</p>
                  <p className="text-green-700 text-sm mt-1">We'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MessageSquare className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">General Inquiries</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      For general questions about the tool, features, or usage help.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Github className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Bug Reports</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Found a bug? Let us know so we can fix it and improve the tool.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Feature Requests</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Have an idea for a new feature? We'd love to hear your suggestions.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-6">
                  <h3 className="font-semibold text-indigo-900 mb-2">Response Time</h3>
                  <p className="text-indigo-800 text-sm">
                    We typically respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Privacy</h3>
                  <p className="text-blue-800 text-sm">
                    Your contact information will only be used to respond to your inquiry and will 
                    never be shared with third parties. See our{' '}
                    <Link to="/privacy" className="underline hover:text-blue-600">Privacy Policy</Link> for details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">Is my JSON data secure?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Yes! All JSON processing happens client-side in your browser. Your data never leaves 
                  your device and is not sent to our servers.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800">Do I need to create an account?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  No, our tool is completely free and requires no registration. Just visit the site and start using it.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800">Is there a file size limit?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  While there&apos;s no strict limit, very large JSON files (&gt;10MB) may cause performance 
                  issues depending on your device capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
