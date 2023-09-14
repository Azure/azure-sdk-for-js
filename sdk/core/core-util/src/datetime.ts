// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export type OffsetMillisecondsPrecision = 0 | 1 | 2 | 3;

export function toOffsetDateTime(date: Date, precision: OffsetMillisecondsPrecision = 0): string {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  const precisedMilliseconds = getPrecisedMilliseconds(date, precision);
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    (precision !== 0 ? `.${precisedMilliseconds}`.padEnd(precision + 1, "0") : "") +
    diff +
    pad(tzOffset / 60) +
    ":" +
    pad(tzOffset % 60)
  );
}

function getPrecisedMilliseconds(date: Date, precision: OffsetMillisecondsPrecision): number {
  return Math.floor(Math.abs(date.getMilliseconds() / Math.pow(10, 3 - precision)));
}
