// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Defines the known cloud audiences for Form Recognizer.
 *
 * To authenticate with Azure Active Directory (using a `TokenCredential`) in a [Sovereign Cloud](https://docs.microsoft.com/azure/active-directory/develop/authentication-national-cloud)
 * environment, provide the appropriate value below as the `audience` option when creating a
 * `DocumentAnalysisClient` or `DocumentModelAdministrationClient`.
 *
 * The default value is suitable for Form Recognizer resources created in the Azure Public Cloud, so this value
 * is only required to use Form Recognizer in a different cloud environment.
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
