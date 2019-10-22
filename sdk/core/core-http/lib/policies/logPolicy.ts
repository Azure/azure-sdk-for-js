// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { URLBuilder, URLQuery } from "../url";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";
import { Debugger } from "@azure/logger";
import { logger as coreLogger, logger } from "../log";

export interface LogPolicyOptions {
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

/**
 * Options to configure request/response logging.
 */
export interface LoggingOptions {
  /**
   * The Debugger (logger) instance to use for writing pipeline logs.
   */
  logger?: Debugger,

  /**
   * Options to pass to the logPolicy factory.
   */
  logPolicyOptions?: LogPolicyOptions
}

const RedactedString = "REDACTED";

const defaultAllowedHeaderNames = [
  "x-ms-client-request-id",
  "x-ms-return-client-request-id",
  "traceparent",

  "Accept",
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
  "User-Agent"
];

const defaultAllowedQueryParameters: string[] = [
  "api-version"
];

export const DefaultLoggingOptions: LoggingOptions = {
  logger: undefined,
  logPolicyOptions: {
    allowedHeaderNames: [],      // These are empty lists because they are additive to
    allowedQueryParameters: []   // the real defaultAllowed[HeaderNames|QueryParameters].
  }
}

export function logPolicy(
  logger: any = coreLogger.info.bind(coreLogger),
  logOptions: LogPolicyOptions = {}
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new LogPolicy(nextPolicy, options, logger, logOptions);
    }
  };
}

export class LogPolicy extends BaseRequestPolicy {
  logger?: any;

  public allowedHeaderNames: Set<string>;
  public allowedQueryParameters: Set<string>;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    logger: any = console.log,
    { allowedHeaderNames = [], allowedQueryParameters = [] }: LogPolicyOptions = {}
  ) {
    super(nextPolicy, options);
    this.logger = logger;

    allowedHeaderNames =
      allowedHeaderNames && allowedHeaderNames instanceof Array
        ? defaultAllowedHeaderNames.concat(allowedHeaderNames)
        : defaultAllowedHeaderNames;

    allowedQueryParameters =
      allowedQueryParameters && allowedQueryParameters instanceof Array
        ? defaultAllowedQueryParameters.concat(allowedQueryParameters)
        : defaultAllowedQueryParameters;

    this.allowedHeaderNames = new Set(allowedHeaderNames);
    this.allowedQueryParameters = new Set(allowedQueryParameters);
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (!logger.info.enabled) return this._nextPolicy.sendRequest(request);

    this.logRequest(request);
    return this._nextPolicy.sendRequest(request).then((response) => this.logResponse(response));
  }

  private logRequest(request: WebResource) {
    this.logger(`Request: ${JSON.stringify(request, this.sanitize.bind(this), 2)}`);
  }

  private sanitize(key: string, value: unknown) {
    if (key === "_headersMap") {
      return this.sanitizeHeaders(key, value as {});
    } else if (key === "url") {
      return this.sanitizeUrl(value as string);
    } else if (key === "query") {
      return this.sanitizeQuery(value as {});
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
    }

    return value;
  }

  private sanitizeHeaders(_: string, value: { [s: string]: any }) {
    return this.sanitizeObject(value, this.allowedHeaderNames, (v, k) => v[k].value);
  }

  private sanitizeQuery(value: { [s: string]: string }) {
    return this.sanitizeObject(value, this.allowedQueryParameters, (v, k) => v[k]);
  }

  private sanitizeObject(
    value: { [s: string]: any },
    allowedKeys: Set<string>,
    accessor: (value: any, key: string) => any
  ) {
    if (typeof value !== "object" || value === null) {
      return value;
    }

    const sanitized: { [s: string]: string } = {};

    for (const k of Object.keys(value)) {
      if (allowedKeys.has(k)) {
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
      if (!this.allowedQueryParameters.has(k)) {
        query.set(k, RedactedString);
      }
    }

    urlBuilder.setQuery(query.toString());
    return urlBuilder.toString();
  }

  private logResponse(response: HttpOperationResponse): HttpOperationResponse {
    this.logger(`Response status code: ${response.status}`);
    this.logger(`Headers: ${JSON.stringify(response.headers, this.sanitize.bind(this), 2)}`);
    return response;
  }
}
