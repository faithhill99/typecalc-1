import { ReactNode } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { Divider } from "../components/Divider";
import { ExternalLink } from "../components/ExternalLink";
import { FancyText } from "../components/FancyText";
import { Flex } from "../components/Flex";
import { RadioGroup } from "../components/RadioGroup";
import { Select } from "../components/Select";
import { TranslationCard } from "../components/TranslationCard";
import { useAppContext } from "../hooks/useAppContext";
import { useGeneration } from "../hooks/useGeneration";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { useTypeCount } from "../hooks/useTypeCount";
import { compare } from "../misc/compare";
import { generations, isGeneration } from "../misc/data-generations";
import {
  getDesiredLanguage,
  isLang,
  supportedLanguages,
} from "../misc/detectLanguage";
import { fail } from "../misc/fail";
import {
  formatLanguageCompletion,
  languageBounty,
  languageCompletions,
  officialLanguages,
  officialLanguagesSet,
  showLang,
  unofficialLanguages,
} from "../misc/lang";
import { resetApp } from "../misc/resetApp";

export default function ScreenMore(): ReactNode {
  const { needsAppUpdate, updateApp } = useAppContext();
  const { t, i18n } = useTranslation();
  const [generation, setGeneration] = useGeneration();
  const [language, setLanguage] = useLanguage();
  const [theme, setTheme] = useTheme();
  const [typeCount, setTypeCount] = useTypeCount();
  const year = new Date().getFullYear();
  const autoLang = getDesiredLanguage() || "en";

  return (
    <main className="content-narrow center">
      <Flex direction="column" padding="large">
        <Flex direction="column">
          <FancyText tag="h2" fontSize="xlarge" fontWeight="medium">
            {t("more.settings.heading")}
          </FancyText>

          <div className="grid grid-cols-2">
            <Select
              label={t("more.settings.language.label")}
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value);
                i18n.changeLanguage(language);
              }}
            >
              <optgroup label={t("more.settings.language.default")}>
                <option value="">
                  * {showLang(autoLang)} ({formatLanguageCompletion(autoLang)})
                </option>
              </optgroup>
              <optgroup label={t("more.settings.language.official")}>
                {officialLanguages.map((lang) => {
                  if (!isLang(lang)) {
                    throw new Error(`${lang} is not a valid language`);
                  }
                  return (
                    <option value={lang} key={lang}>
                      {showLang(lang)} ({formatLanguageCompletion(lang)})
                    </option>
                  );
                })}
              </optgroup>
              <optgroup label={t("more.settings.language.unofficial")}>
                {unofficialLanguages.map((lang) => {
                  if (!isLang(lang)) {
                    throw new Error(`${lang} is not a valid language`);
                  }
                  return (
                    <option value={lang} key={lang}>
                      {showLang(lang)} ({formatLanguageCompletion(lang)})
                    </option>
                  );
                })}
              </optgroup>
            </Select>

            <RadioGroup
              label={t("more.settings.theme.label")}
              value={theme}
              helpText={t("more.settings.theme.help")}
              options={[
                {
                  value: "auto",
                  label: t(`more.settings.theme.values.auto`),
                },
                {
                  value: "light",
                  label: t(`more.settings.theme.values.light`),
                },
                {
                  value: "dark",
                  label: t(`more.settings.theme.values.dark`),
                },
                {
                  value: "night",
                  label: t(`more.settings.theme.values.night`),
                },
              ]}
              onChange={(option) => void setTheme(option.value)}
            />

            <RadioGroup
              label={t("games.label")}
              value={generation}
              helpText={t("games.help")}
              onChange={(option) => {
                const { value } = option;
                if (isGeneration(value)) {
                  setGeneration(value);
                } else {
                  // eslint-disable-next-line no-console
                  console.error("not a generation:", value);
                }
              }}
              options={generations.map((gen) => {
                return {
                  value: gen,
                  label: t(`games.byID.${gen}`),
                };
              })}
            />

            <RadioGroup
              label={t("more.settings.typeCount.label")}
              value={typeCount}
              helpText={t("more.settings.typeCount.help")}
              onChange={(option) => {
                setTypeCount(option.value);
              }}
              options={[
                {
                  value: "2",
                  label: t("more.settings.typeCount.values.2"),
                },
                {
                  value: "3",
                  label: t("more.settings.typeCount.values.3"),
                },
              ]}
            />
          </div>

          <Flex paddingY="medium" />
          <Divider />
        </Flex>
      </Flex>
    </main>
  );
}
