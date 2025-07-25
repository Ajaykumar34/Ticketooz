
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 prose max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
            </p>
            
            <h3>Personal Information</h3>
            <ul>
              <li>Name and contact information (email, phone, address)</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Account credentials (username, password)</li>
              <li>Profile information (preferences, interests)</li>
            </ul>

            <h3>Usage Information</h3>
            <ul>
              <li>Information about how you use our platform</li>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Location information (city, state, country)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Communicate with you about products, services, and events</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:</p>
            
            <h3>Service Providers</h3>
            <p>We may share your information with third-party service providers who assist us in operating our platform, conducting business, or serving users.</p>

            <h3>Event Organizers</h3>
            <p>When you purchase tickets, we share necessary information with event organizers to facilitate your attendance.</p>

            <h3>Legal Requirements</h3>
            <p>We may disclose your information if required by law or in response to valid requests by public authorities.</p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to provide services. We may also retain and use your information to comply with legal obligations and resolve disputes.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and receive a copy of your personal information</li>
              <li>Update or correct your personal information</li>
              <li>Delete your personal information</li>
              <li>Restrict or object to our processing of your personal information</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>7. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to collect and use personal information about you. You can control cookies through your browser settings.
            </p>

            <h2>8. Third-Party Links</h2>
            <p>
              Our platform may contain links to other websites. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>Email: privacy@dexotix.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Innovation Street, Tech City, TC 12345</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
