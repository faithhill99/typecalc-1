"use client";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import { getDesiredLanguage, isLang } from "@/misc/detectLanguage";
import {
  formatLanguageCompletion,
  officialLanguages,
  showLang,
  unofficialLanguages,
} from "@/misc/lang";

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

const getFlagEmoji = (langCode: string | null): string => {
  if (!langCode) return "🌐";
  return (
    langToFlagEmoji[langCode] || langToFlagEmoji[langCode.split("-")[0]] || "🏳️"
  );
};

export function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useLanguage();

  const detectedLang = getDesiredLanguage();
  const autoLangDisplay =
    detectedLang && isLang(detectedLang) ? detectedLang : "en";
  const effectiveLangApplied = language === "auto" ? autoLangDisplay : language;

  const handleLanguageChange = (value: string) => {
    if (value === "auto") {
      const detectedLang = getDesiredLanguage();
      const langToApply =
        detectedLang && isLang(detectedLang) ? detectedLang : "en";
      i18n.changeLanguage(langToApply);
      setLanguage("auto");
      return;
    }

    setLanguage(value);
    const langToApply = isLang(value) ? value : "en";
    i18n.changeLanguage(langToApply);
  };

  return (
    <div className="relative">
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="h-9 w-[70px] sm:w-[100px] text-xs px-2.5">
          <div className="flex items-center overflow-hidden">
            <span className="text-base mr-1.5 flex-shrink-0">
              {getFlagEmoji(effectiveLangApplied)}
            </span>
            <span className="hidden sm:inline truncate">
              {showLang(effectiveLangApplied as any)}
            </span>
          </div>
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel className="text-xs px-2 py-1.5">
              {t("more.settings.language.default")}
            </SelectLabel>
            <SelectItem value="auto" className="text-xs">
              <div className="flex items-center">
                <span className="text-lg mr-2">
                  {getFlagEmoji(autoLangDisplay)}
                </span>
                * {showLang(autoLangDisplay)} (
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
                      <span className="text-lg mr-2">{getFlagEmoji(lang)}</span>
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
                      <span className="text-lg mr-2">{getFlagEmoji(lang)}</span>
                      {showLang(lang)} ({formatLanguageCompletion(lang)})
                    </div>
                  </SelectItem>
                )
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
