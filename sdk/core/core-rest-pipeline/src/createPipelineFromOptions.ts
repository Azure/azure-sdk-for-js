// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ProxySettings } from ".";
import { Pipeline, createEmptyPipeline } from "./pipeline";
import { decompressResponsePolicy } from "./policies/decompressResponsePolicy";
import {
  exponentialRetryPolicy,
  ExponentialRetryPolicyOptions
} from "./policies/exponentialRetryPolicy";
import { formDataPolicy } from "./policies/formDataPolicy";
import { logPolicy, LogPolicyOptions } from "./policies/logPolicy";
import { proxyPolicy } from "./policies/proxyPolicy";
import { redirectPolicy, RedirectPolicyOptions } from "./policies/redirectPolicy";
import { setClientRequestIdPolicy } from "./policies/setClientRequestIdPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { throttlingRetryPolicy } from "./policies/throttlingRetryPolicy";
import { tracingPolicy } from "./policies/tracingPolicy";
import { userAgentPolicy, UserAgentPolicyOptions } from "./policies/userAgentPolicy";
import { isNode } from "./util/helpers";

/**
 * Defines options that are used to configure the HTTP pipeline for
 * an SDK client.
 */
export interface PipelineOptions {
  /**
   * Options that control how to retry failed requests.
   */
  retryOptions?: ExponentialRetryPolicyOptions;

  /**
   * Options to configure a proxy for outgoing requests.
   */
  proxyOptions?: ProxySettings;

  /**
   * Options for how redirect responses are handled.
   */
  redirectOptions?: RedirectPolicyOptions;

  /**
   * Options for adding user agent details to outgoing requests.
   */
  userAgentOptions?: UserAgentPolicyOptions;
}

/**
 * Defines options that are used to configure internal options of
 * the HTTP pipeline for an SDK client.
 */
export interface InternalPipelineOptions extends PipelineOptions {
  /**
   * Options to configure request/response logging.
   */
  loggingOptions?: LogPolicyOptions;
}

/**
 * Create a new pipeline with a default set of customizable policies.
 * @param options - Options to configure a custom pipeline.
 */
export function createPipelineFromOptions(options: InternalPipelineOptions): Pipeline {
  const pipeline = createEmptyPipeline();

  if (isNode) {
    pipeline.addPolicy(proxyPolicy(options.proxyOptions));
    pipeline.addPolicy(decompressResponsePolicy());
  }

  pipeline.addPolicy(formDataPolicy());
  pipeline.addPolicy(tracingPolicy(options.userAgentOptions));
  pipeline.addPolicy(userAgentPolicy(options.userAgentOptions));
  pipeline.addPolicy(setClientRequestIdPolicy());
  pipeline.addPolicy(throttlingRetryPolicy(), { phase: "Retry" });
  pipeline.addPolicy(systemErrorRetryPolicy(options.retryOptions), { phase: "Retry" });
  pipeline.addPolicy(exponentialRetryPolicy(options.retryOptions), { phase: "Retry" });
  pipeline.addPolicy(redirectPolicy(options.redirectOptions), { afterPhase: "Retry" });
  pipeline.addPolicy(logPolicy(options.loggingOptions), { afterPhase: "Retry" });

  return pipeline;
}
