// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const SDK_VERSION: string = "3.0.0-preview.1";

export const DEFAULT_COGNITIVE_SCOPE = "https://cognitiveservices.azure.com/.default";

export const AnomalyDetectorLoggingAllowedHeaderNames = [
  "apim-request-id",
  "Location",
  "Operation-Location",
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "x-envoy-upstream-service-time",
  "Ocp-Apim-Subscription-Key"
];

export const AnomalyDetectorLoggingAllowedQueryParameters = [
  "includeTextDetails",
  "includeKeys",
  "op"
];
