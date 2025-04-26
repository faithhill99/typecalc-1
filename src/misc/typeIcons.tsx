import {
  Circle,
  Flame,
  Hand,
  Droplet,
  Feather,
  Leaf,
  Skull,
  Zap,
  Mountain,
  Eye,
  Gem,
  Snowflake,
  Bug,
  Shield,
  Moon,
  Cog,
  Sparkles,
  Star,
  HelpCircle,
} from "lucide-react";
import { Type } from "./data-types";
import { cn } from "@/lib/utils";

export const TypeIcon = ({
  type,
  className,
}: {
  type: Type;
  className?: string;
}) => {
  const Icon = typeIcons[type];
  return <Icon className={cn("w-4 h-4 my-auto", className ?? "")} />;
};

export const typeIcons: Record<Type, React.ElementType> = {
  normal: Circle,
  fire: Flame,
  fighting: Hand,
  water: Droplet,
  flying: Feather,
  grass: Leaf,
  poison: Skull,
  electric: Zap,
  ground: Mountain,
  psychic: Eye,
  rock: Gem,
  ice: Snowflake,
  bug: Bug,
  dragon: Shield,
  ghost: Skull,
  dark: Moon,
  steel: Cog,
  fairy: Sparkles,
  stellar: Star,
  none: HelpCircle,
};
