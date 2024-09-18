/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.
*/
export function getEnvironmentVariable(name: string): string {
  const value = process.env[name.toUpperCase()] || process.env[name.toLowerCase()];
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined.`);
  }
  return value;
}

/**
 * typeguard - for timewindow client filter
 */
export function isTimeWindowClientFilter(
  clientFilter: any
): clientFilter is { parameters: { Start: string; End: string } } {
  return (
    clientFilter.name === "Microsoft.TimeWindow" &&
    clientFilter.parameters &&
    clientFilter.parameters["Start"] &&
    clientFilter.parameters["End"] &&
    typeof clientFilter.parameters["Start"] === "string" &&
    typeof clientFilter.parameters["End"] === "string"
  );
}
