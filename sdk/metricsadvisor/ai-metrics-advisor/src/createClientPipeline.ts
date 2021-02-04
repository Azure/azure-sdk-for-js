// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  createPipelineFromOptions,
  InternalPipelineOptions,
  ServiceClientOptions,
  bearerTokenAuthenticationPolicy,
  isTokenCredential
} from "@azure/core-http";

import { TokenCredential } from "@azure/identity";

import {
  LIB_INFO,
  DEFAULT_COGNITIVE_SCOPE,
  MetricsAdvisorLoggingAllowedHeaderNames,
  MetricsAdvisorLoggingAllowedQueryParameters
} from "./constants";
import { logger } from "./logger";
import { MetricsAdvisorClientOptions } from "./metricsAdvisorClient";
import {
  createMetricsAdvisorKeyCredentialPolicy,
  MetricsAdvisorKeyCredential
} from "./metricsAdvisorKeyCredentialPolicy";

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
