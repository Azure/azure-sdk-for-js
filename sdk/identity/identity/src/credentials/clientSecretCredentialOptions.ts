// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { RegionalAuthority } from "../regionalAuthority";

/**
 * Optional parameters for the {@link ClientSecretCredential} class.
 */
export interface ClientSecretCredentialOptions extends TokenCredentialOptions {
  /**
   * Specifies a regional authority, or "autoDiscoverRegion" to auto-detect the region,
   * or uses a non-regional endpoint if this property is not specified.
   */
  regionalAuthority?: RegionalAuthority;
}
