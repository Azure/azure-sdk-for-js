// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DEFAULT_COGNITIVE_SCOPE,
  LIB_INFO,
  MetricsAdvisorLoggingAllowedHeaderNames,
  MetricsAdvisorLoggingAllowedQueryParameters } from "./constants";
import {
  InternalPipelineOptions,
  ServiceClientOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions,
  isTokenCredential
} from "@azure/core-http";
import { MetricsAdvisorKeyCredential, createMetricsAdvisorKeyCredentialPolicy } from "./metricsAdvisorKeyCredentialPolicy";
import { MetricsAdvisorClientOptions } from "./metricsAdvisorClient";
import { TokenCredential } from "@azure/core-auth";
import { logger } from "./logger";

export function createClientPipeline(
  credential: TokenCredential | MetricsAdvisorKeyCredential,
  options: MetricsAdvisorClientOptions = {}
): ServiceClientOptions {
  const { ...pipelineOptions } = options;

  if (!pipelineOptions.userAgentOptions) {
    pipelineOptions.userAgentOptions = {};
  }
  if (pipelineOptions.userAgentOptions.userAgentPrefix) {
    pipelineOptions.userAgentOptions.userAgentPrefix = `${pipelineOptions.userAgentOptions.userAgentPrefix} ${LIB_INFO}`;
  } else {
    pipelineOptions.userAgentOptions.userAgentPrefix = LIB_INFO;
  }

  const authPolicy = isTokenCredential(credential)
    ? bearerTokenAuthenticationPolicy(credential, DEFAULT_COGNITIVE_SCOPE)
    : createMetricsAdvisorKeyCredentialPolicy(credential);

  const internalPipelineOptions: InternalPipelineOptions = {
    ...pipelineOptions,
    ...{
      loggingOptions: {
        logger: logger.info,
        allowedHeaderNames: MetricsAdvisorLoggingAllowedHeaderNames,
        allowedQueryParameters: MetricsAdvisorLoggingAllowedQueryParameters
      }
    }
  };
  return createPipelineFromOptions(internalPipelineOptions, authPolicy);
}
