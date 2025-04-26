import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScreenPrivacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl'>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>Your privacy is important to us. This TypeCalc application is designed to be simple and functional.</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">Data Collection</h3>
          <p>This application does not collect any personal information from its users. We do not use cookies, track your usage, or store any data about your interactions.</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">Third Parties</h3>
          <p>We do not share any information with third parties because we do not collect any information in the first place.</p>
          <h3 className="text-lg font-semibold text-foreground mt-4">Changes to this Policy</h3>
          <p>Any changes to this privacy policy will be reflected here. This policy is effective as of [Insert Date, e.g., October 26, 2023].</p>
          <p>By using this application, you agree to this policy.</p>
        </CardContent>
      </Card>
    </div>
  );
}