// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type LogPolicyOptions, logPolicy } from "./policies/logPolicy.js";
import { type Pipeline, createEmptyPipeline } from "./pipeline.js";
import type { PipelineOptions } from "./interfacesWeb.js";
import { defaultRetryPolicy } from "./policies/defaultRetryPolicy.js";
import { formDataPolicy } from "./policies/formDataPolicy.js";
import { multipartPolicy, multipartPolicyName } from "./policies/multipartPolicy.js";
import { userAgentPolicy } from "./policies/userAgentPolicy.js";

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

  pipeline.addPolicy(formDataPolicy(), { beforePolicies: [multipartPolicyName] });
  pipeline.addPolicy(userAgentPolicy(options.userAgentOptions));
  pipeline.addPolicy(multipartPolicy(), { afterPhase: "Deserialize" });
  pipeline.addPolicy(defaultRetryPolicy(options.retryOptions), { phase: "Retry" });
  pipeline.addPolicy(logPolicy(options.loggingOptions), { afterPhase: "Sign" });

  return pipeline;
}
