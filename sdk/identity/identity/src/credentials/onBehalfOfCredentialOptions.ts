// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

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
   * The user assertion for the On-Behalf-Of flow.
   */
  userAssertionToken: string;
  /**
   * Option to include x5c header for SubjectName and Issuer name authorization.
   * Set this option to send base64 encoded public certificate in the client assertion header as an x5c claim
   */
  sendCertificateChain?: boolean;
}

/**
 * Optional parameters for the {@link OnBehalfOfCredential} class.
 */
export type OnBehalfOfCredentialOptions = (
  | OnBehalfOfCredentialSecretOptions
  | OnBehalfOfCredentialCertificateOptions
) &
  MultiTenantTokenCredentialOptions &
  CredentialPersistenceOptions &
  AuthorityValidationOptions;
