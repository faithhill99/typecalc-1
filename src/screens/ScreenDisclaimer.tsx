import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">

          <h3 className="text-lg font-semibold text-foreground mt-4">1. General Information</h3>
          <p>
            The content provided on <strong>typecalculator.com</strong> is for general informational and entertainment purposes only. 
            While we aim to ensure accuracy, we do not guarantee the completeness, reliability, or accuracy of any content. 
            Any actions taken based on the information found on this website are at your own risk.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">2. Intellectual Property & Fair Use Notice</h3>
          <p>
            <strong>typecalculator.com</strong> is an unofficial, fan-made tool and is not affiliated with, endorsed by, or officially 
            connected to Nintendo, Game Freak, The Pokémon Company, or any other related entities.
          </p>
          <p>
            All Pokémon names, images, and related content are the property of their respective copyright holders 
            and are used under <em>fair use</em> principles for educational and entertainment purposes. 
            No copyright infringement is intended.
          </p>
          <p>If you believe your copyrighted material has been improperly used, please contact us.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">3. DMCA (Digital Millennium Copyright Act) Policy</h3>
          <p>
            We respect the intellectual property rights of others and comply with the DMCA. 
            If you believe that material available on <strong>typecalculator.com</strong> infringes on your copyright, 
            please submit a DMCA takedown request with the following details:
          </p>
          <ul className="list-disc list-inside">
            <li>A detailed description of the copyrighted work you claim has been infringed</li>
            <li>A direct URL to the allegedly infringing content</li>
            <li>Your full contact information (name, email, and phone number)</li>
            <li>A statement that you have a good faith belief the use is unauthorized</li>
            <li>
              A statement that the information provided is accurate and, under penalty of perjury, 
              you are the copyright owner or authorized representative
            </li>
          </ul>
          <p>
            Send your DMCA request to:{" "}
            <a href="mailto:fusiongenhelp@gmail.com" className="text-foreground">fusiongenhelp@gmail.com</a>. 
            Upon receiving a valid DMCA notice, we will review and remove the infringing content as required by law.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">4. Accuracy of Information</h3>
          <p>
            While we strive to keep the data accurate and up to date based on the selected game generation, 
            Pokémon type matchups, abilities, and mechanics can be complex and may change in official games or events. 
            We make no guarantees about the completeness or reliability of the information provided.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">5. External Links Disclaimer</h3>
          <p>
            Our website may contain links to third-party sites for reference or additional resources. 
            We do not control or endorse the content, privacy practices, or policies of those websites. 
            Visiting any external links is at your own risk.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">6. Liability Disclaimer</h3>
          <p>
            We are not responsible for:
          </p>
          <ul className="list-disc list-inside">
            <li>Errors or omissions in the content</li>
            <li>Any damages or losses arising from using this website</li>
            <li>Any technical issues that may temporarily affect site availability</li>
          </ul>
          <p>Users are encouraged to verify any information before relying on it.</p>

          <h3 className="text-lg font-semibold text-foreground mt-4">7. Attribution & Open Source Notice</h3>
          <p>
            This calculator is based on open-source logic from the <strong>pkmn project</strong>, originally licensed under 
            the <strong>MIT License</strong>. Copyright © 2025 <strong>Sage Fennel</strong>.
          </p>
          <p>
            Only the user interface has been modified to enhance usability and accessibility. 
            All MIT License attribution requirements are respected, and no core code is claimed as original.
          </p>
          <p>
            The software is provided <strong>“as is”</strong>, without any warranties of any kind. 
            We are not responsible for any damages, losses, or issues arising from its use.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">8. Policy Updates</h3>
          <p>
            We may update or modify this disclaimer at any time. Changes will be posted on this page, 
            and users are responsible for reviewing updates periodically.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">9. Contact Information</h3>
          <p>
            For any concerns regarding this disclaimer or intellectual property issues, please contact:{" "}
            <a href="mailto:fusiongenhelp@gmail.com" className="text-foreground">fusiongenhelp@gmail.com</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
