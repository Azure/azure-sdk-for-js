// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Options for the {@link ClientAssertionCredential}
 */
export interface ClientAssertionCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {}
