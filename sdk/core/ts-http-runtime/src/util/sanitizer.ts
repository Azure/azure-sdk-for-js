// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { UnknownObject, isObject } from "./object";

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
 * @internal
 */
export class Sanitizer {
  private allowedHeaderNames: Set<string>;
  private allowedQueryParameters: Set<string>;

  constructor({
    additionalAllowedHeaderNames: allowedHeaderNames = [],
    additionalAllowedQueryParameters: allowedQueryParameters = [],
  }: SanitizerOptions = {}) {
    allowedHeaderNames = defaultAllowedHeaderNames.concat(allowedHeaderNames);
    allowedQueryParameters = defaultAllowedQueryParameters.concat(allowedQueryParameters);

    this.allowedHeaderNames = new Set(allowedHeaderNames.map((n) => n.toLowerCase()));
    this.allowedQueryParameters = new Set(allowedQueryParameters.map((p) => p.toLowerCase()));
  }

  public sanitize(obj: unknown): string {
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
          return this.sanitizeHeaders(value as UnknownObject);
        } else if (key === "url") {
          return this.sanitizeUrl(value as string);
        } else if (key === "query") {
          return this.sanitizeQuery(value as UnknownObject);
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
      2
    );
  }

  private sanitizeHeaders(obj: UnknownObject): UnknownObject {
    const sanitized: UnknownObject = {};
    for (const key of Object.keys(obj)) {
      if (this.allowedHeaderNames.has(key.toLowerCase())) {
        sanitized[key] = obj[key];
      } else {
        sanitized[key] = RedactedString;
      }
    }
    return sanitized;
  }

  private sanitizeQuery(value: UnknownObject): UnknownObject {
    if (typeof value !== "object" || value === null) {
      return value;
    }

    const sanitized: UnknownObject = {};

    for (const k of Object.keys(value)) {
      if (this.allowedQueryParameters.has(k.toLowerCase())) {
        sanitized[k] = value[k];
      } else {
        sanitized[k] = RedactedString;
      }
    }

    return sanitized;
  }

  private sanitizeUrl(value: string): string {
    if (typeof value !== "string" || value === null) {
      return value;
    }

    const url = new URL(value);

    if (!url.search) {
      return value;
    }

    for (const [key] of url.searchParams) {
      if (!this.allowedQueryParameters.has(key.toLowerCase())) {
        url.searchParams.set(key, RedactedString);
      }
    }

    return url.toString();
  }
}
