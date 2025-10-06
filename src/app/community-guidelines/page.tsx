import { Metadata } from 'next'
import { seoGenerator } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Community Guidelines - Twinen',
  description: 'Community Guidelines for Twinen - Building a safe and inclusive social environment',
}

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Community Guidelines
            </h1>
            <p className="text-gray-400">Building a safe and inclusive social environment</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <section className="bg-dark-800/30 p-6 rounded-lg border border-neon-purple/20">
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                Twinen is a cyberpunk social universe where creativity, connection, and AI-assisted communication 
                thrive. We believe in fostering a community that respects diversity, encourages innovation, and 
                builds meaningful relationships in the digital age.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">1. Be Respectful and Kind</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  Treat all members of the Twinen community with respect and kindness:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Use inclusive language that welcomes everyone</li>
                  <li>Respect different opinions, cultures, and backgrounds</li>
                  <li>Be patient and understanding with new users</li>
                  <li>Offer constructive feedback rather than criticism</li>
                  <li>Celebrate others' successes and achievements</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">2. Embrace Creativity and Innovation</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  Twinen is a platform for creative expression and technological exploration:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Share original content and ideas</li>
                  <li>Experiment with AI Twin features responsibly</li>
                  <li>Support and inspire other creators</li>
                  <li>Contribute to the cyberpunk aesthetic and culture</li>
                  <li>Innovate within the platform's capabilities</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">3. AI Twin Usage Guidelines</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  When using AI Twin features, please:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Review AI-generated content before posting</li>
                  <li>Use AI assistance as a creative tool, not a replacement for authenticity</li>
                  <li>Respect others' preferences regarding AI interactions</li>
                  <li>Report any inappropriate AI behavior or content</li>
                  <li>Maintain transparency about AI-assisted content when relevant</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-red-400 mb-4">Prohibited Content and Behavior</h2>
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-red-400 mb-2">Content Restrictions</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Hate speech, harassment, or discrimination</li>
                    <li>Violence, graphic content, or threats</li>
                    <li>Illegal activities or content</li>
                    <li>Spam, scams, or misleading information</li>
                    <li>Copyright infringement or intellectual property violations</li>
                    <li>Personal information of others without consent</li>
                    <li>Sexual or adult content</li>
                    <li>Self-harm or suicide-related content</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-red-400 mb-2">Behavioral Restrictions</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Creating multiple accounts to circumvent restrictions</li>
                    <li>Impersonating other users or entities</li>
                    <li>Manipulating engagement metrics artificially</li>
                    <li>Coordinated harassment or bullying</li>
                    <li>Sharing private communications without consent</li>
                    <li>Exploiting platform features for malicious purposes</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">4. Privacy and Safety</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  Protect yourself and others by:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Using strong, unique passwords</li>
                  <li>Being cautious about sharing personal information</li>
                  <li>Reporting suspicious behavior or accounts</li>
                  <li>Respecting others' privacy settings and boundaries</li>
                  <li>Using blocking and reporting features when necessary</li>
                  <li>Being aware of phishing attempts and scams</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">5. Intellectual Property</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  Respect intellectual property rights:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Only share content you own or have permission to use</li>
                  <li>Give proper credit when sharing others' work</li>
                  <li>Respect copyright and trademark laws</li>
                  <li>Report copyright violations promptly</li>
                  <li>Understand fair use principles</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">6. Reporting and Enforcement</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-neon-blue mb-2">How to Report</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Use the report button on posts, comments, or profiles</li>
                    <li>Contact our moderation team directly</li>
                    <li>Provide specific details about the violation</li>
                    <li>Include relevant screenshots or evidence</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-neon-blue mb-2">Enforcement Actions</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                    <li>Content removal for policy violations</li>
                    <li>Temporary restrictions for repeated violations</li>
                    <li>Account suspension for severe or persistent violations</li>
                    <li>Permanent bans for egregious violations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-neon-blue mb-2">Appeal Process</h3>
                  <p className="text-gray-300 leading-relaxed">
                    If you believe an enforcement action was made in error, you can appeal by contacting our 
                    moderation team with additional context or evidence.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">7. Community Moderation</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  Help maintain a positive community environment:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Lead by example with positive behavior</li>
                  <li>Help newcomers understand platform features</li>
                  <li>Engage constructively in discussions</li>
                  <li>Support moderation efforts by reporting violations</li>
                  <li>Participate in community feedback and improvement</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neon-purple mb-4">8. Platform Evolution</h2>
              <p className="text-gray-300 leading-relaxed">
                These guidelines may evolve as our community grows and new features are introduced. We encourage 
                feedback and suggestions for improvement. Community input helps shape a better Twinen experience 
                for everyone.
              </p>
            </section>

            <section className="bg-dark-800/30 p-6 rounded-lg border border-neon-blue/20">
              <h2 className="text-2xl font-semibold text-neon-blue mb-4">Contact and Support</h2>
              <div className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  Need help understanding these guidelines or want to report a concern?
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-dark-700/50 rounded-lg">
                    <h3 className="text-lg font-medium text-neon-blue mb-2">Community Support</h3>
                    <p className="text-gray-300 text-sm">community@twinen.app</p>
                  </div>
                  <div className="p-4 bg-dark-700/50 rounded-lg">
                    <h3 className="text-lg font-medium text-neon-blue mb-2">Safety Reports</h3>
                    <p className="text-gray-300 text-sm">safety@twinen.app</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
