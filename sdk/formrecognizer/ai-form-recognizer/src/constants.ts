// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const SDK_VERSION: string = "3.0.0";

export const DEFAULT_COGNITIVE_SCOPE = "https://cognitiveservices.azure.com/.default";

export const LIB_INFO = `azsdk-js-ai-formrecognizer/${SDK_VERSION}`;

/**
 * Maximum size of input documents allowed by the Azure Form Recognizer service.
 * @internal
 */
export const MAX_INPUT_DOCUMENT_SIZE = 50 * 1024 * 1024; // 50 MB

export const FormRecognizerLoggingAllowedHeaderNames = [
  "apim-request-id",
  "Location",
  "Operation-Location",
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "x-envoy-upstream-service-time"
];

export const FormRecognizerLoggingAllowedQueryParameters = [
  "includeTextDetails",
  "includeKeys",
  "op"
];
