import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="w-full bg-muted text-muted-foreground py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        
        {/* Navigation links - appear first on mobile */}
        <nav className="flex flex-wrap space-x-4 mb-4 md:mb-0 md:order-2">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              cn(
                "hover:underline transition-colors",
                isActive ? "text-foreground" : ""
              )
            }
          >
            About
          </NavLink>
          <NavLink
            to="/terms"
            className={({ isActive }) =>
              cn(
                "hover:underline transition-colors",
                isActive ? "text-foreground" : ""
              )
            }
          >
            Terms
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              cn(
                "hover:underline transition-colors",
                isActive ? "text-foreground" : ""
              )
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/privacy"
            className={({ isActive }) =>
              cn(
                "hover:underline transition-colors",
                isActive ? "text-foreground" : ""
              )
            }
          >
            Privacy
          </NavLink>
          <NavLink
            to="/disclaimer"
            className={({ isActive }) =>
              cn(
                "hover:underline transition-colors",
                isActive ? "text-foreground" : ""
              )
            }
          >
            Disclaimer
          </NavLink>
        </nav>
        
        {/* Copyright text - appears second on mobile */}
        <div className="md:order-1">
          © {new Date().getFullYear()} TypeCalc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
