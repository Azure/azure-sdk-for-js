// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";
import { WorkloadIdentityCredential } from "./workloadIdentityCredential";

/**
 * Options for the {@link WorkloadIdentityCredential}
 */
export interface WorkloadIdentityCredentialOptions
  extends WorkloadIdentityDefaultCredentialOptions {
  /**
   * ID of the application's Azure Active Directory tenant. Also called its directory ID.
   */
  tenantId: string;
  /**
   * The client ID of an Azure AD app registration.
   */
  clientId: string;
  /**
   * The path to a file containing a Kubernetes service account token that authenticates the identity.
   */
  federatedTokenFilePath: string;
}

/**
 * @internal
 * @hidden
 */
export interface WorkloadIdentityDefaultCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {}
