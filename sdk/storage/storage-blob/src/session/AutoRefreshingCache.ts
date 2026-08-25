// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import { createAbortablePromise } from "@azure/core-util";
import type { SessionTokenInfo } from "./models.js";

/**
 * How long a background refresh may run before the cache gives up on it and keeps serving
 * the current, still-valid value.
 */
export const BACKGROUND_ACQUIRE_TIMEOUT_MS = 30 * 1000;

/**
 * Acquires a fresh session. Rejects if one could not be obtained.
 */
export type AcquireSession = (abortSignal?: AbortSignalLike) => Promise<SessionTokenInfo>;

/**
 * A cache for a single expiring session that refreshes itself proactively in the background.
 *
 * Only one acquisition runs at a time; concurrent callers await the same promise rather than
 * issuing duplicate requests. Specialized to {@link SessionTokenInfo} since it has exactly one
 * consumer.
 */
export class AutoRefreshingCache {
  private current: SessionTokenInfo | undefined;
  private inFlight: Promise<SessionTokenInfo> | undefined;
  private backgroundRefresh: Promise<void> | undefined;

  constructor(
    private readonly acquire: AcquireSession,
    private readonly backgroundAcquireTimeoutMs: number = BACKGROUND_ACQUIRE_TIMEOUT_MS,
  ) {}

  /**
   * Returns the cached session, acquiring or refreshing it as needed. Callers block only when
   * there is no usable value; once past `refreshAfterTimestamp` the current value is returned
   * immediately and a refresh runs in the background.
   */
  async get(abortSignal?: AbortSignalLike): Promise<SessionTokenInfo> {
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
    return createAbortablePromise<SessionTokenInfo>(
      (resolve, reject) => {
        void shared.then(resolve).catch(reject);
      },
      { abortSignal },
    );
  }

  /**
   * Drops the cached session, but only if it is still the one the caller used. This keeps a
   * failed request from clobbering a newer session that a concurrent refresh already installed.
   */
  invalidateIfCurrent(expected: SessionTokenInfo): void {
    const current = this.current;
    if (
      current?.kind === "session" &&
      expected.kind === "session" &&
      current.sessionToken === expected.sessionToken
    ) {
      this.current = undefined;
    }
  }

  private acquireShared(): Promise<SessionTokenInfo> {
    // Assigned synchronously, before any await, so concurrent callers join this attempt.
    if (!this.inFlight) {
      this.inFlight = this.acquire()
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

  private startBackgroundRefresh(current: SessionTokenInfo): void {
    if (this.inFlight || this.backgroundRefresh) {
      return;
    }

    this.backgroundRefresh = this.runBackgroundRefresh(current);
  }

  private async runBackgroundRefresh(current: SessionTokenInfo): Promise<void> {
    try {
      this.current = await this.acquire(AbortSignal.timeout(this.backgroundAcquireTimeoutMs));
    } catch (error: unknown) {
      if (this.current === current) {
        // Keep serving the still-valid value: a timeout retries on the next request, any
        // other failure is throttled so repeated failures don't hammer the service.
        const timedOut = error instanceof Error && error.name === "TimeoutError";
        this.current = {
          ...current,
          refreshAfterTimestamp: Date.now() + (timedOut ? 0 : this.backgroundAcquireTimeoutMs),
        };
      }
    } finally {
      this.backgroundRefresh = undefined;
    }
  }
}
