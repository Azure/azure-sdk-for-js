// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

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
  /**
   * Subscription is the name or ID of a subscription. Set this to acquire tokens for an account other
   * than the Azure CLI's current account.
   */
  subscription?: string;
}
