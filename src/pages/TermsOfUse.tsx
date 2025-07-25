
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const TermsOfUse = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Use</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <Card>
          <CardContent className="p-8 prose max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Dexotix ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Dexotix for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
              <li>attempt to decompile or reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2>3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>

            <h2>4. Event Bookings</h2>
            <p>
              By booking tickets through our platform, you agree to:
            </p>
            <ul>
              <li>Provide accurate personal and payment information</li>
              <li>Comply with the terms and conditions of the event organizer</li>
              <li>Understand that ticket sales are final unless otherwise specified</li>
              <li>Not resell tickets at prices above face value unless permitted by law</li>
            </ul>

            <h2>5. Event Organizers</h2>
            <p>
              Event organizers using our platform agree to:
            </p>
            <ul>
              <li>Provide accurate and complete event information</li>
              <li>Honor all ticket sales made through the platform</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Handle customer service inquiries professionally</li>
            </ul>

            <h2>6. Prohibited Uses</h2>
            <p>
              You may not use our platform:
            </p>
            <ul>
              <li>For any unlawful purpose or to solicit others to unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>

            <h2>7. Content</h2>
            <p>
              Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service.
            </p>

            <h2>8. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the platform, to understand our practices.
            </p>

            <h2>9. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              In no case shall Dexotix, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, special, or consequential damages.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which Dexotix operates, without regard to its conflict of law provisions.
            </p>

            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <ul>
              <li>Email: legal@dexotix.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Innovation Street, Tech City, TC 12345</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfUse;
