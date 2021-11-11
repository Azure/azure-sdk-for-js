// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../tokenCredentialOptions";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";

/**
 * Defines the parameters to authenticate the {@link OnBehalfOfCredential} with a secret.
 */
export interface OnBehalfOfCredentialSecretOptions {
  /**
   * The Azure Active Directory tenant (directory) ID.
   */
  tenantId: string;
  /**
   * The client (application) ID of an App Registration in the tenant.
   */
  clientId: string;
  /**
   * A client secret that was generated for the App Registration.
   */
  clientSecret: string;
  /**
   * The user assertion for the On-Behalf-Of flow.
   */
  userAssertionToken: string;
  /**
   * The path to a PEM-encoded certificate should not be provided when the secret options are provided.
   */
  certificatePath?: never;
  /**
   * Option to include x5c header should not be provided when the secret options are provided.
   */
  sendCertificateChain?: never;
}

/**
 * Defines the parameters to authenticate the {@link OnBehalfOfCredential} with a certificate.
 */
export interface OnBehalfOfCredentialCertificateOptions {
  /**
   * The Azure Active Directory tenant (directory) ID.
   */
  tenantId: string;
  /**
   * The client (application) ID of an App Registration in the tenant.
   */
  clientId: string;
  /**
   * The path to a PEM-encoded public/private key certificate on the filesystem.
   */
  certificatePath: string;
  /**
   * Option to include x5c header for SubjectName and Issuer name authorization.
   * Set this option to send base64 encoded public certificate in the client assertion header as an x5c claim
   */
  sendCertificateChain?: boolean;
  /**
   * The user assertion for the On-Behalf-Of flow.
   */
  userAssertionToken: string;
  /**
   * Client secret should not be provided when certificate options are provided.
   */
  clientSecret?: never;
}

/**
 * Optional parameters for the {@link OnBehalfOfCredential} class.
 */
export type OnBehalfOfCredentialOptions = (
  | OnBehalfOfCredentialSecretOptions
  | OnBehalfOfCredentialCertificateOptions
) &
  TokenCredentialOptions &
  CredentialPersistenceOptions;
