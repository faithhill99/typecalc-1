import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p><strong>Effective Date:</strong> [Update with current date]</p>
          <p>
            At <strong>typecalculator.com</strong>, one of our top priorities is protecting the privacy of our visitors.
            This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information.
          </p>
          <p>
            If you have questions or need more details about our Privacy Policy, please contact us at{" "}
            <a href="mailto:fusiongenhelp@gmail.com" className="text-foreground">fusiongenhelp@gmail.com</a>.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Scope of This Policy</h3>
          <p>This Privacy Policy applies only to information collected through our website (<strong>typecalculator.com</strong>) and does not apply to information collected offline or through other channels.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Consent</h3>
          <p>By using our website, you agree to this Privacy Policy and consent to the collection and use of information as described here.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Information We Collect</h3>
          <ul className="list-disc list-inside">
            <li><strong>Personal Information</strong> you provide voluntarily (name, email, etc.) when contacting us or creating an account.</li>
            <li><strong>Usage Data</strong> such as your IP address, browser type, pages visited, and access times.</li>
            <li><strong>Cookies and Tracking Technologies</strong> to improve website performance and personalize your experience.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">How We Use Your Information</h3>
          <ul className="list-disc list-inside">
            <li>Operate and maintain our website</li>
            <li>Improve user experience and website performance</li>
            <li>Analyze usage patterns and trends</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Send updates, security alerts, and marketing communications (if opted in)</li>
            <li>Prevent fraudulent activities</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">Log Files</h3>
          <p>Like most websites, we use log files that record standard information such as IP addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and clicks. This data is not linked to personally identifiable information.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Cookies & Web Beacons</h3>
          <p>We use cookies to store visitor preferences and track usage patterns. You can disable cookies through your browser settings.</p>
          <p><strong>Google DoubleClick DART Cookie:</strong> Google uses cookies to serve ads based on your visit to our site and other websites. You can opt-out at:{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-foreground">
              Google Ads Settings
            </a>.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Advertising Partners</h3>
          <p>We may work with advertising partners, including Google, who may use cookies and similar technologies to personalize ads and measure performance. Please refer to their privacy policies for more details.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Third-Party Privacy Policies</h3>
          <p>Our Privacy Policy does not cover other advertisers or websites. Please consult their respective privacy policies for more details.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Your Privacy Rights</h3>
          <p><strong>Under CCPA (California Residents):</strong></p>
          <ul className="list-disc list-inside">
            <li>Know what personal data we collect</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of the sale of personal data</li>
          </ul>
          <p><strong>Under GDPR (EU Residents):</strong></p>
          <ul className="list-disc list-inside">
            <li>Access, correct, or delete your data</li>
            <li>Restrict or object to processing</li>
            <li>Request data portability</li>
          </ul>
          <p>To exercise your rights, contact us at{" "}
            <a href="mailto:fusiongenhelp@gmail.com" className="text-foreground">fusiongenhelp@gmail.com</a>.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Children’s Privacy</h3>
          <p>We do not knowingly collect information from children under 13. If you believe your child has provided personal information, contact us immediately and we will remove it.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated “Effective Date.”</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Attribution & Disclaimer</h3>
          <p>
            This calculator is based on open-source logic from the <strong>pkmn project</strong>, originally licensed under the <strong>MIT License</strong>. Copyright © 2025{" "}
            <strong>Sage Fennel</strong>.
          </p>
          <p>We have only modified the user interface to enhance usability and accessibility. All MIT License attribution requirements are followed, and no core code is claimed as original.</p>
          <p>The software is provided <strong>“as is”</strong>, without any warranties of any kind. We are not responsible for any damages, losses, or issues arising from its use.</p>
        </CardContent>
      </Card>
    </div>
  );
}
