// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Common ISO8601 durations.
 */
export const CommonDurations = {
  /** Alias for ISO8601 value 'P7D' */
  last7Days: "P7D",
  /** Alias for ISO8601 value 'P3D' */
  last3Days: "P3D",
  /** Alias for ISO8601 value 'P2D' */
  last2Days: "P2D",
  /** Alias for ISO8601 value 'P1D' */
  lastDay: "P1D",

  /** Alias for ISO8601 value 'PT1H' */
  lastHour: "PT1H",
  /** Alias for ISO8601 value 'PT4H' */
  last4Hours: "PT4H",
  /** Alias for ISO8601 value 'P1D' */
  last24Hours: "P1D",
  /** Alias for ISO8601 value 'P2D' */
  last48Hours: "P2D",

  /** Alias for ISO8601 value 'PT30M' */
  last30Minutes: "PT30M",
  /** Alias for ISO8601 value 'PT5M' */
  last5Minutes: "PT5M"
} as const;
