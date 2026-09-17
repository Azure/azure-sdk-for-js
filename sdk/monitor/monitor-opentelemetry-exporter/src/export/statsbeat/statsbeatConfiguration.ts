// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectionStringParser } from "../../utils/connectionStringParser.js";
import { EU_CONNECTION_STRING, EU_ENDPOINTS, NON_EU_CONNECTION_STRING } from "./types.js";

const DEFAULT_STATS_CONNECTION_STRING = "DEFAULT_STATS_CONNECTION_STRING";
const SUPPORTED_DATA_BOUNDARIES = "SUPPORTED_DATA_BOUNDARIES";

export function getBuiltInStatsbeatConnectionString(endpointUrl: string): string {
  const region = getRegion(endpointUrl);
  return region && EU_ENDPOINTS.includes(region) ? EU_CONNECTION_STRING : NON_EU_CONNECTION_STRING;
}

export function resolveStatsbeatConnectionString(
  endpointUrl: string,
  settings: Readonly<Record<string, unknown>>,
): string {
  const fallback = getBuiltInStatsbeatConnectionString(endpointUrl);
  const defaultConnectionString = getValidConnectionString(
    settings[DEFAULT_STATS_CONNECTION_STRING],
  );
  const region = getRegion(endpointUrl);
  const boundaries = parseStringArray(settings[SUPPORTED_DATA_BOUNDARIES]);

  if (region && boundaries) {
    for (const boundary of boundaries) {
      if (boundary.toUpperCase() === "DEFAULT") {
        continue;
      }
      const regions = parseStringArray(settings[`${boundary}_REGIONS`]);
      if (regions?.some((candidate) => candidate.toLowerCase() === region)) {
        return (
          getValidConnectionString(settings[`${boundary}_STATS_CONNECTION_STRING`]) ??
          defaultConnectionString ??
          fallback
        );
      }
    }
  }

  return defaultConnectionString ?? fallback;
}

function getRegion(endpointUrl: string): string | undefined {
  try {
    const stampName = new URL(endpointUrl).hostname.toLowerCase().split(".")[0];
    return stampName.split("-")[0];
  } catch {
    return undefined;
  }
}

function parseStringArray(value: unknown): string[] | undefined {
  let parsed = value;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      return undefined;
    }
  }
  if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "string")) {
    return undefined;
  }
  return parsed;
}

function getValidConnectionString(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length === 0) {
    return undefined;
  }
  try {
    const parsed = ConnectionStringParser.parse(value);
    return parsed.instrumentationkey && parsed.ingestionendpoint ? value : undefined;
  } catch {
    return undefined;
  }
}
