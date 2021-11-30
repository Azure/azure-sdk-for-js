// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../tokenCredentialOptions";

/**
 * Options for the {@link AzureCliCredential}
 */
export interface AzureCliCredentialOptions extends TokenCredentialOptions {
  /**
   * Allows specifying a tenant ID
   */
  tenantId?: string;
}
