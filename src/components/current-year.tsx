"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const currentYear = () => new Date().getFullYear();

/**
 * The server renders the year of the build; the browser then corrects it to the
 * current year. Both are four digits, so there is no layout shift.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(subscribe, currentYear, () => buildYear);
  return <>{year}</>;
}
