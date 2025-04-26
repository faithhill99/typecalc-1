"use client";

import type { ReactNode } from "react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Monitor,
  Sun,
  Moon,
  Laptop,
  Settings as SettingsIcon,
} from "lucide-react";

// Import UI Components from shadcn/ui
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import Custom Hooks
import { useGeneration } from "../hooks/useGeneration";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { useTypeCount } from "../hooks/useTypeCount";

// Import Data and Utilities
import { generations, isGeneration } from "../misc/data-generations";
import { getDesiredLanguage, isLang } from "../misc/detectLanguage";
import {
  formatLanguageCompletion,
  officialLanguages,
  showLang,
  unofficialLanguages,
} from "../misc/lang";
import { Link } from "react-router-dom";

// --- Constants ---

const langToFlagEmoji: Record<string, string> = {
  en: "🇬🇧",
  "en-US": "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  ja: "🇯🇵",
  ko: "🇰🇷",
  it: "🇮🇹",
  pt: "🇵🇹",
  "pt-BR": "🇧🇷",
  zh: "🇨🇳",
  "zh-TW": "🇹🇼",
};

const themeIcons: Record<string, ReactNode> = {
  auto: <Monitor className="mr-2 h-4 w-4 opacity-80 shrink-0" />,
  light: <Sun className="mr-2 h-4 w-4 opacity-80 shrink-0" />,
  dark: <Moon className="mr-2 h-4 w-4 opacity-80 shrink-0" />,
  night: <Laptop className="mr-2 h-4 w-4 opacity-80 shrink-0" />,
};

// --- Helper Functions ---

const getFlagEmoji = (langCode: string | null): string => {
  if (!langCode) return "🌐";
  return (
    langToFlagEmoji[langCode] || langToFlagEmoji[langCode.split("-")[0]] || "🏳️"
  );
};

// --- Settings Controls Component ---

interface SettingsControlsProps {
  language: string | null;
  handleLanguageChange: (value: string) => void;
  effectiveLangApplied: string;
  autoLangDisplay: string;
  theme: string;
  handleThemeChange: (value: string) => void;
  generation: string;
  handleGenerationChange: (value: string) => void;
  typeCount: string;
  handleTypeCountChange: (value: string) => void;
  t: (key: string, fallback?: string) => string;
  isMobile?: boolean;
}

/**
 * Renders the individual setting controls (Select dropdowns).
 * Adapts layout based on the `isMobile` prop.
 * Includes fix attempts for dropdown positioning in sticky headers.
 */
const SettingsControls: React.FC<SettingsControlsProps> = ({
  language,
  handleLanguageChange,
  effectiveLangApplied,
  autoLangDisplay,
  theme,
  handleThemeChange,
  generation,
  handleGenerationChange,
  typeCount,
  handleTypeCountChange,
  t,
  isMobile = false,
}) => {
  const selectTriggerBaseClass =
    "h-9 text-xs px-2.5 border data-[state=open]:ring-1 data-[state=open]:ring-ring";
  const selectTriggerDesktopWidths = {
    lang: "min-w-[80px] sm:min-w-[100px]",
    theme: "min-w-[90px]",
    gen: "min-w-[80px]",
    types: "min-w-[70px]",
  };

  const getThemeLabel = (themeValue: string) =>
    t(`more.settings.theme.values.${themeValue}`, themeValue);

  // Helper function to render a single setting control item
  const renderSettingItem = (
    id: string,
    labelKey: string,
    labelFallback: string,
    selectElement: ReactNode
  ) => {
    if (isMobile) {
      // CORRECT Mobile layout: Label stacked above the Select input
      return (
        <div>
          <Label htmlFor={id} className="text-xs font-medium mb-1.5 block">
            {t(labelKey, labelFallback)}
          </Label>
          {selectElement}
        </div>
      );
    } else {
      // Desktop layout: Just the Select element
      return selectElement;
    }
  };

  // Common props for SelectContent to help with positioning
  const selectContentProps = {
    position: "popper" as const, // Explicitly use popper strategy
    sideOffset: 5, // Add a small gap between trigger and content
    align: (isMobile ? "center" : "end") as
      | "center"
      | "end"
      | "start"
      | undefined,
  };

  return (
    <>
      {renderSettingItem(
        "language-select",
        "more.settings.language.label",
        "Language",
        <Select value={language ?? "en"} onValueChange={handleLanguageChange}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={isMobile ? "flex" : "inline-flex"}>
                <SelectTrigger
                  id="language-select"
                  className={`${selectTriggerBaseClass} ${
                    isMobile ? "w-full" : selectTriggerDesktopWidths.lang
                  }`}
                  aria-label={t(
                    "more.settings.language.label",
                    "Select Language"
                  )}
                >
                  <div className="flex items-center overflow-hidden w-full">
                    <span className="text-base mr-1.5 flex-shrink-0">
                      {getFlagEmoji(effectiveLangApplied)}
                    </span>
                    <span className="truncate">
                      {showLang(effectiveLangApplied as any)}
                    </span>
                  </div>
                </SelectTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("more.settings.language.label", "Select Language")}</p>
            </TooltipContent>
          </Tooltip>

          <SelectContent {...selectContentProps}>
            <SelectGroup>
              <SelectLabel className="text-xs px-2 py-1.5">
                {t("more.settings.language.default")}
              </SelectLabel>
              <SelectItem value="en" className="text-xs" key="en">
                <div className="flex items-center">
                  <span className="text-lg mr-2">
                    {getFlagEmoji(autoLangDisplay)}
                  </span>
                  * {showLang((autoLangDisplay as any) || "en")} (
                  {formatLanguageCompletion(autoLangDisplay)})
                </div>
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="text-xs px-2 py-1.5">
                {t("more.settings.language.official")}
              </SelectLabel>
              {officialLanguages.map(
                (lang) =>
                  isLang(lang) && (
                    <SelectItem value={lang} key={lang} className="text-xs">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">
                          {getFlagEmoji(lang)}
                        </span>
                        {showLang(lang)} ({formatLanguageCompletion(lang)})
                      </div>
                    </SelectItem>
                  )
              )}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel className="text-xs px-2 py-1.5">
                {t("more.settings.language.unofficial")}
              </SelectLabel>
              {unofficialLanguages.map(
                (lang) =>
                  isLang(lang) && (
                    <SelectItem value={lang} key={lang} className="text-xs">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">
                          {getFlagEmoji(lang)}
                        </span>
                        {showLang(lang)} ({formatLanguageCompletion(lang)})
                      </div>
                    </SelectItem>
                  )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {renderSettingItem(
        "theme-select",
        "more.settings.theme.label",
        "Theme",
        <Select value={theme} onValueChange={handleThemeChange}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={isMobile ? "flex" : "inline-flex"}>
                <SelectTrigger
                  id="theme-select"
                  className={`${selectTriggerBaseClass} ${
                    isMobile ? "w-full" : selectTriggerDesktopWidths.theme
                  }`}
                  aria-label={t("more.settings.theme.label", "Select Theme")}
                >
                  <div className="flex items-center w-full">
                    {themeIcons[theme] || themeIcons.auto}
                    <span className="truncate">{getThemeLabel(theme)}</span>
                  </div>
                </SelectTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("more.settings.theme.label", "Select Theme")}</p>
            </TooltipContent>
          </Tooltip>

          <SelectContent {...selectContentProps}>
            {Object.keys(themeIcons).map((themeKey) => (
              <SelectItem value={themeKey} className="text-xs" key={themeKey}>
                <div className="flex items-center">
                  {themeIcons[themeKey]}
                  {getThemeLabel(themeKey)}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {renderSettingItem(
        "generation-select",
        "more.settings.generation.label",
        "Generation",
        <Select value={generation} onValueChange={handleGenerationChange}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={isMobile ? "flex" : "inline-flex"}>
                <SelectTrigger
                  id="generation-select"
                  className={`${selectTriggerBaseClass} ${
                    isMobile ? "w-full" : selectTriggerDesktopWidths.gen
                  }`}
                  aria-label={t(
                    "more.settings.generation.label",
                    "Select Generation"
                  )}
                >
                  <SelectValue
                    placeholder={t(
                      `games.byID.${generation}`,
                      `Gen ${generation}`
                    )}
                  />
                </SelectTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t(`games.byID.${generation}`, `Generation ${generation}`)}</p>
            </TooltipContent>
          </Tooltip>

          <SelectContent {...selectContentProps}>
            {generations.map((gen) => (
              <SelectItem value={gen} key={gen} className="text-xs">
                {t(`games.byID.${gen}`, `Generation ${gen}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {renderSettingItem(
        "type-count-select",
        "more.settings.typeCount.label",
        "Number of types",
        <Select value={typeCount} onValueChange={handleTypeCountChange}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={isMobile ? "flex" : "inline-flex"}>
                <SelectTrigger
                  id="type-count-select"
                  className={`${selectTriggerBaseClass} ${
                    isMobile ? "w-full" : selectTriggerDesktopWidths.types
                  }`}
                  aria-label={t(
                    "more.settings.typeCount.label",
                    "Select Type Count"
                  )}
                >
                  <SelectValue
                    placeholder={t(
                      `more.settings.typeCount.values.${typeCount}`,
                      `${typeCount} Types`
                    )}
                  />
                </SelectTrigger>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t(`more.settings.typeCount.tooltip`, typeCount)}</p>
            </TooltipContent>
          </Tooltip>

          <SelectContent {...selectContentProps}>
            <SelectItem value="2" key="2" className="text-xs">
              {t("more.settings.typeCount.values.2", "Two types (2)")}
            </SelectItem>
            <SelectItem value="3" key="3" className="text-xs">
              {t("more.settings.typeCount.values.3", "Three types (3)")}
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </>
  );
};

// --- Main Header Component ---

export function Header(): ReactNode {
  const { t, i18n } = useTranslation();
  const [generation, setGeneration] = useGeneration();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();

  // Language Handling Logic (remains the same)
  const detectedLang = getDesiredLanguage();
  const autoLangDisplay =
    detectedLang && isLang(detectedLang) ? detectedLang : "en";
  const currentLanguageSetting = language ?? "en";
  const effectiveLangApplied =
    currentLanguageSetting === "en" ? autoLangDisplay : currentLanguageSetting;

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    const langToApply = value === "en" ? autoLangDisplay : value;
    if (isLang(langToApply)) {
      i18n.changeLanguage(langToApply);
    } else {
      console.warn(
        `Invalid language code selected or detected: ${langToApply}. Defaulting i18n to 'en'.`
      );
      i18n.changeLanguage("en");
    }
  };

  // Theme Handling Logic (remains the same)
  const handleThemeChange = (value: string) => {
    if (["en", "light", "dark", "night"].includes(value)) {
      setTheme(value);
    }
  };

  // Generation/Type Count Handling Logic (remains the same)
  const handleGenerationChange = (value: string) => {
    if (isGeneration(value)) setGeneration(value);
  };
  const handleTypeCountChange = (value: string) => {
    if (["2", "3"].includes(value)) setTypeCount(value);
  };

  // Effect for Initial Language Application (remains the same)
  useEffect(() => {
    const initialLangToApply = effectiveLangApplied;
    if (isLang(initialLangToApply) && i18n.language !== initialLangToApply) {
      i18n.changeLanguage(initialLangToApply);
    }
  }, [effectiveLangApplied, i18n]);

  // Props bundle for SettingsControls (remains the same)
  const settingsProps: SettingsControlsProps = {
    language: currentLanguageSetting,
    handleLanguageChange,
    effectiveLangApplied,
    autoLangDisplay,
    theme,
    handleThemeChange,
    generation,
    handleGenerationChange,
    typeCount,
    handleTypeCountChange,
    t: t as any,
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="h-16"></div>
      <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="flex items-center mr-auto">
            <Link to={"/"} className="font-bold text-lg">
              TypeCalc
            </Link>
          </div>

          <div className="flex items-center gap-1 ml-auto">
            <div className="hidden md:flex items-center gap-1 space-x-3">
              <SettingsControls {...settingsProps} isMobile={false} />
            </div>

            <div className="md:hidden flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("more.settings.open", "Open Settings")}
                  >
                    <SettingsIcon className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-4 w-[90%] md:w-[80%]">
                  <SheetHeader>
                    <SheetTitle>
                      {t("more.settings.title", "Settings")}
                    </SheetTitle>
                    <SheetDescription>
                      {t(
                        "more.settings.description",
                        "Adjust language, theme, and other options."
                      )}
                    </SheetDescription>
                  </SheetHeader>

                  <div className="grid gap-4 py-4">
                    <SettingsControls {...settingsProps} isMobile={true} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}
