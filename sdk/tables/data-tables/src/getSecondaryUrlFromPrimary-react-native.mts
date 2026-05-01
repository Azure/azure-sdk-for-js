// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const SecondaryLocationAccountSuffix = "-secondary";

/**
 * Utility function that calculates the secondary URL for a table instance given the primary URL.
 */
export function getSecondaryUrlFromPrimary(primaryUrl: string): string {
  const parsedPrimaryUrl = new URL(primaryUrl) as { hostname: string; toString(): string };
  const host = parsedPrimaryUrl.hostname.split(".");
  if (host.length > 1) {
    host[0] = `${host[0]}${SecondaryLocationAccountSuffix}`;
  }
  parsedPrimaryUrl.hostname = host.join(".");

  return parsedPrimaryUrl.toString();
}
