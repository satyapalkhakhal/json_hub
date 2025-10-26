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

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Service Availability</h2>
              <p>
                While we strive to provide uninterrupted service, we do not guarantee that our Service will be available at all times. 
                The Service may be temporarily unavailable due to:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Scheduled maintenance and updates</li>
                <li>Technical issues or server problems</li>
                <li>Circumstances beyond our reasonable control</li>
                <li>Security incidents requiring immediate action</li>
              </ul>
              <p className="mt-2">
                We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">User Responsibilities</h2>
              <p>
                When using our JSON Formatter & Validator, you are responsible for:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><strong>Data Accuracy:</strong> Ensuring the JSON data you process is accurate and you have rights to use it</li>
                <li><strong>Legal Compliance:</strong> Complying with all applicable laws and regulations in your jurisdiction</li>
                <li><strong>Security:</strong> Maintaining the security of your device and browser</li>
                <li><strong>Reasonable Use:</strong> Using the Service in a fair and reasonable manner</li>
                <li><strong>Error Checking:</strong> Verifying the output of our tools before using it in production environments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">No Warranty for Results</h2>
              <p>
                While our tool strives for accuracy, we do not warrant that:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>The Service will meet your specific requirements</li>
                <li>The Service will be error-free or completely bug-free</li>
                <li>Any errors or defects will be corrected</li>
                <li>The results obtained from using the Service will be accurate or reliable</li>
              </ul>
              <p className="mt-2">
                You use the Service at your own risk and should always verify critical output before using it in production systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless JSON Formatter & Validator, its owners, operators, and affiliates 
                from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Your use or misuse of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of third parties</li>
                <li>Any data you submit or process through the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Dispute Resolution</h2>
              <p>
                If you have any concerns or disputes about the Service, we encourage you to first contact us through our{' '}
                <a href="/contact" className="text-indigo-600 hover:underline">Contact page</a> to seek resolution informally. 
                We are committed to working with users to resolve issues fairly and promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid under applicable law, such provision 
                shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in 
                full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Entire Agreement</h2>
              <p>
                These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and 
                JSON Formatter & Validator regarding the use of our Service, superseding any prior agreements or understandings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Fair Use Policy</h2>
              <p>
                Our Service is provided free of charge for reasonable personal and commercial use. We define reasonable use as:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Normal human usage patterns (not automated bulk processing)</li>
                <li>Individual file sizes under 100MB</li>
                <li>Using the tool for its intended purpose</li>
                <li>Not attempting to reverse engineer or copy the Service</li>
              </ul>
              <p className="mt-2">
                We reserve the right to limit access for users who abuse the Service or use it in ways that negatively 
                impact other users' experience.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms
