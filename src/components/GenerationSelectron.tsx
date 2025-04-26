"use client";

import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGeneration } from "@/hooks/useGeneration";
import { generations, isGeneration } from "@/misc/data-generations";

export function GenerationSelector() {
  const { t } = useTranslation();
  const [generation, setGeneration] = useGeneration();

  const handleGenerationChange = (value: string) => {
    if (isGeneration(value)) setGeneration(value);
  };

  return (
    <Select value={generation} onValueChange={handleGenerationChange}>
      <SelectTrigger className="h-9 w-[80px] text-xs px-2.5">
        <SelectValue placeholder={t(`games.byID.${generation}`)} />
      </SelectTrigger>
      <SelectContent align="end">
        {generations.map((gen) => (
          <SelectItem value={gen} key={gen} className="text-xs">
            {t(`games.byID.${gen}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
