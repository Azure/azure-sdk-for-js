// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MultiTenantTokenCredentialOptions } from "../../../identity-common/src/credentials/multiTenantTokenCredentialOptions";

/**
 * Enables authentication to Azure Active Directory depending on the available environment variables.
 * Defines options for the EnvironmentCredential class.
 */
export interface EnvironmentCredentialOptions extends MultiTenantTokenCredentialOptions {}
