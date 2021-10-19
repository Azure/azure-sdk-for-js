// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ModelsRepositoryClientMetadataOptions } from "./interfaces/modelsRepositoryClientMetadataOptions";
import {
  DEFAULT_CLIENT_METADATA_ENABLED,
  DEFAULT_CLIENT_METADATA_EXPIRATION
} from "./utils/constants";

/**
 * Class to support handling repository metadata expiration
 *
 * @internal
 */
export class MetadataScheduler {
  /**
   * The last time we fetched metadata.
   */
  private _lastFetchedMetadata: Date;
  /**
   * Switch that determines if we've initially fetched data or not.
   */
  private _initialFetch: boolean;
  /**
   * Timespan for when metadata should be considered stale.
   */
  private readonly _desiredElapsedTimeSpan: number;
  /**
   * Whether or not we need to check metadata.
   */
  private readonly _enabled: boolean;

  /**
   * Construct an instance of the metadata scheduler.
   * @param options - the Repository Client metadata options object to determine scheduler behavior.
   */
  constructor(options?: ModelsRepositoryClientMetadataOptions) {
    this._lastFetchedMetadata = new Date(0);
    this._initialFetch = true;
    this._desiredElapsedTimeSpan = options?.expirationInMinutes
      ? options.expirationInMinutes * 60 * 1000
      : DEFAULT_CLIENT_METADATA_EXPIRATION;
    this._enabled = options?.enabled ?? DEFAULT_CLIENT_METADATA_ENABLED;
  }

  /**
   * Determine whether metadata must be fetched again.
   * @returns - true if the metadata has not been fetched or has expired, false if not enabled or not expired.
   */
  public hasExpired(): boolean {
    if (!this._enabled) {
      return false;
    }
    if (this._initialFetch) {
      return true;
    }
    return Date.now() - this._lastFetchedMetadata.getTime() >= this._desiredElapsedTimeSpan;
  }

  /**
   * Reset the metadata expiration timer.
   */
  public reset(): void {
    if (this._initialFetch) {
      this._initialFetch = false;
    }
    this._lastFetchedMetadata = new Date();
  }
}
