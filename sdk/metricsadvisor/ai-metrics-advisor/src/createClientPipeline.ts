// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClientOptions } from "@azure/core-client";
import {
  createPipelineFromOptions,
  InternalPipelineOptions,
  Pipeline
} from "@azure/core-rest-pipeline";

import {
  MetricsAdvisorLoggingAllowedHeaderNames,
  MetricsAdvisorLoggingAllowedQueryParameters
} from "./constants";
import { logger } from "./logger";
import { MetricsAdvisorClientOptions } from "./metricsAdvisorClient";

export function createMAClientPipeline(
  options: MetricsAdvisorClientOptions = {}
): ServiceClientOptions {
  const internalPipelineOptions: InternalPipelineOptions = {
    ...options,
    loggingOptions: {
      logger: logger.info,
      additionalAllowedHeaderNames: MetricsAdvisorLoggingAllowedHeaderNames,
      additionalAllowedQueryParameters: MetricsAdvisorLoggingAllowedQueryParameters
    }
  };
  return createPipelineFromOptions(internalPipelineOptions);
}
