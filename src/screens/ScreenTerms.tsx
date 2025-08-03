import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScreenTerms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Terms &amp; Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">

          <h3 className="text-lg font-semibold text-foreground mt-4">1. Introduction</h3>
          <p>
            Welcome to <strong>typecalculator.com</strong>. By accessing and using this website, you agree to comply with 
            these Terms &amp; Conditions. If you do not agree with any part of these terms, please discontinue using our site.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">2. Use of the Website</h3>
          <p>
            You agree to use this website for lawful purposes only and in a way that does not infringe on the rights of, 
            restrict, or inhibit anyone else’s use and enjoyment of the site.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">3. Intellectual Property</h3>
          <p>
            All content on <strong>typecalculator.com</strong> — excluding Pokémon-related names, images, and data — is 
            the property of the website owner. Pokémon names, characters, images, and other related content are trademarks 
            and copyrights of their respective owners and are used here under <em>fair use</em> for educational and 
            entertainment purposes only.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">4. Accuracy of Information</h3>
          <p>
            While we strive to ensure that all information on this site is accurate and up-to-date, we make no guarantees 
            regarding its completeness, accuracy, or reliability. Use of the information on this site is at your own risk.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">5. Third-Party Links</h3>
          <p>
            This website may include links to third-party sites. We are not responsible for the content, policies, or 
            practices of these external websites.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">6. Limitation of Liability</h3>
          <p>
            <strong>typecalculator.com</strong> and its owners will not be liable for any damages or losses arising from 
            the use or inability to use this website, including but not limited to indirect or consequential damages.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">7. DMCA Compliance</h3>
          <p>
            We respect intellectual property rights and comply with the DMCA. If you believe your copyrighted work has 
            been used on our site without permission, please contact us at{" "}
            <a href="mailto:fusiongenhelp@gmail.com" className="text-foreground">fusiongenhelp@gmail.com</a> with the 
            required details as outlined in our Disclaimer.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">8. Changes to Terms</h3>
          <p>
            We reserve the right to modify or update these Terms &amp; Conditions at any time. Changes will be effective 
            immediately upon posting on this page.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">9. Contact Information</h3>
          <p>
            If you have any questions about these Terms &amp; Conditions, please contact us at:{" "}
            <a href="mailto:fusiongenhelp@gmail.com" className="text-foreground">fusiongenhelp@gmail.com</a>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}
