// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A HttpHeaders collection represented as a simple JSON object.
 */
export type RawHttpHeaders = { [headerName: string]: string };

/**
 * A HttpHeaders collection for input, represented as a simple JSON object.
 */
export type RawHttpHeadersInput = Record<string, string | number | boolean>;

/**
 * Represents a set of HTTP headers on a request/response.
 * Header names are treated as case insensitive.
 */
export interface HttpHeaders extends Iterable<[string, string]> {
  /**
   * Returns the value of a specific header or undefined if not set.
   * @param name - The name of the header to retrieve.
   */
  get(name: string): string | undefined;
  /**
   * Returns true if the specified header exists.
   * @param name - The name of the header to check.
   */
  has(name: string): boolean;
  /**
   * Sets a specific header with a given value.
   * @param name - The name of the header to set.
   * @param value - The value to use for the header.
   */
  set(name: string, value: string | number | boolean): void;
  /**
   * Removes a specific header from the collection.
   * @param name - The name of the header to delete.
   */
  delete(name: string): void;
  /**
   * Accesses a raw JS object that acts as a simple map
   * of header names to values.
   */
  toJSON(options?: { preserveCase?: boolean }): RawHttpHeaders;
}

/**
 * Fired in response to upload or download progress.
 */
export type TransferProgressEvent = {
  /**
   * The number of bytes loaded so far.
   */
  loadedBytes: number;
};

// UNBRANDED DIFFERENCE: HttpMethods are defined at the top level in unbranded instead of core-util since we don't
//                       need to worry about creating a cyclic dependency
/**
 * Supported HTTP methods to use when making requests.
 */
export type HttpMethods =
  | "GET"
  | "PUT"
  | "POST"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
  | "TRACE";

/**
 * Options that control how to retry failed requests.
 */
export interface PipelineRetryOptions {
  /**
   * The maximum number of retry attempts. Defaults to 3.
   */
  maxRetries?: number;

  /**
   * The amount of delay in milliseconds between retry attempts. Defaults to 1000
   * (1 second). The delay increases exponentially with each retry up to a maximum
   * specified by maxRetryDelayInMs.
   */
  retryDelayInMs?: number;

  /**
   * The maximum delay in milliseconds allowed before retrying an operation. Defaults
   * to 64000 (64 seconds).
   */
  maxRetryDelayInMs?: number;
}

/**
 * Defines options that are used to configure common telemetry and tracing info
 */
export interface TelemetryOptions {
  /**
   * The name of the header to pass the request ID to.
   */
  clientRequestIdHeaderName?: string;
}

/**
 * Options for how redirect responses are handled.
 */
export interface RedirectPolicyOptions {
  /**
   * The maximum number of times the redirect URL will be tried before
   * failing.  Defaults to 20.
   */
  maxRetries?: number;
}

/**
 * Options for adding user agent details to outgoing requests.
 */
export interface UserAgentPolicyOptions {
  /**
   * String prefix to add to the user agent for outgoing requests.
   * Defaults to an empty string.
   */
  userAgentPrefix?: string;
}
