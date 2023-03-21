// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Provides options to configure the Visual Studio Code credential.
 *
 * @deprecated `VisualStudioCodeCredential` **is deprecated** and may be removed in a future version. The method that
 * this credential used to extract the Azure Account extension access token has been out of date and non-functional since Feb.
 * 14, 2022 (version 0.10.0 of the Azure Account extension for VS Code). As an alternative, please consider
 * [using `AzureCliCredential` to authenticate via the Azure CLI](https://github.com/azure/azure-sdk-for-js/tree/main/sdk/identity/identity#authenticate-via-the-azure-cli).
 * In the future, if Visual Studio Code authentication becomes viable again, this credential type may be undeprecated or
 * reintroduced if it has been removed.
 */
export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
  /**
   * Optionally pass in a Tenant ID to be used as part of the credential
   */
  tenantId?: string;
}
