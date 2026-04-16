// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorityValidationOptions } from "./authorityValidationOptions.js";
import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions.js";

/**
 * Enables authentication to Microsoft Entra ID depending on the available environment variables.
 * Defines options for the EnvironmentCredential class.
 */
export interface EnvironmentCredentialOptions
  extends MultiTenantTokenCredentialOptions, AuthorityValidationOptions {}
