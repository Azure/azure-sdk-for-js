// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "../authorityValidationOptions";
import { TokenCredentialOptions } from "../tokenCredentialOptions";

/**
 * Optional parameters for the {@link ClientAssertionCredential} class.
 */
export interface ClientAssertionCredentialOptions
  extends TokenCredentialOptions,
    AuthorityValidationOptions {
}
