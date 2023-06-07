// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Enables authentication to Azure Active Directory depending on the available environment variables.
 * Defines options for the EnvironmentCredential class.
 */
export interface EnvironmentCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {}
