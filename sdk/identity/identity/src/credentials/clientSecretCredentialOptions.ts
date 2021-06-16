// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";

/**
 * Optional parameters for the {@link ClientSecretCredential} class.
 */
export interface ClientSecretCredentialOptions extends TokenCredentialOptions {
  /**
   * Specifies a regional authority. Please refer to the {@link RegionalAuthority} type for the accepted values.
   * If {@link RegionalAuthority.AutoDiscoverRegion} is specified, we will try to discover the regional authority endpoint.
   * If the property is not specified, uses a non-regional authority endpoint.
   */
  regionalAuthority?: string;
}
