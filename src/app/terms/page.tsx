import { Metadata } from 'next'
import { seoGenerator } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service - Twinen',
  description: 'Terms of Service for Twinen - The social network that moves with you',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using Twinen ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">2. Description of Service</h2>
              <p className="text-gray-300 leading-relaxed">
                Twinen is a social networking platform that provides users with the ability to connect, share content, 
                and interact with AI-powered features including AI Twins that assist with content creation and social interactions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">3. User Accounts</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  To access certain features of the Service, you must register for an account. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your account information to keep it accurate</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">4. User Content and Conduct</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  You are responsible for all content you post, upload, or share on Twinen. You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Post content that is illegal, harmful, threatening, abusive, or defamatory</li>
                  <li>Violate any intellectual property rights</li>
                  <li>Spam, harass, or intimidate other users</li>
                  <li>Share false or misleading information</li>
                  <li>Attempt to gain unauthorized access to the Service</li>
                  <li>Use automated systems to access the Service without permission</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">5. AI Twin Features</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  Twinen includes AI-powered features that may assist with content creation and social interactions. 
                  By using these features, you acknowledge that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>AI-generated content should be reviewed before posting</li>
                  <li>You remain responsible for all content shared using AI assistance</li>
                  <li>AI features are provided as-is and may not always be accurate</li>
                  <li>We may collect and analyze your interactions to improve AI services</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">6. Privacy and Data Protection</h2>
              <p className="text-gray-300 leading-relaxed">
                Your privacy is important to us. Our collection and use of personal information is governed by our 
                Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent 
                to the collection and use of information as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">7. Intellectual Property</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  The Service and its original content, features, and functionality are owned by Twinen and are 
                  protected by international copyright, trademark, patent, trade secret, and other intellectual 
                  property laws.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  You retain ownership of content you post, but grant us a license to use, display, and distribute 
                  your content on the Service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">8. Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice, for conduct that we 
                believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">9. Disclaimers</h2>
              <p className="text-gray-300 leading-relaxed">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties of any kind, 
                whether express or implied, including but not limited to the implied warranties of merchantability, 
                fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                In no event shall Twinen be liable for any indirect, incidental, special, consequential, or punitive 
                damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">11. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
                try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">12. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-dark-800/50 rounded-lg">
                <p className="text-gray-300">Email: legal@twinen.app</p>
                <p className="text-gray-300">Website: https://twinen.app/contact</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
