// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorityValidationOptions } from "./authorityValidationOptions";
import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Options for the {@link WorkloadIdentityCredential}
 */
export interface WorkloadIdentityCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {
  /**
   * ID of the application's Microsoft Entra tenant. Also called its directory ID.
   */
  tenantId?: string;
  /**
   * The client ID of a Microsoft Entra app registration.
   */
  clientId?: string;
  /**
   * The path to a file containing a Kubernetes service account token that authenticates the identity.
   */
  tokenFilePath?: string;
}
