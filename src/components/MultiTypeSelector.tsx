import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { typeColor, typeColorBG } from "../misc/colors";
import { Generation } from "../misc/data-generations";
import { Type, typesForGeneration } from "../misc/data-types";
import styles from "./MultiTypeSelector.module.css";
import { customProperties } from "../misc/customProperties";
import { Flex } from "./Flex";
import { ReactNode } from "react";
import { TypeIcon, typeIcons } from "@/misc/typeIcons";
import { cn } from "@/lib/utils";

type MultiTypeSelectorProps = {
  generation: Generation;
  onChange(types: Type[]): void;
  value: Type[];
  limit?: number;
};

export function MultiTypeSelector({
  generation,
  onChange,
  value,
  limit,
}: MultiTypeSelectorProps): ReactNode {
  const { t } = useTranslation();
  const types = typesForGeneration(generation);
  return (
    <div className="columns-type-selector">
      {types.map((type) => {
        const isChecked = value.includes(type);
        return (
          <label
            key={type}
            data-type={type}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md border text-shadow-blue-100 shadow-2xl  font-bold cursor-pointer transition bg-[color:var(--type-color-bg)]/10",
              isChecked
                ? "ring-2 ring-offset-2 ring-[color:var(--type-color-bg)] bg-[color:var(--type-color-bg)] text-white"
                : "border-[color:var(--type-color)] text-[color:var(--type-color)] hover:bg-[color:var(--type-color-bg)/.1]"
            )}
            style={customProperties({
              "--type-color-bg": typeColorBG(type),
              "--type-color": typeColor(type),
            })}
          >
            <input
              type="checkbox"
              checked={isChecked}
              name={type}
              className="sr-only"
              onChange={() => {
                const types = new Set(value);
                isChecked ? types.delete(type) : types.add(type);
                let newValue = [...types];
                if (limit) newValue = newValue.slice(-limit);
                onChange(newValue);
              }}
            />

            {/* Type icon with themed background */}
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: isChecked ? "white" : "var(--type-color-bg)",
              }}
            >
              <TypeIcon
                type={type}
                className={cn(
                  "w-4 h-4",
                  isChecked ? "text-[color:var(--type-color-bg)]" : "text-white"
                )}
              />
            </div>

            <span>{t(`types.${type}`)}</span>
          </label>
        );
      })}
    </div>
  );
}
