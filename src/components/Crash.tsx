import { ReactNode } from "react";

export default function Crash(): ReactNode {
  throw new Error("Oops!");
}
