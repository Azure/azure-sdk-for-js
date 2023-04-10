// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Options for the {@link AzureCliCredential}
 */
export interface AzureCliCredentialOptions extends MultiTenantTokenCredentialOptions {
  /**
   * Allows specifying a tenant ID
   */
  tenantId?: string;
  /**
   * Timeout configurable for making token requests, provided in milliseconds
   */
  processTimeoutInMs?: number;
}
