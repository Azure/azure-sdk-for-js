// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IdentityClientOptions } from '../client/identityClient';

/**
 * Provides options to configure how the Identity library makes authentication
 * requests to Azure Active Directory as well as options specific to this credential
 * type.
 */
export interface DeviceCodeCredentialOptions extends IdentityClientOptions {
  /**
   * The Azure Active Directory tenant (directory) ID or name.
   */ 
  tenantId: string;
}
