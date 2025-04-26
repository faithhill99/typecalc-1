"use client";
import { Monitor, Sun, Moon, Laptop } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { t } = useTranslation();
  const [theme, setTheme] = useTheme();

  const themeIcons = {
    auto: <Monitor className="h-4 w-4" />,
    light: <Sun className="h-4 w-4" />,
    dark: <Moon className="h-4 w-4" />,
    night: <Laptop className="h-4 w-4" />,
  };

  const getThemeLabel = (themeValue: string) =>
    t(`more.settings.theme.values.${themeValue}`, themeValue);

  const handleThemeChange = (value: string) => {
    if (["auto", "light", "dark", "night"].includes(value)) {
      setTheme(value);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          {themeIcons[theme as keyof typeof themeIcons] || themeIcons.auto}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("auto")}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>{getThemeLabel("auto")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>{getThemeLabel("light")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>{getThemeLabel("dark")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("night")}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>{getThemeLabel("night")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
