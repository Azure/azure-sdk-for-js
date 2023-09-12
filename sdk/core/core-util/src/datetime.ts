// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function toOffsetDateTime(date: Date): string {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    date.toISOString().replace(/Z$/, "") + diff + pad(tzOffset / 60) + ":" + pad(tzOffset % 60)
  );
}
