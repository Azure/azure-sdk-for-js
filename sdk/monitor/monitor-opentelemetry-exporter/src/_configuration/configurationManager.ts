// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import {
  ONE_SETTINGS_BACKOFF_BASE_MS,
  ONE_SETTINGS_CHANGE_URL,
  ONE_SETTINGS_CONFIG_URL,
  ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
  ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS,
  ONE_SETTINGS_NODEJS_TARGETING,
  ONE_SETTINGS_RETRYABLE_STATUS_CODES,
} from "../Declarations/Constants.js";
import type { OneSettingsResponse } from "./utils.js";
import { makeOneSettingsRequest } from "./utils.js";
import { ConfigurationWorker } from "./configurationWorker.js";
import type { ConfigurationProfileValues } from "./configurationProfile.js";
import { ConfigurationProfile } from "./configurationProfile.js";

interface ConfigurationState {
  etag?: string;
  refreshIntervalMs: number;
  settings: Readonly<Record<string, unknown>>;
}

function createInitialState(): ConfigurationState {
  return {
    refreshIntervalMs: ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
    settings: {},
  };
}

/**
 * Callback invoked with the latest settings whenever OneSettings reports a configuration change.
 * The settings argument is read-only: callbacks must not mutate it, since the same object is
 * shared across all callbacks and the manager's cached payload.
 *
 * Callbacks may be synchronous or async; a rejected promise is caught and logged like a thrown error.
 * @internal
 */
export type ConfigurationChangeCallback = (
  settings: Readonly<Record<string, unknown>>,
) => void | Promise<void>;

/**
 * Singleton that owns the OneSettings control-plane state and change-detection logic.
 *
 * It holds the list of registered change callbacks, the last ETag, and cached settings. Use
 * {@link ConfigurationManager.getInstance} rather than constructing this directly.
 * @internal
 */
export class ConfigurationManager {
  private static instance: ConfigurationManager | undefined;
  private callbacks: ConfigurationChangeCallback[] = [];
  private worker: ConfigurationWorker | undefined;
  private state = createInitialState();
  private backoffAttempts = 0;

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
   *
   * @param profile - Running SDK attributes contributed by the caller. Existing profile fields
   * remain unchanged.
   */
  public initialize(profile: Partial<ConfigurationProfileValues> = {}): void {
    ConfigurationProfile.getInstance().fill(profile);
    if (this.worker) {
      return;
    }
    this.worker = new ConfigurationWorker((abortSignal) =>
      this.getConfigurationAndRefreshInterval(abortSignal),
    );
  }

  /**
   * Stop OneSettings polling and release registered callbacks. Idempotent and safe to restart with
   * a later {@link initialize} call.
   */
  public shutdown(): void {
    this.worker?.shutdown();
    this.worker = undefined;
    this.callbacks = [];
  }

  /**
   * Register a callback to be invoked whenever OneSettings reports a configuration change.
   * If settings are already cached, they are replayed immediately to the new callback.
   */
  public registerCallback(callback: ConfigurationChangeCallback): void {
    this.callbacks.push(callback);
    if (Object.keys(this.state.settings).length > 0) {
      // A callback may register after the last configuration change, so replay the cache now rather
      // than leaving the consumer stale until another change occurs (which may never happen).
      this.invokeCallback(callback, this.state.settings);
    }
  }

  /**
   * Invoke every registered callback with the latest settings, isolating callback failures.
   * Both synchronous throws and rejected promises from async callbacks are caught and logged.
   */
  protected notifyCallbacks(settings: Readonly<Record<string, unknown>>): void {
    for (const callback of [...this.callbacks]) {
      this.invokeCallback(callback, settings);
    }
  }

  /**
   * Poll OneSettings once (change detection + optional config fetch), update the cached state,
   * notify callbacks on change, and return the next refresh interval in milliseconds.
   */
  public async getConfigurationAndRefreshInterval(abortSignal?: AbortSignal): Promise<number> {
    const headers: Record<string, string> = {
      "x-ms-onesetinterval": String(Math.floor(this.state.refreshIntervalMs / (60 * 1000))),
    };
    if (this.state.etag) {
      headers["If-None-Match"] = this.state.etag;
    }

    const changeResponse = await makeOneSettingsRequest(
      ONE_SETTINGS_CHANGE_URL,
      ONE_SETTINGS_NODEJS_TARGETING,
      headers,
      abortSignal,
    );
    if (abortSignal?.aborted) {
      return this.state.refreshIntervalMs;
    }

    if (this.isTransientError(changeResponse)) {
      this.backoffAttempts += 1;
      const backoffIntervalMs = Math.min(
        ONE_SETTINGS_BACKOFF_BASE_MS * 2 ** (this.backoffAttempts - 1),
        ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS,
      );
      diag.debug(
        `OneSettings change detection failed transiently; retrying in ${backoffIntervalMs}ms`,
      );
      return backoffIntervalMs;
    }

    this.backoffAttempts = 0;

    if (changeResponse.statusCode === 304) {
      this.state = {
        ...this.state,
        etag: changeResponse.etag ?? this.state.etag,
        refreshIntervalMs: changeResponse.refreshIntervalMs,
      };
      return this.state.refreshIntervalMs;
    }

    if (changeResponse.statusCode !== 200) {
      diag.debug(
        `OneSettings change detection returned non-retryable status ${changeResponse.statusCode}`,
      );
      return ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS;
    }

    const configResponse = await makeOneSettingsRequest(
      ONE_SETTINGS_CONFIG_URL,
      ONE_SETTINGS_NODEJS_TARGETING,
      {},
      abortSignal,
    );
    if (abortSignal?.aborted) {
      return this.state.refreshIntervalMs;
    }
    if (configResponse.statusCode !== 200 || Object.keys(configResponse.settings).length === 0) {
      diag.debug(
        `OneSettings configuration fetch did not return settings (status ${configResponse.statusCode})`,
      );
      this.state = {
        ...this.state,
        refreshIntervalMs: changeResponse.refreshIntervalMs,
      };
      return this.state.refreshIntervalMs;
    }

    const settings = Object.freeze({ ...configResponse.settings });
    this.state = {
      etag: changeResponse.etag ?? this.state.etag,
      refreshIntervalMs: changeResponse.refreshIntervalMs,
      settings,
    };
    this.notifyCallbacks(settings);
    return this.state.refreshIntervalMs;
  }

  /**
   * Return a snapshot of the currently cached settings.
   */
  public getSettings(): Readonly<Record<string, unknown>> {
    return { ...this.state.settings };
  }

  /**
   * Reset cached state and callbacks. Intended for test isolation.
   */
  public reset(): void {
    this.shutdown();
    this.state = createInitialState();
    this.backoffAttempts = 0;
  }

  private isTransientError(response: OneSettingsResponse): boolean {
    return (
      response.hasException || ONE_SETTINGS_RETRYABLE_STATUS_CODES.includes(response.statusCode)
    );
  }

  private invokeCallback(
    callback: ConfigurationChangeCallback,
    settings: Readonly<Record<string, unknown>>,
  ): void {
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
