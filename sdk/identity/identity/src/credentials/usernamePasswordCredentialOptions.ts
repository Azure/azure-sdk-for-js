// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorityValidationOptions } from "./authorityValidationOptions";
import type { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Defines options for the {@link UsernamePasswordCredential} class.
 */
export interface UsernamePasswordCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    CredentialPersistenceOptions,
    AuthorityValidationOptions {}
