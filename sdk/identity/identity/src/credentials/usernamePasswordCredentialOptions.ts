// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Defines options for the {@link UsernamePasswordCredential} class.
 */
export interface UsernamePasswordCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    CredentialPersistenceOptions,
    AuthorityValidationOptions {}
