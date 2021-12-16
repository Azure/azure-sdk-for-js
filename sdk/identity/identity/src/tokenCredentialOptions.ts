// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions } from "@azure/core-client";

/**
 * Provides options to configure how the Identity library makes authentication
 * requests to Azure Active Directory.
 */
export interface TokenCredentialOptions extends CommonClientOptions {
  /**
   * The authority host to use for authentication requests.
   * Possible values are available through {@link AzureAuthorityHosts}.
   * The default is "https://login.microsoftonline.com".
   */
  authorityHost?: string;
}
