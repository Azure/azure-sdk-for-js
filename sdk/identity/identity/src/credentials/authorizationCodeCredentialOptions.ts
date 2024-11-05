// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorityValidationOptions } from "./authorityValidationOptions";
import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Options for the {@link AuthorizationCodeCredential}
 */
export interface AuthorizationCodeCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {}
