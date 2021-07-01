// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";

/**
 * Options for the {@link AzurePowerShellCredential}
 */
export interface AzurePowerShellCredentialOptions extends TokenCredentialOptions {
  /**
   * Allows specifying a tenant ID
   */
  tenantId?: string;
}
