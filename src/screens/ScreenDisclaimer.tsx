import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScreenDisclaimer() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl'>Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          h3 className="text-lg font-semibold text-foreground mt-4">General Info</h3>
          <p>The content provided on typecalculator.com is for general informational and entertainment purposes only. While we aim to ensure accuracy, we do not guarantee the completeness, reliability, or accuracy of any content. Any actions taken based on the information found on this website are at your own risk.</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">Intellectual Property & Fair Use Notice</h3>
          <p>typecalculator.com is an unofficial, fan-made tool and is not affiliated with, endorsed by, or officially connected to Nintendo, Game Freak, The Pokémon Company, or any other related entities.</p>

          <p>All Pokémon names, images, and related content are the property of their respective copyright holders and are used under fair use principles for educational and entertainment purposes. No copyright infringement is intended.</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">3. DMCA (Digital Millennium Copyright Act) Policy</h3>
          <p>We respect the intellectual property rights of others and comply with the DMCA. If you believe that material available on typecalculator.com infringes on your copyright, please submit a DMCA takedown request with the following details:</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">4. Accuracy of Information</h3>
          <p>While we strive to keep the data accurate and up to date based on the selected game generation, Pokémon type matchups, abilities, and mechanics can be complex and may change in official games or events. We make no guarantees about the completeness or reliability of the information provided.</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">5. External Links</h3>
          <p>Our website may contain links to third-party sites for reference or additional resources. We do not control or endorse the content, privacy practices, or policies of those websites. Visiting any external links is at your own risk.</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">6. Attribution & Open Source Notice</h3>
          <p>This calculator is based on open-source logic from the pkmn project, originally licensed under the MIT License.</p>
          <p>Only the user interface has been modified to enhance usability and accessibility. All MIT License attribution requirements are respected, and no core code is claimed as original.</p>
          <p>The software is provided “as is”, without any warranties of any kind. We are not responsible for any damages, losses, or issues arising from its use.</p>
        </CardContent>
      </Card>
    </div>
  );
}
