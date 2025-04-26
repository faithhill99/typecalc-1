import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="w-full bg-muted text-muted-foreground py-6 mt-auto"> {/* mt-auto helps push it to the bottom */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-4 md:mb-0">
          © {new Date().getFullYear()} TypeCalc. All rights reserved.
        </div>
        <nav className="flex space-x-4">
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
      </div>
    </footer>
  );
}