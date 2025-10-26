import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to JSON Tool
        </Link>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
          <p className="text-sm text-gray-600 mb-6">Last updated: October 19, 2025</p>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Introduction</h2>
              <p>
                Welcome to JSON Formatter & Validator ("we," "our," or "us"). We are committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you use our online JSON formatting tool.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect certain information, including:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>IP address</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Local Storage</h3>
              <p>
                Our tool uses browser local storage to save your JSON data temporarily. This data is stored locally 
                on your device and is not transmitted to our servers. You can clear this data at any time through your browser settings.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">User-Provided Data</h3>
              <p>
                Any JSON data you input into our tool is processed client-side in your browser. We do not store, 
                collect, or transmit your JSON data to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Use of Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience. Cookies are small 
                files stored on your device that help us:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Remember your preferences</li>
                <li>Understand how you use our service</li>
                <li>Improve our service functionality</li>
              </ul>
              <p className="mt-2">
                You can control cookies through your browser settings. Note that disabling cookies may affect 
                the functionality of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Third-Party Services</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Google AdSense</h3>
              <p>
                We use Google AdSense to display advertisements. Google may use cookies to serve ads based on 
                your prior visits to our website or other websites. You can opt out of personalized advertising 
                by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Google Ads Settings</a>.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Analytics</h3>
              <p>
                We may use analytics services to understand how users interact with our tool. These services 
                may collect information such as page views, session duration, and user interactions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Data Security</h2>
              <p>
                We implement reasonable security measures to protect your information. However, no method of 
                transmission over the internet is 100% secure. While we strive to protect your data, we cannot 
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your Data Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Access your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of data collection</li>
                <li>Update or correct your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Children's Privacy</h2>
              <p>
                Our service is not directed to children under 13 years of age. We do not knowingly collect 
                personal information from children. If you believe we have collected information from a child, 
                please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us through our{' '}
                <Link to="/contact" className="text-indigo-600 hover:underline">Contact page</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">GDPR Compliance</h2>
              <p>
                If you are located in the European Economic Area (EEA), you have certain data protection rights. 
                We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">California Privacy Rights</h2>
              <p>
                If you are a California resident, you have specific rights regarding your personal information 
                under the California Consumer Privacy Act (CCPA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">How We Protect Your Data</h2>
              <p>
                Our JSON Formatter & Validator is designed with privacy as a core principle. Unlike many online tools that send 
                your data to servers for processing, our tool performs all operations locally in your web browser using JavaScript. 
                This client-side architecture means:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Your JSON data never leaves your device</li>
                <li>No data is stored on our servers</li>
                <li>You can use the tool offline once the page loads</li>
                <li>Sensitive data remains completely private</li>
                <li>No risk of data interception during transmission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Understanding Cookies and Local Storage</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Essential Cookies</h3>
              <p>
                We use minimal cookies necessary for the website to function properly. These include session management and 
                preference storage. You can disable cookies in your browser settings, though this may affect some functionality.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Local Storage Usage</h3>
              <p>
                Our tool uses browser localStorage to automatically save your work. This allows you to close the browser and 
                return later without losing your JSON data. This storage is completely local to your device and can be cleared 
                through your browser's privacy settings at any time.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">Advertising Cookies</h3>
              <p>
                We use Google AdSense to display advertisements. AdSense may use cookies and web beacons to serve relevant ads 
                based on your browsing history. You can opt out of personalized advertising at{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  Google Ads Settings
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Your Rights and Control</h2>
              <p>
                Under various privacy laws including GDPR and CCPA, you have specific rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><strong>Right to Access:</strong> Request copies of your personal data</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation on data processing</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data</li>
                <li><strong>Right to Object:</strong> Object to certain types of data processing</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, please contact us through our{' '}
                <a href="/contact" className="text-indigo-600 hover:underline">Contact page</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Data Retention</h2>
              <p>
                Since we don't collect or store your JSON data on our servers, there is no server-side data retention. 
                Any data stored in your browser's localStorage remains there until you manually clear it or clear your 
                browser data. We may retain analytics data for up to 26 months for service improvement purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">International Data Transfers</h2>
              <p>
                Our website is accessible worldwide. While we don't transfer your JSON data (it stays in your browser), 
                our third-party services like Google AdSense may process your information internationally. These services 
                comply with applicable data protection laws and use appropriate safeguards for international transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Policy Updates and Notifications</h2>
              <p>
                We reserve the right to update this Privacy Policy to reflect changes in our practices or applicable laws. 
                Material changes will be communicated by updating the "Last updated" date at the top of this page. We encourage 
                you to review this policy periodically. Continued use of our service after changes constitutes acceptance of 
                the updated policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
