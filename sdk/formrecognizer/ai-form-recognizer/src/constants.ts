// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Defines known cloud audiences for Form Recognizer.
 *
 * --- More about national clouds ---
 * 
 * National clouds are physically isolated instances of Azure.
 * These regions of Azure are designed to make sure that data residency, sovereignty, and compliance requirements are honored within geographical boundaries.
 * 
 * For more information, refer https://docs.microsoft.com/azure/active-directory/develop/authentication-national-cloud.
 * 
 * As of now, FormRecognizer supports the following audiences.
 * 
 * -------
 * 
 * For authentication with Azure Active Directory, use this as "audience" as part of the constructor client options.
 * 
 * You should only need this to be set as "audience" if you are using AAD/token credential and if you are using a cloud other than the `AzurePublicCloud`(default).
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
