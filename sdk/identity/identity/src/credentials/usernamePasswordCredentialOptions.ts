// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../tokenCredentialOptions";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";

/**
 * Defines options for the {@link UsernamePasswordCredential} class.
 */
export interface UsernamePasswordCredentialOptions
  extends TokenCredentialOptions,
    CredentialPersistenceOptions {}
