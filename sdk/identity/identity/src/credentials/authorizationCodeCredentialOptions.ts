// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "../authorityValidationOptions";
import { TokenCredentialOptions } from "../tokenCredentialOptions";

/**
 * Optional parameters for the {@link AuthorizationCodeCredential} class.
 */
export interface AuthorizationCodeCredentialOptions
  extends TokenCredentialOptions,
    AuthorityValidationOptions {
}
