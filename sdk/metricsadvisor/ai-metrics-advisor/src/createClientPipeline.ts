// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  InternalPipelineOptions,
  bearerTokenAuthenticationPolicy,
  createPipelineFromOptions
} from "@azure/core-rest-pipeline";

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { ServiceClientOptions } from "@azure/core-client";
import {
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
