// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import { ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS } from "../Declarations/Constants.js";

/**
 * Callback invoked with the latest settings whenever OneSettings reports a configuration change.
 * The settings argument is read-only: callbacks must not mutate it, since the same object is
 * shared across all callbacks and the manager's cached payload.
 *
 * Callbacks may be synchronous or async; a rejected promise is caught and logged like a thrown error.
 * @internal
 */
export type ConfigurationChangeCallback = (
  settings: Readonly<Record<string, string>>,
) => void | Promise<void>;

/**
 * Singleton that owns the OneSettings control-plane state and change-detection logic.
 *
 * It holds the list of registered change callbacks and, once change detection is implemented,
 * the last ETag and cached settings. Use {@link ConfigurationManager.getInstance} rather than
 * constructing this directly.
 * @internal
 */
export class ConfigurationManager {
  private static instance: ConfigurationManager | undefined;
  private callbacks: ConfigurationChangeCallback[] = [];
  private initialized = false;

  /**
   * Use {@link ConfigurationManager.getInstance} to obtain the singleton instance.
   */
  private constructor() {}

  /**
   * Return the process-wide singleton, creating it on first use.
   */
  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  /**
   * Start the OneSettings polling worker. Idempotent: safe to call from every exporter
   * constructor, since only the first call has any effect.
   */
  public initialize(): void {
    if (this.initialized) {
      return;
    }
    // TODO(onesettings): create and start the ConfigurationWorker that periodically calls
    // `getConfigurationAndRefreshInterval` and reschedules itself using the returned interval.
    this.initialized = true;
  }

  /**
   * Register a callback to be invoked whenever OneSettings reports a configuration change.
   */
  public registerCallback(callback: ConfigurationChangeCallback): void {
    this.callbacks.push(callback);
  }

  /**
   * Invoke every registered callback with the latest settings, isolating callback failures.
   * Both synchronous throws and rejected promises from async callbacks are caught and logged.
   */
  protected notifyCallbacks(settings: Readonly<Record<string, string>>): void {
    for (const callback of [...this.callbacks]) {
      try {
        // `try/catch` handles synchronous throws; `.catch` handles rejections from async callbacks.
        Promise.resolve(callback(settings)).catch((error) => {
          diag.debug("OneSettings configuration callback failed:", error);
        });
      } catch (error) {
        diag.debug("OneSettings configuration callback failed:", error);
      }
    }
  }

  /**
   * Poll OneSettings once (change detection + optional config fetch), update the cached state,
   * notify callbacks on change, and return the next refresh interval in milliseconds.
   */
  public async getConfigurationAndRefreshInterval(): Promise<number> {
    // TODO(onesettings): implement change detection against the CHANGE (e2) endpoint, fetch the
    // CONFIG (e1) payload on a new ETag, update the cached ETag/settings/refresh interval, call
    // `notifyCallbacks`, and apply exponential backoff on transient errors.
    return ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS;
  }
}
