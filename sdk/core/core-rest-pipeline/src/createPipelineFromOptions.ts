import { InternalPipelineOptions, Pipeline, createEmptyPipeline } from "./pipeline";
import { decompressResponsePolicy } from "./policies/decompressResponsePolicy";
import { exponentialRetryPolicy } from "./policies/exponentialRetryPolicy";
import { formDataPolicy } from "./policies/formDataPolicy";
import { logPolicy } from "./policies/logPolicy";
import { proxyPolicy } from "./policies/proxyPolicy";
import { redirectPolicy } from "./policies/redirectPolicy";
import { setClientRequestIdPolicy } from "./policies/setClientRequestIdPolicy";
import { systemErrorRetryPolicy } from "./policies/systemErrorRetryPolicy";
import { throttlingRetryPolicy } from "./policies/throttlingRetryPolicy";
import { tracingPolicy } from "./policies/tracingPolicy";
import { userAgentPolicy } from "./policies/userAgentPolicy";
import { isNode } from "./util/helpers";

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
