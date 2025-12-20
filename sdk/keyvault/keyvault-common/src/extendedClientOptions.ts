// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient, PipelineOptions, PipelinePolicy } from "@azure/core-rest-pipeline";

/**
 * Used to configure additional policies added to the pipeline at construction.
 */
export interface AdditionalPolicyConfig {
  /**
   * A policy to be added.
   */
  policy: PipelinePolicy;
  /**
   * Determines if this policy be applied before or after retry logic.
   * Only use `perRetry` if you need to modify the request again
   * each time the operation is retried due to retryable service
   * issues.
   */
  position: "perCall" | "perRetry";
}

/**
 * The common set of options that high level clients are expected to expose.
 */
export interface CommonClientOptions extends PipelineOptions {
  /**
   * The HttpClient that will be used to send HTTP requests.
   */
  httpClient?: HttpClient;
  /**
   * Set to true if the request is sent over HTTP instead of HTTPS
   */
  allowInsecureConnection?: boolean;
  /**
   * Additional policies to include in the HTTP pipeline.
   */
  additionalPolicies?: AdditionalPolicyConfig[];
}

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
