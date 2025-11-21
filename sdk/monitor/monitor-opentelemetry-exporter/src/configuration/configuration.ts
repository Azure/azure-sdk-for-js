// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import {
  ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS,
  ONE_SETTINGS_NODE_KEY,
  ONE_SETTINGS_CHANGE_URL,
} from "../Declarations/Constants.js";
import { ConfigurationWorker } from "./worker.js";
import { makeOneSettingsRequest, OneSettingsResponse } from "./utils.js";

type QueryParameters = Record<string, string>;

/**
 * Singleton manager responsible for orchestrating OneSettings configuration state.
 */
export class ConfigurationManager {
  private static instance: ConfigurationManager | undefined;
  // Handles periodic background refreshes.
  private configurationWorker: ConfigurationWorker | undefined;
  // Latest ETag returned by OneSettings.
  private etag: string | undefined;
  // Seconds until the next refresh cycle.
  private refreshInterval = ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS;
  // Cached configuration values keyed by setting name.
  private readonly settingsCache: Record<string, unknown> = {};
  // Tracks the highest CHANGE_VERSION observed.
  private versionCache = 0;

  private constructor() {
    this.initializeWorker();
  }

  /**
   * Acquire the singleton {@link ConfigurationManager} instance.
   */
  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  /**
   * Fetch the latest configuration change information and return the next refresh interval.
   */
  public async getConfigurationAndRefreshInterval(query: QueryParameters): Promise<number> {
    const headers: Record<string, string> = {};
    // Reuse the ETag to leverage 304 Not Modified responses.
    if (this.etag) {
      headers["If-None-Match"] = this.etag;
    }
    // Provide the current cadence so the service can adjust if necessary.
    if (this.refreshInterval) {
      headers["x-ms-onesetinterval"] = String(this.refreshInterval);
    }

    const response = await makeOneSettingsRequest(ONE_SETTINGS_CHANGE_URL, query, headers);
    this.applyResponse(response);
    return this.refreshInterval;
  }

  /**
   * Retrieve a shallow copy of cached configuration settings.
   */
  public getCache(): Record<string, unknown> {
    return { ...this.settingsCache };
  }

  /**
   * Shutdown the background worker and reset the singleton.
   */
  public shutdown(): void {
    this.configurationWorker?.shutdown();
    this.configurationWorker = undefined;
    ConfigurationManager.instance = undefined;
  }

  private initializeWorker(): void {
    // Worker repeatedly calls back into the manager to keep settings up to date.
    const refresh = async (): Promise<number> => {
      const targeting: QueryParameters = { namespaces: ONE_SETTINGS_NODE_KEY };
      return this.getConfigurationAndRefreshInterval(targeting);
    };

    this.configurationWorker = new ConfigurationWorker(refresh, this.refreshInterval);
  }

  private applyResponse(response: OneSettingsResponse): void {
    // Update cached identifiers for subsequent calls.
    if (response.etag) {
      this.etag = response.etag;
    }

    if (response.refreshInterval && response.refreshInterval > 0) {
      this.refreshInterval = response.refreshInterval;
    } else {
      this.refreshInterval = ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS;
    }

    // Merge newly provided configuration values into the cache.
    if (Object.keys(response.settings).length > 0) {
      for (const [key, value] of Object.entries(response.settings)) {
        this.settingsCache[key] = value;
      }
    }

    // Track version monotonicity so callers know whether config advanced.
    if (typeof response.version === "number") {
      if (response.version > this.versionCache) {
        this.versionCache = response.version;
        // TODO: Fetch configuration payload when API support is available.
      } else if (response.version < this.versionCache) {
        diag.warn(
          "Latest CHANGE_VERSION is less than the current stored version, no configurations updated.",
        );
      }
    }
  }
}

/**
 * Helper for callers that only need the refresh-interval update.
 */
export async function updateConfigurationAndGetRefreshInterval(): Promise<number> {
  const targeting: QueryParameters = { namespaces: ONE_SETTINGS_NODE_KEY };
  return ConfigurationManager.getInstance().getConfigurationAndRefreshInterval(targeting);
}
