// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LongIntervalStatsbeatMetrics } from "./longIntervalStatsbeatMetrics.js";
import { NetworkStatsbeatMetrics } from "./networkStatsbeatMetrics.js";
import type { StatsbeatOptions } from "./types.js";

/**
 * Coordinates the process-wide internal Statsbeat providers.
 * @internal
 */
export class StatsbeatManager {
  private static instance: StatsbeatManager | undefined;
  private options: StatsbeatOptions | undefined;
  private networkMetrics: NetworkStatsbeatMetrics | undefined;
  private longIntervalMetrics: LongIntervalStatsbeatMetrics | undefined;
  private shutdownPromise: Promise<void> | undefined;
  private shouldBeRunning = false;

  private constructor() {}

  public static getInstance(): StatsbeatManager {
    if (!StatsbeatManager.instance) {
      StatsbeatManager.instance = new StatsbeatManager();
    }
    return StatsbeatManager.instance;
  }

  public initialize(options?: StatsbeatOptions): void {
    this.shouldBeRunning = true;
    if (this.networkMetrics && this.longIntervalMetrics) {
      return;
    }

    if (options) {
      this.options = { ...options };
    }
    if (!this.options) {
      return;
    }
    if (this.shutdownPromise) {
      return;
    }

    this.start();
  }

  public shutdown(): Promise<void> {
    this.shouldBeRunning = false;
    if (this.shutdownPromise) {
      return this.shutdownPromise;
    }

    const networkMetrics = this.networkMetrics;
    const longIntervalMetrics = this.longIntervalMetrics;
    this.networkMetrics = undefined;
    this.longIntervalMetrics = undefined;

    const shutdownPromise = this.shutdownProviders(networkMetrics, longIntervalMetrics)
      .then(() => {
        if (this.shouldBeRunning) {
          this.start();
        }
        return undefined;
      })
      .finally(() => {
        if (this.shutdownPromise === shutdownPromise) {
          this.shutdownPromise = undefined;
        }
      });
    this.shutdownPromise = shutdownPromise;
    return shutdownPromise;
  }

  public countSuccess(duration: number): void {
    this.networkMetrics?.countSuccess(duration);
  }

  public countFailure(duration: number, statusCode: number): void {
    this.networkMetrics?.countFailure(duration, statusCode);
  }

  public countRetry(statusCode: number): void {
    this.networkMetrics?.countRetry(statusCode);
  }

  public countThrottle(statusCode: number): void {
    this.networkMetrics?.countThrottle(statusCode);
  }

  public countException(exceptionType: Error): void {
    this.networkMetrics?.countException(exceptionType);
  }

  public countReadFailure(): void {
    this.networkMetrics?.countReadFailure();
  }

  public countWriteFailure(): void {
    this.networkMetrics?.countWriteFailure();
  }

  /** @internal */
  public get networkStatsbeatMetrics(): NetworkStatsbeatMetrics | undefined {
    return this.networkMetrics;
  }

  /** @internal */
  public get longIntervalStatsbeatMetrics(): LongIntervalStatsbeatMetrics | undefined {
    return this.longIntervalMetrics;
  }

  private start(): void {
    if (!this.options) {
      return;
    }
    this.networkMetrics = NetworkStatsbeatMetrics.getInstance(this.options);
    this.longIntervalMetrics = LongIntervalStatsbeatMetrics.getInstance(this.options);
  }

  private async shutdownProviders(
    networkMetrics: NetworkStatsbeatMetrics | undefined,
    longIntervalMetrics: LongIntervalStatsbeatMetrics | undefined,
  ): Promise<void> {
    const results = await Promise.allSettled([
      networkMetrics?.shutdown(),
      longIntervalMetrics?.shutdown(),
    ]);
    const failure = results.find(
      (result): result is PromiseRejectedResult => result.status === "rejected",
    );
    if (failure) {
      throw failure.reason;
    }
  }
}
