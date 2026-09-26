// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorityValidationOptions } from "./authorityValidationOptions.js";
import type { CredentialPersistenceOptions } from "./credentialPersistenceOptions.js";
import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions.js";

/**
 * Optional parameters for the {@link GitHubActionsCredential} class.
 */
export interface GitHubActionsCredentialOptions
  extends
    MultiTenantTokenCredentialOptions,
    CredentialPersistenceOptions,
    AuthorityValidationOptions {}
