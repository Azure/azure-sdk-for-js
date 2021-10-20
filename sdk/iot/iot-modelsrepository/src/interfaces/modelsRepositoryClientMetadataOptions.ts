// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Options that configure how the client uses models repository metadata
 */
export interface ModelsRepositoryClientMetadataOptions {
  /**
   * The timespan (in minutes) at which repository metadata is considered stale.
   */
  expirationInMs?: number;
  /**
   * Indicates if models repository metadata processing should be enabled for the client.
   */
  enabled?: boolean;
}
