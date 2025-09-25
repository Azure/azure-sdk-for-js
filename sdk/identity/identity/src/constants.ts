// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Current version of the `@azure/identity` package.
 */
export const SDK_VERSION = `4.12.1`;

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
   *
   * @deprecated Microsoft Cloud Germany was closed on October 29th, 2021.
   *
   * */
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
 * @internal
 * The default authority host.
 */
export const DefaultAuthorityHost = AzureAuthorityHosts.AzurePublicCloud;

/**
 * @internal
 * The default environment host for Azure Public Cloud
 */
export const DefaultAuthority = "login.microsoftonline.com";

/**
 * @internal
 * Allow acquiring tokens for any tenant for multi-tentant auth.
 */
export const ALL_TENANTS: string[] = ["*"];

/**
 * @internal
 */
export const CACHE_CAE_SUFFIX = "cae";

/**
 * @internal
 */
export const CACHE_NON_CAE_SUFFIX = "nocae";

/**
 * @internal
 *
 * The default name for the cache persistence plugin.
 * Matches the constant defined in the cache persistence package.
 */
export const DEFAULT_TOKEN_CACHE_NAME = "msal.cache";
