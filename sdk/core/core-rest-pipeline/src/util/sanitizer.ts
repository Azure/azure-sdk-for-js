// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { type UnknownObject, isObject } from "@azure/core-util";

/**
 * @internal
 */
export interface SanitizerOptions {
  /**
   * Header names whose values will be logged when logging is enabled.
   * Defaults include a list of well-known safe headers. Any headers
   * specified in this field will be added to that list.  Any other values will
   * be written to logs as "REDACTED".
   */
  additionalAllowedHeaderNames?: string[];

  /**
   * Query string names whose values will be logged when logging is enabled. By default no
   * query string values are logged.
   */
  additionalAllowedQueryParameters?: string[];
}

const RedactedString = "REDACTED";

// Make sure this list is up-to-date with the one under core/logger/Readme#Keyconcepts
const defaultAllowedHeaderNames = [
  "x-ms-client-request-id",
  "x-ms-return-client-request-id",
  "x-ms-useragent",
  "x-ms-correlation-request-id",
  "x-ms-request-id",
  "client-request-id",
  "ms-cv",
  "return-client-request-id",
  "traceparent",

  "Access-Control-Allow-Credentials",
  "Access-Control-Allow-Headers",
  "Access-Control-Allow-Methods",
  "Access-Control-Allow-Origin",
  "Access-Control-Expose-Headers",
  "Access-Control-Max-Age",
  "Access-Control-Request-Headers",
  "Access-Control-Request-Method",
  "Origin",

  "Accept",
  "Accept-Encoding",
  "Cache-Control",
  "Connection",
  "Content-Length",
  "Content-Type",
  "Date",
  "ETag",
  "Expires",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Unmodified-Since",
  "Last-Modified",
  "Pragma",
  "Request-Id",
  "Retry-After",
  "Server",
  "Transfer-Encoding",
  "User-Agent",
  "WWW-Authenticate",
];

const defaultAllowedQueryParameters: string[] = ["api-version"];

/**
 * Sets of allowed header names and query parameters for the santizer functions.
 * Use {@link createSanitizerAllowedValues} to create custom sets that include the default values which should always be sanitized.
 */
export interface SanitizerAllowedValues {
  allowedHeaderNames: Set<string>;
  allowedQueryParameters: Set<string>;
}

/**
 * Set of default allowed values for the sanitizers.
 */
const defaultAllowedValues: SanitizerAllowedValues = {
  allowedHeaderNames: new Set(defaultAllowedHeaderNames.map((x) => x.toLowerCase())),
  allowedQueryParameters: new Set(defaultAllowedQueryParameters.map((x) => x.toLowerCase())),
};

/**
 * Create sets of allowed header names and query parameters to be used in the sanitizer functions.
 * This function will add the additional names and query parameters specified in the options to the
 * default set.
 *
 * @param options - Options bag containing additional header names and query parameters to allow.
 * @returns SanitizerAllowedValues object which can be passed to the sanitize functions.
 * @internal
 */
export function createSanitizerAllowedValues(
  options: SanitizerOptions = {},
): SanitizerAllowedValues {
  if (!options.additionalAllowedHeaderNames && !options.additionalAllowedQueryParameters) {
    // no need to create more sets here, just return the default
    return defaultAllowedValues;
  }

  const allowedHeaderNames = defaultAllowedHeaderNames.concat(
    options.additionalAllowedHeaderNames ?? [],
  );
  const allowedQueryParameters = defaultAllowedQueryParameters.concat(
    options.additionalAllowedQueryParameters ?? [],
  );

  return {
    allowedHeaderNames: new Set(allowedHeaderNames.map((x) => x.toLowerCase())),
    allowedQueryParameters: new Set(allowedQueryParameters.map((x) => x.toLowerCase())),
  };
}

export function sanitizeObject(
  obj: unknown,
  allowedValues: SanitizerAllowedValues = defaultAllowedValues,
): string {
  const seen = new Set<unknown>();
  return JSON.stringify(
    obj,
    (key: string, value: unknown) => {
      // Ensure Errors include their interesting non-enumerable members
      if (value instanceof Error) {
        return {
          ...value,
          name: value.name,
          message: value.message,
        };
      }

      if (key === "headers") {
        return sanitizeHeaders(value as UnknownObject, allowedValues);
      } else if (key === "url") {
        return sanitizeUrl(value as string, allowedValues);
      } else if (key === "query") {
        return sanitizeQuery(value as UnknownObject, allowedValues);
      } else if (key === "body") {
        // Don't log the request body
        return undefined;
      } else if (key === "response") {
        // Don't log response again
        return undefined;
      } else if (key === "operationSpec") {
        // When using sendOperationRequest, the request carries a massive
        // field with the autorest spec. No need to log it.
        return undefined;
      } else if (Array.isArray(value) || isObject(value)) {
        if (seen.has(value)) {
          return "[Circular]";
        }
        seen.add(value);
      }

      return value;
    },
    2,
  );
}

export function sanitizeUrl(
  value: string,
  { allowedQueryParameters }: SanitizerAllowedValues = defaultAllowedValues,
): string {
  if (typeof value !== "string" || value === null) {
    return value;
  }

  const url = new URL(value);

  if (!url.search) {
    return value;
  }

  for (const [key] of url.searchParams) {
    if (!allowedQueryParameters.has(key.toLowerCase())) {
      url.searchParams.set(key, RedactedString);
    }
  }

  return url.toString();
}

function sanitizeHeaders(
  obj: UnknownObject,
  { allowedHeaderNames }: SanitizerAllowedValues = defaultAllowedValues,
): UnknownObject {
  const sanitized: UnknownObject = {};
  for (const key of Object.keys(obj)) {
    if (allowedHeaderNames.has(key.toLowerCase())) {
      sanitized[key] = obj[key];
    } else {
      sanitized[key] = RedactedString;
    }
  }
  return sanitized;
}

function sanitizeQuery(
  value: UnknownObject,
  { allowedQueryParameters }: SanitizerAllowedValues = defaultAllowedValues,
): UnknownObject {
  if (typeof value !== "object" || value === null) {
    return value;
  }

  const sanitized: UnknownObject = {};

  for (const k of Object.keys(value)) {
    if (allowedQueryParameters.has(k.toLowerCase())) {
      sanitized[k] = value[k];
    } else {
      sanitized[k] = RedactedString;
    }
  }

  return sanitized;
}
