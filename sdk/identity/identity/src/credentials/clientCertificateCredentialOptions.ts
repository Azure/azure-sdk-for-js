// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AuthorityValidationOptions } from "./authorityValidationOptions";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions";

/**
 * Optional parameters for the {@link ClientCertificateCredential} class.
 */
export interface ClientCertificateCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    CredentialPersistenceOptions,
    AuthorityValidationOptions {
  /**
   * Option to include x5c header for SubjectName and Issuer name authorization.
   * Set this option to send base64 encoded public certificate in the client assertion header as an x5c claim
   */
  sendCertificateChain?: boolean;
  // TODO: Export again once we're ready to release this feature.
  // /**
  //  * Specifies a regional authority. Please refer to the {@link RegionalAuthority} type for the accepted values.
  //  * If {@link RegionalAuthority.AutoDiscoverRegion} is specified, we will try to discover the regional authority endpoint.
  //  * If the property is not specified, the credential uses the global authority endpoint.
  //  */
  // regionalAuthority?: string;
}
