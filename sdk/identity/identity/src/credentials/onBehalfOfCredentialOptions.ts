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
   * For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens.
   * Add the wildcard value "*" to allow the credential to acquire tokens for any tenant the application is installed.
   */
  additionallyAllowedTenants?: string[];  
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
  /**
   * For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens.
   * Add the wildcard value "*" to allow the credential to acquire tokens for any tenant the application is installed.
   */
  additionallyAllowedTenants?: string[];  
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
