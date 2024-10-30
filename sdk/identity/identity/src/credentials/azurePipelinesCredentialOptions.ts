// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorityValidationOptions } from "./authorityValidationOptions";
import type { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Optional parameters for the {@link AzurePipelinesCredential} class.
 */
export interface AzurePipelinesCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    CredentialPersistenceOptions,
    AuthorityValidationOptions {}
