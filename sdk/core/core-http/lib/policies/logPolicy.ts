// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";
import { logger as coreLogger } from "../log";
export interface LogPolicyOptions {
  /**
   * Header names whose values will be logged when logging is enabled. Defaults to
   * Date, traceparent, x-ms-client-request-id, and x-ms-request id. Other values
   * will show as "REDACTED".
   */
  allowedHeaderNames?: string[],

  /**
   * Query string names whose values will be logged when logging is enabled. By default no
   * query string values are logged.
   */
  allowedQueryParameters?: string[]
}

const defaultAllowedHeaderNames = [
  'Date', 'traceparent', 'x-ms-client-request-id', 'x-ms-request-id'
]

const defaultAllowedQueryParameters: string[] = [];

export function logPolicy(logger: any = coreLogger.info.bind(coreLogger), logOptions: LogPolicyOptions = {}): RequestPolicyFactory {

  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new LogPolicy(nextPolicy, options, logger, logOptions);
    }
  };
}

export class LogPolicy extends BaseRequestPolicy {
  logger?: any;

  public allowedHeaderNames: string[];
  public allowedQueryParameters: string[];
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, logger: any = console.log,{
    allowedHeaderNames = defaultAllowedHeaderNames,
    allowedQueryParameters = defaultAllowedQueryParameters
  }: LogPolicyOptions = {}) {
    super(nextPolicy, options);
    this.logger = logger;
    this.allowedHeaderNames = allowedHeaderNames;
    this.allowedQueryParameters = allowedQueryParameters;
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    this.logRequest(request);
    return this._nextPolicy.sendRequest(request).then(response => this.logResponse(response));
  }

  private logRequest(request: WebResource) {
    this.logger(`Request: ${JSON.stringify(request, this.sanitize.bind(this), 2)}`);
  }

  private sanitize(key: string, value: unknown) {
    if (key === '_headersMap') {
      return this.sanitizeHeaders(key, value as {});
    } else if (key === 'query') {
      return this.sanitizeQuery(value as {});
    } else if (key === 'response') {
      // don't log response again
      return undefined;
    }

    return value;
  }

  private sanitizeHeaders(_: string, value: { [s: string]: string }) {
    if (typeof value !== 'object' || value === null) {
      return value;
    }

    const sanitized: {[s: string]: string} = {};

    for (const k of Object.keys(value)) {
      if (this.allowedHeaderNames.includes(k)) {
        sanitized[k] = value[k];
      } else {
        sanitized[k] = 'REDACTED';
      }
    }

    return sanitized;
  }

  private sanitizeQuery(value: object) {
    return value;
  }


  private logResponse(response: HttpOperationResponse): Promise<HttpOperationResponse> {
    this.logger(`Response status code: ${response.status}`);
    this.logger(`Headers: ${JSON.stringify(response.headers, this.sanitize.bind(this), 2)}`)
    const responseBody = response.bodyAsText;
    this.logger(`Body: ${responseBody}`);
    return Promise.resolve(response);
  }
}
