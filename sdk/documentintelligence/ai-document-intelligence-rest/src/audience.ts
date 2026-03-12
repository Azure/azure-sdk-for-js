// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Defines the known cloud audiences for Document Intelligence.
 *
 * To authenticate with Entra Id (using a `TokenCredential`) in a [Sovereign Cloud](https://learn.microsoft.com/entra/identity-platform/authentication-national-cloud)
 * environment, provide the appropriate value below as the `audience` option when creating a
 * `Document Intelligence` client.
 *
 * The default value is suitable for Document Intelligence resources created in the Azure Public Cloud, so this value
 * is only required to use Document Intelligence in a different cloud environment.
 */
export enum KnownDocumentIntelligenceAudience {
  /** Azure China */
  AzureChina = "https://cognitiveservices.azure.cn",
  /** Azure Government */
  AzureGovernment = "https://cognitiveservices.azure.us",
  /** Azure Public Cloud */
  AzurePublicCloud = "https://cognitiveservices.azure.com",
}
