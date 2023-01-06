// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { MultiTenantTokenCredentialOptions } from "@azure/identity-common";

/**
 * Defines options for the {@link UsernamePasswordCredential} class.
 */
export interface UsernamePasswordCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    CredentialPersistenceOptions {}
