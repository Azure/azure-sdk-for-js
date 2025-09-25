// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions.js";

/**
 * Provides options to configure the Visual Studio Code credential.
 */
export interface VisualStudioCodeCredentialOptions extends MultiTenantTokenCredentialOptions {
  /**
   * Optionally pass in a Tenant ID to be used as part of the credential
   */
  tenantId?: string;
}
