// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { MsalCredentialOptions } from "./msalCredentialOptions";

/**
 * Optional parameters for the {@link ClientSecretCredential} class.
 */
export interface ClientSecretCredentialOptions
  extends TokenCredentialOptions,
    MsalCredentialOptions {}
