// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LogPolicyOptions, logPolicy } from "./policies/logPolicy.js";
import { Pipeline, createEmptyPipeline } from "./pipeline.js";
import { PipelineRetryOptions, TlsSettings } from "./interfaces.js";
import { RedirectPolicyOptions, redirectPolicy } from "./policies/redirectPolicy.js";
import { UserAgentPolicyOptions, userAgentPolicy } from "./policies/userAgentPolicy.js";

import { ProxySettings } from "./interfaces.js";
import { decompressResponsePolicy } from "./policies/decompressResponsePolicy.js";
import { defaultRetryPolicy } from "./policies/defaultRetryPolicy.js";
import { formDataPolicy } from "./policies/formDataPolicy.js";
import { isNode } from "@azure/core-util";
import { proxyPolicy } from "./policies/proxyPolicy.js";
import { setClientRequestIdPolicy } from "./policies/setClientRequestIdPolicy.js";
import { tlsPolicy } from "./policies/tlsPolicy.js";
import { tracingPolicy } from "./policies/tracingPolicy.js";

/**
 * Defines options that are used to configure the HTTP pipeline for
 * an SDK client.
 */
export interface PipelineOptions {
  /**
   * Options that control how to retry failed requests.
   */
  retryOptions?: PipelineRetryOptions;

  /**
   * Options to configure a proxy for outgoing requests.
   */
  proxyOptions?: ProxySettings;

  /** Options for configuring TLS authentication */
  tlsOptions?: TlsSettings;

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
    if (options.tlsOptions) {
      pipeline.addPolicy(tlsPolicy(options.tlsOptions));
    }
    pipeline.addPolicy(proxyPolicy(options.proxyOptions));
    pipeline.addPolicy(decompressResponsePolicy());
  }

  pipeline.addPolicy(formDataPolicy());
  pipeline.addPolicy(userAgentPolicy(options.userAgentOptions));
  pipeline.addPolicy(setClientRequestIdPolicy());
  pipeline.addPolicy(defaultRetryPolicy(options.retryOptions), { phase: "Retry" });
  pipeline.addPolicy(tracingPolicy(options.userAgentOptions), { afterPhase: "Retry" });
  if (isNode) {
    // Both XHR and Fetch expect to handle redirects automatically,
    // so only include this policy when we're in Node.
    pipeline.addPolicy(redirectPolicy(options.redirectOptions), { afterPhase: "Retry" });
  }
  pipeline.addPolicy(logPolicy(options.loggingOptions), { afterPhase: "Sign" });

  return pipeline;
}
