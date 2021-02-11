// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";

/**
 * Defines options for the SubjectNameAndIssuerCredential class.
 */
export interface ClientCertificateCredentialOptions extends TokenCredentialOptions {
  /**
   * Option to include x5c header for SubjectName and Issuer name authorization.
   * Set this option to send base64 encoded public certificate in the client assertion header as an x5c claim
   */
  sendCertificateChain?: boolean;
}
