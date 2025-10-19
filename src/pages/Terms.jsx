import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to JSON Tool
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-6">Last updated: October 19, 2025</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Agreement to Terms</h2>
              <p>
                By accessing and using JSON Formatter & Validator ("Service"), you agree to be bound by these 
                Terms of Service. If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Use License</h2>
              <p>
                Permission is granted to temporarily use the Service for personal and commercial purposes. 
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Modify or copy the Service's materials</li>
                <li>Use the materials for any commercial purpose without authorization</li>
                <li>Attempt to decompile or reverse engineer any software contained on the Service</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Disclaimer</h2>
              <p>
                The Service is provided "as is". We make no warranties, expressed or implied, and hereby 
                disclaim and negate all other warranties including, without limitation, implied warranties or 
                conditions of merchantability, fitness for a particular purpose, or non-infringement of 
                intellectual property or other violation of rights.
              </p>
              <p className="mt-2">
                We do not warrant or make any representations concerning the accuracy, likely results, or 
                reliability of the use of the materials on its website or otherwise relating to such materials 
                or on any sites linked to this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Limitations of Liability</h2>
              <p>
                In no event shall JSON Formatter & Validator or its suppliers be liable for any damages 
                (including, without limitation, damages for loss of data or profit, or due to business 
                interruption) arising out of the use or inability to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Data Processing</h2>
              <p>
                All JSON data processing occurs client-side in your browser. We do not store, transmit, or 
                have access to the JSON data you process using our tool. You are solely responsible for:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>The content and accuracy of any JSON data you input</li>
                <li>Ensuring you have the right to process the data</li>
                <li>Complying with applicable data protection laws</li>
                <li>Not inputting sensitive or confidential information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Acceptable Use</h2>
              <p>You agree not to use the Service to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Violate any laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Distribute malware or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use automated systems to access the Service excessively</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by JSON Formatter 
                & Validator and are protected by international copyright, trademark, patent, trade secret, and 
                other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Third-Party Links</h2>
              <p>
                Our Service may contain links to third-party websites or services that are not owned or 
                controlled by us. We have no control over, and assume no responsibility for, the content, 
                privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Advertisements</h2>
              <p>
                We may display advertisements through third-party advertising partners (such as Google AdSense). 
                These partners may use cookies and other tracking technologies to provide targeted advertising. 
                We are not responsible for the content of advertisements or the practices of advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Termination</h2>
              <p>
                We may terminate or suspend access to our Service immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with applicable laws, without regard 
                to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us through our{' '}
                <Link to="/contact" className="text-indigo-600 hover:underline">Contact page</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms
