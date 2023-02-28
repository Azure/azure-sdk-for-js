// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";
import { WorkloadIdentityCredential } from "./workloadIdentityCredential";

/**
 * Options for the {@link WorkloadIdentityCredential}
 */
export interface WorkloadIdentityDefaultAzureCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {
}
