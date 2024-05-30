// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Optional parameters for the {@link AzurePipelinesCredential} class.
 */
export interface AzurePipelinesCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    CredentialPersistenceOptions,
    AuthorityValidationOptions {
  /**
   * tenantId associated with the service connection
   */
  tenantId?: string;
  /**
   * clientId associated with the service connection
   */
  clientId?: string;
  /**
   * id for the service connection, as found in the service connection's querystring's resourceId key
   */
  serviceConnectionId?: string;
}
