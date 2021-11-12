// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { TokenCredentialOptions } from "../tokenCredentialOptions";

/**
 * Defines options for the {@link UsernamePasswordCredential} class.
 */
export interface UsernamePasswordCredentialOptions
  extends TokenCredentialOptions,
    CredentialPersistenceOptions {}
