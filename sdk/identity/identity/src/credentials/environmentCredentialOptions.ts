// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Enables authentication to Microsoft Entra ID depending on the available environment variables.
 * Defines options for the EnvironmentCredential class.
 */
export interface EnvironmentCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    AuthorityValidationOptions {}
