// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorityValidationOptions } from "./authorityValidationOptions.js";
import type { CredentialPersistenceOptions } from "./credentialPersistenceOptions.js";
import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions.js";

/**
 * Optional parameters for the {@link ClientSecretCredential} class.
 */
export interface ClientSecretCredentialOptions
  extends
    MultiTenantTokenCredentialOptions,
    CredentialPersistenceOptions,
    AuthorityValidationOptions {
  // TODO: Export again once we're ready to release this feature.
  // /**
  //  * Specifies a regional authority. Please refer to the {@link RegionalAuthority} type for the accepted values.
  //  * If {@link RegionalAuthority.AutoDiscoverRegion} is specified, we will try to discover the regional authority endpoint.
  //  * If the property is not specified, the credential uses the global authority endpoint.
  //  */
  // regionalAuthority?: string;
}
