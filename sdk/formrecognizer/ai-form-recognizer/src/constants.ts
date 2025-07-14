// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Defines the known cloud audiences for Form Recognizer.
 *
 * To authenticate with Entra Id (using a `TokenCredential`) in a [Sovereign Cloud](https://learn.microsoft.com/entra/identity-platform/authentication-national-cloud)
 * environment, provide the appropriate value below as the `audience` option when creating a
 * `DocumentAnalysisClient` or `DocumentModelAdministrationClient`.
 *
 * The default value is suitable for Form Recognizer resources created in the Azure Public Cloud, so this value
 * is only required to use Form Recognizer in a different cloud environment.
 */
export enum KnownFormRecognizerAudience {
  /** Azure China */
  AzureChina = "https://cognitiveservices.azure.cn",
  /** Azure Government */
  AzureGovernment = "https://cognitiveservices.azure.us",
  /** Azure Public Cloud */
  AzurePublicCloud = "https://cognitiveservices.azure.com",
}

/**
 * The default Entra Id permissions scope for Cognitive Services.
 * @internal
 */
export const DEFAULT_COGNITIVE_SCOPE = `${KnownFormRecognizerAudience.AzurePublicCloud}/.default`;

/**
 * @internal
 */
export const SDK_VERSION = "5.1.0";

export const FORM_RECOGNIZER_API_VERSION = "2023-07-31";
