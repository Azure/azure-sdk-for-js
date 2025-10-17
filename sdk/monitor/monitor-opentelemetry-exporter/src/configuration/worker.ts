// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import { ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS } from "../Declarations/Constants.js";

type RefreshCallback = () => Promise<number>;

export class ConfigurationWorker {
  // Drives periodic refresh operations using the provided callback.
  private readonly defaultRefreshInterval = ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS;
  private readonly refreshCallback: RefreshCallback;
  private refreshInterval: number;
  private stopped = false;
  private delayTimer: ReturnType<typeof setTimeout> | undefined;
  private delayResolve: (() => void) | undefined;

  // Start the loop immediately with either the provided interval or the default.
  constructor(refreshCallback: RefreshCallback, initialRefreshInterval?: number) {
    this.refreshCallback = refreshCallback;
    this.refreshInterval = this.normalizeInterval(initialRefreshInterval);
    void this.run();
  }

  // Stop future refreshes and wake any pending delay so shutdown completes promptly.
  public shutdown(): void {
    if (this.stopped) {
      return;
    }

    this.stopped = true;
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = undefined;
    }
    if (this.delayResolve) {
      this.delayResolve();
      this.delayResolve = undefined;
    }
  }

  public getRefreshInterval(): number {
    return this.refreshInterval;
  }

  // Continuously fetch configuration until shutdown is signalled.
  private async run(): Promise<void> {
    const startupDelaySeconds = Math.random() * 15;
    if (startupDelaySeconds > 0) {
      await this.delay(startupDelaySeconds);
    }

    while (!this.stopped) {
      try {
        const interval = await this.refreshCallback();
        this.refreshInterval = this.normalizeInterval(interval);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        diag.warn(`Configuration refresh failed: ${message}`);
        this.refreshInterval = this.defaultRefreshInterval;
      }

      if (this.stopped) {
        break;
      }

      await this.delay(this.refreshInterval);
    }
  }

  // Ensure intervals are positive numbers, otherwise fall back to default.
  private normalizeInterval(interval?: number): number {
    return Number.isFinite(interval) && interval && interval > 0
      ? interval
      : this.defaultRefreshInterval;
  }

  // Sleep for the requested interval but remain interruptible via shutdown().
  private delay(seconds: number): Promise<void> {
    return new Promise((resolve) => {
      this.delayResolve = resolve;
      this.delayTimer = setTimeout(
        () => {
          this.delayTimer = undefined;
          this.delayResolve = undefined;
          resolve();
        },
        Math.max(0, seconds) * 1000,
      );
    });
  }
}
