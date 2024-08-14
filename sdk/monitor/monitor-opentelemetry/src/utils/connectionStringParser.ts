// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { diag } from "@opentelemetry/api";
import { ConnectionString, ConnectionStringKey } from "./types";
import { DEFAULT_BREEZE_ENDPOINT, DEFAULT_LIVEMETRICS_ENDPOINT } from "../types";

/**
 * ConnectionString parser.
 * @internal
 */
export class ConnectionStringParser {
  private static readonly FIELDS_SEPARATOR = ";";

  private static readonly FIELD_KEY_VALUE_SEPARATOR = "=";

  public static parse(connectionString?: string): ConnectionString {
    if (!connectionString) {
      return {};
    }

    const kvPairs = connectionString.split(ConnectionStringParser.FIELDS_SEPARATOR);
    let isValid = true;

    const result: ConnectionString = kvPairs.reduce((fields: ConnectionString, kv: string) => {
      const kvParts = kv.split(ConnectionStringParser.FIELD_KEY_VALUE_SEPARATOR);

      if (kvParts.length === 2) {
        // only save fields with valid formats
        const key = kvParts[0].toLowerCase() as ConnectionStringKey;
        const value = kvParts[1];
        return { ...fields, [key]: value };
      }
      diag.error(
        `Connection string key-value pair is invalid: ${kv}`,
        `Entire connection string will be discarded`,
        connectionString,
      );
      isValid = false;
      return fields;
    }, {});

    if (isValid && Object.keys(result).length > 0) {
      // this is a valid connection string, so parse the results

      if (result.endpointsuffix) {
        // use endpoint suffix where overrides are not provided
        const locationPrefix = result.location ? `${result.location}.` : "";
        result.ingestionendpoint =
          result.ingestionendpoint || `https://${locationPrefix}dc.${result.endpointsuffix}`;
        result.liveendpoint =
          result.liveendpoint || `https://${locationPrefix}live.${result.endpointsuffix}`;
      }

      result.ingestionendpoint = result.ingestionendpoint
        ? ConnectionStringParser.sanitizeUrl(result.ingestionendpoint)
        : DEFAULT_BREEZE_ENDPOINT;
      result.liveendpoint = result.liveendpoint
        ? ConnectionStringParser.sanitizeUrl(result.liveendpoint)
        : DEFAULT_LIVEMETRICS_ENDPOINT;
      if (result.authorization && result.authorization.toLowerCase() !== "ikey") {
        diag.warn(
          `Connection String contains an unsupported 'Authorization' value: ${result.authorization}. Defaulting to 'Authorization=ikey'. Instrumentation Key ${result.instrumentationkey!}`,
        );
      }
    } else {
      diag.error(
        "An invalid connection string was passed in. There may be telemetry loss",
        connectionString,
      );
    }

    return result;
  }

  public static sanitizeUrl(url: string): string {
    let newUrl = url.trim();
    if (newUrl.indexOf("https://") < 0) {
      // Try to update http to https
      newUrl = newUrl.replace("http://", "https://");
    }
    // Remove final slash if present
    if (newUrl[newUrl.length - 1] === "/") {
      newUrl = newUrl.slice(0, -1);
    }
    return newUrl;
  }

  public static validateInstrumentationKey(iKey: string): boolean {
    if (iKey.startsWith("InstrumentationKey=")) {
      const startIndex = iKey.indexOf("InstrumentationKey=") + "InstrumentationKey=".length;
      const endIndex = iKey.indexOf(";", startIndex);
      iKey = iKey.substring(startIndex, endIndex);
    }
    const UUID_Regex = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
    const regexp = new RegExp(UUID_Regex);
    return regexp.test(iKey);
  }
}
