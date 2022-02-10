// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { URLBuilder, URLQuery } from "../url";
import { UnknownObject, isObject } from "./utils";

export interface SanitizerOptions {
  /**
   * Header names whose values will be logged when logging is enabled. Defaults to
   * Date, traceparent, x-ms-client-request-id, and x-ms-request id.  Any headers
   * specified in this field will be added to that list.  Any other values will
   * be written to logs as "REDACTED".
   */
  allowedHeaderNames?: string[];

  /**
   * Query string names whose values will be logged when logging is enabled. By default no
   * query string values are logged.
   */
  allowedQueryParameters?: string[];
}

const RedactedString = "REDACTED";

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

export class Sanitizer {
  public allowedHeaderNames: Set<string>;
  public allowedQueryParameters: Set<string>;

  constructor({ allowedHeaderNames = [], allowedQueryParameters = [] }: SanitizerOptions = {}) {
    allowedHeaderNames = Array.isArray(allowedHeaderNames)
      ? defaultAllowedHeaderNames.concat(allowedHeaderNames)
      : defaultAllowedHeaderNames;

    allowedQueryParameters = Array.isArray(allowedQueryParameters)
      ? defaultAllowedQueryParameters.concat(allowedQueryParameters)
      : defaultAllowedQueryParameters;

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

        if (key === "_headersMap") {
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

  private sanitizeHeaders(value: UnknownObject): UnknownObject {
    return this.sanitizeObject(value, this.allowedHeaderNames, (v, k) => v[k].value);
  }

  private sanitizeQuery(value: UnknownObject): UnknownObject {
    return this.sanitizeObject(value, this.allowedQueryParameters, (v, k) => v[k]);
  }

  private sanitizeObject(
    value: UnknownObject,
    allowedKeys: Set<string>,
    accessor: (value: any, key: string) => any
  ): UnknownObject {
    if (typeof value !== "object" || value === null) {
      return value;
    }

    const sanitized: UnknownObject = {};

    for (const k of Object.keys(value)) {
      if (allowedKeys.has(k.toLowerCase())) {
        sanitized[k] = accessor(value, k);
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

    const urlBuilder = URLBuilder.parse(value);
    const queryString = urlBuilder.getQuery();

    if (!queryString) {
      return value;
    }

    const query = URLQuery.parse(queryString);
    for (const k of query.keys()) {
      if (!this.allowedQueryParameters.has(k.toLowerCase())) {
        query.set(k, RedactedString);
      }
    }

    urlBuilder.setQuery(query.toString());
    return urlBuilder.toString();
  }
}
