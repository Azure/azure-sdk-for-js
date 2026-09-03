// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorityValidationOptions } from "./authorityValidationOptions.js";
import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions.js";

/**
 * Options for the {@link AuthorizationCodeCredential}
 */
export interface AuthorizationCodeCredentialOptions
  extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {}
