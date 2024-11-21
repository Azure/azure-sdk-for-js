// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions.js";

/**
 * Options for the {@link AzureDeveloperCliCredential}
 */
export interface AzureDeveloperCliCredentialOptions extends MultiTenantTokenCredentialOptions {
  /**
   * Allows specifying a tenant ID
   */
  tenantId?: string;
  /**
   * Process timeout configurable for making token requests, provided in milliseconds
   */
  processTimeoutInMs?: number;
}
