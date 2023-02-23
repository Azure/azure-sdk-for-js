// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Current version of the `@azure/identity` package.
 */

export const SDK_VERSION = `3.2.0-beta.1`;

/**
 * The default client ID for authentication
 * @internal
 */
// TODO: temporary - this is the Azure CLI clientID - we'll replace it when
// Developer Sign On application is available
// https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/identity/Azure.Identity/src/Constants.cs#L9
export const DeveloperSignOnClientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";

/**
 * The default tenant for authentication
 * @internal
 */
export const DefaultTenantId = "common";

/**
 * A list of known Azure authority hosts
 */
export enum AzureAuthorityHosts {
  /**
   * China-based Azure Authority Host
   */
  AzureChina = "https://login.chinacloudapi.cn",
  /**
   * Germany-based Azure Authority Host
   */
  AzureGermany = "https://login.microsoftonline.de",
  /**
   * US Government Azure Authority Host
   */
  AzureGovernment = "https://login.microsoftonline.us",
  /**
   * Public Cloud Azure Authority Host
   */
  AzurePublicCloud = "https://login.microsoftonline.com",
}

/**
 * The default authority host.
 */
export const DefaultAuthorityHost = AzureAuthorityHosts.AzurePublicCloud;

/**
 * Allow acquiring tokens for any tenant for multi-tentant auth.
 */
export const ALL_TENANTS: string[] = ["*"];
