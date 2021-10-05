// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";

/**
 * Optional parameters for the {@link OnBehalfOfCredential} class.
 */
export interface OnBehalfOfCredentialOptions
  extends TokenCredentialOptions,
    CredentialPersistenceOptions {}
