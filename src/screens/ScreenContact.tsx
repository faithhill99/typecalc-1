import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function ScreenContact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl'>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>If you have any questions, suggestions, or feedback regarding the TypeCalc application, please feel free to get in touch.</p>
          <p>You can reach us at: <a href="mailto:support@example.com" className="text-primary hover:underline">support@example.com</a></p>
          <p>We appreciate your input!</p>
        </CardContent>
      </Card>
    </div>
  );
}