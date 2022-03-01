// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Defines known cloud audiences for Form Recognizer.
 */
export enum FormRecognizerAudience {
  /** Azure China */
  AzureChina = "https://cognitiveservices.azure.cn/.default",
  /** Azure Government */
  AzureGovernment = "https://cognitiveservices.azure.us/.default",
  /** Azure Public Cloud */
  AzurePublicCloud = "https://cognitiveservices.azure.com/.default",
}

/**
 * The default AAD permissions scope for Cognitive Services.
 * @internal
 */
export const DEFAULT_COGNITIVE_SCOPE = FormRecognizerAudience.AzurePublicCloud;

/**
 * @internal
 */
export const SDK_VERSION = "4.0.0-beta.4";
