import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactUsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">

          <p>
            We’d love to hear from you! Whether you have a question, suggestion, bug report, or simply want to share
            feedback about <strong>typecalculator.com</strong>, our team is here to help.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">How to Reach Us</h3>
          <ul className="list-disc list-inside">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:fusiongenhelp@gmail.com" className="text-foreground">
                fusiongenhelp@gmail.com
              </a>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">What You Can Contact Us For</h3>
          <ul className="list-disc list-inside">
            <li>Reporting bugs or technical issues</li>
            <li>Suggesting new features or improvements</li>
            <li>Providing feedback about the user experience</li>
            <li>Questions about how to use the calculator</li>
            <li>Intellectual property concerns (see our Disclaimer and DMCA Policy)</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">Response Time</h3>
          <p>
            We aim to respond to all inquiries within 1–3 business days. Please allow extra time during weekends or
            public holidays.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Important Note</h3>
          <p>
            <strong>typecalculator.com</strong> is an unofficial fan-made resource and is not affiliated with Nintendo,
            Game Freak, or The Pokémon Company. Pokémon names, characters, and related assets remain the property of
            their respective owners.
          </p>

        </CardContent>
      </Card>
    </div>
  );
}
