"use client";

import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTypeCount } from "@/hooks/useTypeCount";

export function TypeCountSelector() {
  const { t } = useTranslation();
  const [typeCount, setTypeCount] = useTypeCount();

  const handleTypeCountChange = (value: string) => {
    if (["2", "3"].includes(value)) setTypeCount(value);
  };

  return (
    <Select value={typeCount} onValueChange={handleTypeCountChange}>
      <SelectTrigger className="h-9 w-[70px] text-xs px-2.5">
        <SelectValue placeholder={`${typeCount} ${t("types", "Types")}`} />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="2" className="text-xs">
          {t("more.settings.typeCount.values.2", "2 Types")}
        </SelectItem>
        <SelectItem value="3" className="text-xs">
          {t("more.settings.typeCount.values.3", "3 Types")}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
