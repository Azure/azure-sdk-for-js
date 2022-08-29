// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureCloudOptions } from "@azure/msal-common";

/**
 * Provides options to configure how the Identity library 
 * does authority validation during authentication requests
 * to Azure Active Directory.
 */
export interface AuthorityValidationOptions {
    knownAuthorities?: Array<string>;
    cloudDiscoveryMetadata?: string;
    authorityMetadata?: string;
    azureCloudOptions?: AzureCloudOptions;
    skipAuthorityMetadataCache?: boolean
}