import { Metadata } from 'next'
import { seoGenerator } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy - Twinen',
  description: 'Privacy Policy for Twinen - How we collect, use, and protect your personal information',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-neon-blue mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Email address and password (for account creation)</li>
                    <li>Username and display name</li>
                    <li>Profile information (bio, avatar, preferences)</li>
                    <li>Contact information (if provided)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-neon-blue mb-2">Content Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Posts, comments, and messages you create</li>
                    <li>Media files you upload (images, videos, audio)</li>
                    <li>AI Twin interactions and preferences</li>
                    <li>Social connections and relationships</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-neon-blue mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>How you interact with the platform</li>
                    <li>Features you use and time spent on the service</li>
                    <li>Device information and browser type</li>
                    <li>IP address and location data (general)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">2. How We Use Your Information</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Provide and maintain the Twinen service</li>
                  <li>Personalize your experience and content recommendations</li>
                  <li>Enable AI Twin features and interactions</li>
                  <li>Communicate with you about the service</li>
                  <li>Ensure platform safety and security</li>
                  <li>Improve our services and develop new features</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">3. AI Twin and Data Processing</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  Our AI Twin features may process your content and interactions to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Generate personalized content suggestions</li>
                  <li>Assist with post creation and editing</li>
                  <li>Provide social interaction recommendations</li>
                  <li>Learn your preferences and communication style</li>
                  <li>Improve AI model performance and accuracy</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  <strong>Important:</strong> You can control AI Twin access to your data through privacy settings. 
                  AI processing is designed to respect your privacy and only use data you explicitly consent to share.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">4. Information Sharing</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With service providers who assist in platform operations</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">5. Data Security</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication systems</li>
                  <li>Secure data storage and backup procedures</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">6. Your Rights and Controls</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-neon-blue mb-2">Access and Portability</h3>
                  <p className="text-gray-300 leading-relaxed">
                    You can request a copy of your personal data in a portable format at any time.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-neon-blue mb-2">Correction and Updates</h3>
                  <p className="text-gray-300 leading-relaxed">
                    You can update your profile information and preferences through your account settings.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-neon-blue mb-2">Deletion</h3>
                  <p className="text-gray-300 leading-relaxed">
                    You can request deletion of your account and associated data, subject to legal and operational requirements.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-neon-blue mb-2">Privacy Settings</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Control who can see your content, contact you, and access your AI Twin features through privacy controls.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">7. Cookies and Tracking</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Remember your login status and preferences</li>
                  <li>Analyze platform usage and performance</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Ensure platform security and prevent abuse</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  You can control cookie preferences through your browser settings, though this may affect platform functionality.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">8. International Data Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure 
                appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">9. Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Twinen is not intended for children under 13 years of age. We do not knowingly collect personal 
                information from children under 13. If we become aware that we have collected such information, 
                we will take steps to delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new policy on this page and updating the "Last updated" date. Your continued use 
                of the service after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">11. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 p-4 bg-dark-800/50 rounded-lg">
                <p className="text-gray-300">Email: privacy@twinen.app</p>
                <p className="text-gray-300">Website: https://twinen.app/contact</p>
                <p className="text-gray-300">Data Protection Officer: dpo@twinen.app</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
