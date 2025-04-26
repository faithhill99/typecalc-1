import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScreenDisclaimer() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl'>Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>This TypeCalc application is an unofficial tool provided for informational and entertainment purposes only.</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">Accuracy of Information</h3>
          <p>While we strive to keep the information accurate and up-to-date based on the selected game generation, Pokémon type matchups, abilities, and game mechanics can be complex and may be subject to change in official games or events. We do not guarantee the completeness, reliability, or accuracy of the information provided.</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">Not Official</h3>
          <p>This application is not affiliated with, endorsed by, or sponsored by Nintendo, Game Freak, The Pokémon Company, or any other official trademark owners. Pokémon names, characters, and types are trademarks of their respective owners.</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">No Warranty</h3>
          <p>The application is provided "as is" without any warranties, express or implied. We will not be liable for any losses or damages in connection with the use of this application.</p>
        </CardContent>
      </Card>
    </div>
  );
}