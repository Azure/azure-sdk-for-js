// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
  PipelineOptions,
  createPipelineFromOptions
} from "@azure/core-rest-pipeline";

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { ServiceClientOptions, createClientPipeline } from "@azure/core-client";
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
  if (options.userAgentOptions) {
    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${LIB_INFO}`;
    } else {
      options.userAgentOptions.userAgentPrefix = LIB_INFO;
    }
  } else {
    options.userAgentOptions = {};
  }

  const authPolicy = isTokenCredential(credential)
    ? bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_COGNITIVE_SCOPE })
    : createMetricsAdvisorKeyCredentialPolicy(credential);

  const internalPipelineOptions: InternalPipelineOptions = {
    ...options,
    ...{
      loggingOptions: {
        logger: logger.info,
        additionalAllowedHeaderNames: MetricsAdvisorLoggingAllowedHeaderNames,
        additionalAllowedQueryParameters: MetricsAdvisorLoggingAllowedQueryParameters
      }
    }
  };
  return createPipelineFromOptions(internalPipelineOptions, authPolicy);
}
