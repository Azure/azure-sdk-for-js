// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
   * Process timeout configurable for making token requests, provided in milliseconds
   */
  processTimeoutInMs?: number;
}
