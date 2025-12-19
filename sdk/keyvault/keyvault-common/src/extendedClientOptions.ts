// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommonClientOptions } from "@azure/core-client";

/**
 * Options for keep alive behavior of HTTP connections.
 */
export interface KeepAliveOptions {
  /**
   * When true, connections will be kept alive for multiple requests.
   * Defaults to true.
   */
  enable?: boolean;
}

/**
 * Options for how redirect responses are handled.
 */
export interface RedirectOptions {
  /**
   * When true, redirect responses are followed. Defaults to true.
   */
  handleRedirects?: boolean;

  /**
   * The maximum number of times the redirect URL will be tried before
   * failing. Defaults to 20.
   */
  maxRetries?: number;
}

/**
 * Extended common client options that include keep alive and redirect options.
 * This type combines the standard CommonClientOptions with additional options
 * for controlling HTTP connection keep-alive and redirect behavior.
 */
export type ExtendedCommonClientOptions = CommonClientOptions & {
  /**
   * Options to configure keep alive behavior for HTTP connections.
   */
  keepAliveOptions?: KeepAliveOptions;
  /**
   * Options to configure how redirect responses are handled.
   */
  redirectOptions?: RedirectOptions;
};
