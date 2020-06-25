// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "./httpClient";
import { RetryOptions } from "./policies/exponentialRetryPolicy";
import { KeepAliveOptions } from "./policies/keepAlivePolicy";
import { RedirectOptions } from "./policies/redirectPolicy";
import { ProxyOptions } from "./serviceClient";
import { UserAgentOptions } from "./policies/userAgentPolicy";
import { DeserializationOptions } from "./policies/deserializationPolicy";
import { LogPolicyOptions } from "./policies/logPolicy";

/**
 * Defines options that are used to configure the HTTP pipeline for
 * an SDK client.
 */
export interface PipelineOptions {
  /**
   * The HttpClient implementation to use for outgoing HTTP requests.  Defaults
   * to DefaultHttpClient.
   */
  httpClient?: HttpClient;

  /**
   * Options that control how to retry failed requests.
   */
  retryOptions?: RetryOptions;

  /**
   * Options to configure a proxy for outgoing requests.
   */
  proxyOptions?: ProxyOptions;

  /*
   * Options for how HTTP connections should be maintained for future
   * requests.
   */
  keepAliveOptions?: KeepAliveOptions;

  /**
   * Options for how redirect responses are handled.
   */
  redirectOptions?: RedirectOptions;

  /**
   * Options for adding user agent details to outgoing requests.
   */
  userAgentOptions?: UserAgentOptions;
}

/**
 * Defines options that are used to configure internal options of
 * the HTTP pipeline for an SDK client.
 */
export interface InternalPipelineOptions extends PipelineOptions {
  /**
   * Options to configure API response deserialization.
   */
  deserializationOptions?: DeserializationOptions;

  /**
   * Options to configure request/response logging.
   */
  loggingOptions?: LogPolicyOptions;

  /**
   * Configure whether to decompress response according to Accept-Encoding header (node-fetch only)
   */
  decompressResponse?: boolean;
}
