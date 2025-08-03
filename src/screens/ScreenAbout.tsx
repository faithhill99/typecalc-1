import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">About Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">

          <h3 className="text-lg font-semibold text-foreground mt-4">Who We Are</h3>
          <p>
            Welcome to <strong>typecalculator.com</strong>, a fan-made platform dedicated to helping Pokémon trainers
            understand and master type matchups with ease. Our site is built for both casual players and competitive
            battlers who want quick, accurate, and reliable information without digging through complicated charts.
          </p>
          <p>
            We are passionate Pokémon fans and tech enthusiasts who believe that strategy should be accessible to
            everyone — whether you’re just starting your journey or already competing at the highest level.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Our Mission</h3>
          <p>
            Our mission is simple: <strong>to make Pokémon type calculations effortless, accurate, and enjoyable.</strong> 
            We want you to spend less time figuring out type matchups and more time enjoying the game. 
            By combining a clean, user-friendly interface with accurate data, we aim to create the most accessible type calculator available.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Why We Built TypeCalculator.com</h3>
          <p>
            Pokémon battles are as much about knowledge as they are about skill. Type matchups can be tricky, especially 
            with multiple generations of Pokémon and changing game mechanics. We built <strong>typecalculator.com</strong> to:
          </p>
          <ul className="list-disc list-inside">
            <li>Simplify type effectiveness lookups</li>
            <li>Provide fast and accurate results</li>
            <li>Be accessible on any device</li>
            <li>Support both casual and competitive gameplay</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4">Our Commitment to Accuracy</h3>
          <p>
            We regularly review and update our tool to reflect the latest Pokémon data and mechanics. 
            While we strive for accuracy, we also encourage trainers to use this as a helpful guide 
            rather than a replacement for in-game testing and experience.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Community & Feedback</h3>
          <p>
            We believe in building tools <strong>for the community, with the community</strong>. 
            Your feedback helps us improve, and we welcome suggestions, bug reports, and feature requests. 
            If you have an idea to make our calculator even better, let us know!
          </p>
          <p>
            📧 <a href="mailto:fusiongenhelp@gmail.com" className="text-foreground">fusiongenhelp@gmail.com</a>
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4">Disclaimer & Fair Use</h3>
          <p>
            <strong>typecalculator.com</strong> is an unofficial, fan-made resource and is not affiliated with, endorsed by, 
            or associated with Nintendo, Game Freak, or The Pokémon Company.
          </p>
          <p>
            All Pokémon names, images, and related assets remain the property of their respective owners and are used under 
            <em> fair use </em> principles for educational and entertainment purposes only.
          </p>

        </CardContent>
      </Card>
    </div>
  );
}
