// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";

/**
 * Optional parameters for the {@link OnBehalfOfCredential} class.
 */
export interface OnBehalfOfCredentialOptions
  extends TokenCredentialOptions,
    CredentialPersistenceOptions {
  /**
   * Option to include x5c header for SubjectName and Issuer name authorization.
   * Set this option to send base64 encoded public certificate in the client assertion header as an x5c claim
   */
  sendCertificateChain?: boolean;
}
