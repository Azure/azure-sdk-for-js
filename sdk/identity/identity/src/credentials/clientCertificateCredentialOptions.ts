// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { MsalCredentialOptions } from "./msalCredentialOptions";

/**
 * Optional parameters for the {@link ClientCertificateCredential} class.
 */
export interface ClientCertificateCredentialOptions
  extends TokenCredentialOptions,
    MsalCredentialOptions {
  /**
   * Option to include x5c header for SubjectName and Issuer name authorization.
   * Set this option to send base64 encoded public certificate in the client assertion header as an x5c claim
   */
  sendCertificateChain?: boolean;
}
