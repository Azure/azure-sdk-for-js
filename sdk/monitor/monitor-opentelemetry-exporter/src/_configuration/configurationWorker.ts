// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import {
  ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS,
  ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS,
} from "../Declarations/Constants.js";

const STARTUP_DELAY_MIN_MS = 5_000;
const STARTUP_DELAY_MAX_MS = 15_000;

/**
 * Runs OneSettings polls sequentially using a recursive timer.
 * @internal
 */
export class ConfigurationWorker {
  private timer: NodeJS.Timeout | undefined;
  private abortController: AbortController | undefined;
  private running = true;
  private refreshIntervalMs = ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_MS;

  public constructor(private readonly poll: (abortSignal: AbortSignal) => Promise<number>) {
    const startupDelayMs =
      STARTUP_DELAY_MIN_MS + Math.random() * (STARTUP_DELAY_MAX_MS - STARTUP_DELAY_MIN_MS);
    this.schedule(startupDelayMs);
  }

  /**
   * Stop the worker and cancel any pending startup or refresh timer.
   */
  public shutdown(): void {
    if (!this.running) {
      return;
    }

    this.running = false;
    this.abortController?.abort();
    this.abortController = undefined;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  private schedule(delayMs: number): void {
    this.timer = setTimeout(() => {
      this.timer = undefined;
      void this.pollAndReschedule();
    }, delayMs);
    this.timer.unref();
  }

  private async pollAndReschedule(): Promise<void> {
    if (!this.running) {
      return;
    }

    const abortController = new AbortController();
    this.abortController = abortController;
    try {
      const refreshIntervalMs = await this.poll(abortController.signal);
      if (Number.isFinite(refreshIntervalMs) && refreshIntervalMs > 0) {
        this.refreshIntervalMs = Math.min(refreshIntervalMs, ONE_SETTINGS_MAX_REFRESH_INTERVAL_MS);
      } else {
        diag.debug(`OneSettings returned an invalid refresh interval: ${refreshIntervalMs}`);
      }
    } catch (error) {
      diag.debug("OneSettings configuration refresh failed:", error);
    } finally {
      if (this.abortController === abortController) {
        this.abortController = undefined;
      }
    }

    if (this.running) {
      this.schedule(this.refreshIntervalMs);
    }
  }
}
