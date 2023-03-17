// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Options for the {@link AuthorizationCodeCredential}
 */
export interface AuthorizationCodeCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {}
