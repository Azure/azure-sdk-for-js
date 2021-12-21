// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const SDK_VERSION: string = "1.0.1";

export const DEFAULT_COGNITIVE_SCOPE = "https://cognitiveservices.azure.com/.default";

export const LIB_INFO = `azsdk-js-metricsadvisor/${SDK_VERSION}`;

export const MetricsAdvisorLoggingAllowedHeaderNames = [
  "apim-request-id",
  "Location",
  "Operation-Location",
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "x-envoy-upstream-service-time",
];

export const MetricsAdvisorLoggingAllowedQueryParameters = [
  "$skip",
  "$top",
  "dataFeedName",
  "dataSourceType",
  "granularityName",
  "status",
  "creator",
  "hookName",
];
