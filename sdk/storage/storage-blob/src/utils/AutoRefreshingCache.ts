// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import { createAbortablePromise } from "@azure/core-util";

/**
 * How long a single acquisition may run before the cache gives up on it and keeps serving the
 * current value, if there is still one.
 */
export const ACQUIRE_TIMEOUT_MS = 30 * 1000;

/**
 * A cached value that knows when it dies and when it would rather be replaced.
 */
export interface ExpiringValue {
  /** When the value stops being usable and callers must block for a new one. */
  readonly expiresOnTimestamp: number;
  /** When the value should start being refreshed in the background, while still being served. */
  readonly refreshAfterTimestamp: number;
}

/**
 * Acquires a fresh value. Rejects if one could not be obtained.
 */
export type Acquire<T> = (abortSignal?: AbortSignalLike) => Promise<T>;

/**
 * A cache for a single expiring value that refreshes itself proactively in the background.
 *
 * Only one acquisition runs at a time; concurrent callers await the same promise rather than
 * issuing duplicate requests.
 */
export class AutoRefreshingCache<T extends ExpiringValue> {
  private current: T | undefined;
  private inFlight: Promise<T> | undefined;
  private backgroundRefresh: Promise<void> | undefined;

  constructor(
    private readonly acquire: Acquire<T>,
    private readonly acquireTimeoutMs: number = ACQUIRE_TIMEOUT_MS,
  ) {}

  /**
   * Returns the cached value, acquiring or refreshing it as needed. Callers block only when
   * there is no usable value; once past `refreshAfterTimestamp` the current value is returned
   * immediately and a refresh runs in the background.
   */
  async get(abortSignal?: AbortSignalLike): Promise<T> {
    const current = this.current;
    const now = Date.now();

    if (current && now < current.expiresOnTimestamp) {
      if (now >= current.refreshAfterTimestamp) {
        this.startBackgroundRefresh(current);
      }
      return current;
    }

    const shared = this.acquireShared();
    if (!abortSignal) {
      return shared;
    }

    // Each caller races the shared acquisition against its own signal, so one caller
    // cancelling never fails the others.
    return createAbortablePromise<T>(
      (resolve, reject) => {
        void shared.then(resolve).catch(reject);
      },
      { abortSignal },
    );
  }

  /**
   * Drops the cached value if `predicate` accepts it. Callers use this to avoid clobbering a
   * newer value that a concurrent refresh already installed.
   */
  invalidateIf(predicate: (current: T) => boolean): void {
    const current = this.current;
    if (current && predicate(current)) {
      this.current = undefined;
    }
  }

  private acquireShared(): Promise<T> {
    // Assigned synchronously, before any await, so concurrent callers join this attempt. This is
    // the only place a value is installed, so completions cannot race each other.
    if (!this.inFlight) {
      // The cache owns the deadline. Callers only race this promise against their own signal and
      // are free to walk away, so nothing else would ever settle an acquisition that hangs.
      this.inFlight = this.acquire(AbortSignal.timeout(this.acquireTimeoutMs))
        .then((value) => {
          this.current = value;
          return value;
        })
        .finally(() => {
          this.inFlight = undefined;
        });
    }
    return this.inFlight;
  }

  private startBackgroundRefresh(current: T): void {
    if (this.inFlight || this.backgroundRefresh) {
      return;
    }

    this.backgroundRefresh = this.runBackgroundRefresh(current);
  }

  private async runBackgroundRefresh(current: T): Promise<void> {
    try {
      // Shares the foreground attempt: if `current` expires or is invalidated while this runs,
      // the blocked caller joins this acquisition instead of starting a second one.
      await this.acquireShared();
    } catch (error: unknown) {
      if (this.current === current) {
        // Keep serving the still-valid value: a timeout retries on the next request, any
        // other failure is throttled so repeated failures don't hammer the service.
        // The cache's deadline is the only signal the acquisition sees, and the pipeline
        // surfaces it as AbortError; the name check covers custom acquire implementations.
        const timedOut =
          error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError");
        this.current = {
          ...current,
          refreshAfterTimestamp: Date.now() + (timedOut ? 0 : this.acquireTimeoutMs),
        } as T;
      }
    } finally {
      this.backgroundRefresh = undefined;
    }
  }
}
