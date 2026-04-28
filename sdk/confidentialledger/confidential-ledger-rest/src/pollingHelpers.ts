// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfidentialLedgerClient } from "./clientDefinitions.js";
import type {
  GetLedgerEntry200Response,
  GetLedgerEntryDefaultResponse,
  GetTransactionStatus200Response,
  GetTransactionStatusDefaultResponse,
} from "./responses.js";

/**
 * Minimal structural type compatible with both the global `AbortSignal` and
 * `@azure/abort-controller`'s `AbortSignalLike`. Defined locally to avoid a
 * direct dependency on `@azure/abort-controller`.
 */
export interface AbortSignalLike {
  readonly aborted: boolean;
  addEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any): void;
  removeEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any): void;
}

/**
 * Error thrown when polling is aborted via an {@link AbortSignalLike}.
 */
class AbortError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AbortError";
  }
}

/**
 * Default interval, in milliseconds, between polling attempts.
 */
export const DEFAULT_POLLING_INTERVAL_IN_MS = 500;

/**
 * Maximum number of additional attempts that {@link getLedgerEntry} will make
 * after the initial request when the entry is still in the `Loading` state.
 *
 * Mirrors the .NET `MaxLoadingRetries` constant used by
 * `Azure.Security.ConfidentialLedger.ConfidentialLedgerClient`.
 */
export const MAX_LOADING_RETRIES = 10;

/**
 * Maximum number of consecutive HTTP 404 responses tolerated by
 * {@link waitForLedgerEntryCommit} before the operation surfaces as failed.
 *
 * Mirrors the .NET `MaxNotFoundRetries` constant used by
 * `Azure.Security.ConfidentialLedger.PostLedgerEntryOperation`.
 */
export const MAX_NOT_FOUND_RETRIES = 3;

/**
 * Options that control polling helpers exposed by this package.
 */
export interface LedgerPollingOptions {
  /**
   * Interval, in milliseconds, between polling attempts. Defaults to
   * {@link DEFAULT_POLLING_INTERVAL_IN_MS}. Tests may set this to `0` to avoid
   * sleeping between attempts.
   */
  pollingIntervalInMs?: number;
  /**
   * An {@link AbortSignalLike} used to cancel the polling loop between
   * attempts. The currently in-flight request is also passed this signal.
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Possible terminal responses for {@link waitForLedgerEntryCommit}. Mirrors the
 * `GET /transactions/{transactionId}/status` response set.
 */
export type WaitForLedgerEntryCommitResponse =
  | GetTransactionStatus200Response
  | GetTransactionStatusDefaultResponse;

/**
 * Possible terminal responses for {@link getLedgerEntry}. Mirrors the
 * `GET /transactions/{transactionId}` response set.
 */
export type GetLedgerEntryResponse = GetLedgerEntry200Response | GetLedgerEntryDefaultResponse;

/**
 * Options accepted by {@link getLedgerEntry}.
 */
export interface GetLedgerEntryOptions extends LedgerPollingOptions {
  /**
   * Optional collection identifier. When omitted the service-default collection
   * is used.
   */
  collectionId?: string;
}

/**
 * Polls `GET /app/transactions/{transactionId}` until the response represents
 * a `Ready` ledger entry (HTTP 200 with an `entry` property in the body), the
 * server returns a terminal non-200 response, the abort signal is triggered,
 * or {@link MAX_LOADING_RETRIES} additional attempts have been made.
 *
 * Mirrors the behavior of `ConfidentialLedgerClient.GetLedgerEntry` in the .NET
 * Azure.Security.ConfidentialLedger client.
 *
 * @param client - The {@link ConfidentialLedgerClient} to poll with.
 * @param transactionId - Identifier of the transaction whose entry should be
 *   fetched. Must be a non-empty string.
 * @param options - Optional polling configuration.
 * @returns The final response, which may be a `Ready` entry, a terminal
 *   non-success response, or — if the entry never becomes ready within the
 *   retry budget — the last `Loading` response.
 */
export async function getLedgerEntry(
  client: ConfidentialLedgerClient,
  transactionId: string,
  options: GetLedgerEntryOptions = {},
): Promise<GetLedgerEntryResponse> {
  if (!transactionId) {
    throw new Error("transactionId must be a non-empty string.");
  }

  const {
    pollingIntervalInMs = DEFAULT_POLLING_INTERVAL_IN_MS,
    abortSignal,
    collectionId,
  } = options;

  const requestOptions: {
    abortSignal?: AbortSignalLike;
    queryParameters?: { collectionId: string };
  } = {};
  if (abortSignal) {
    requestOptions.abortSignal = abortSignal;
  }
  if (collectionId) {
    requestOptions.queryParameters = { collectionId };
  }

  let response = (await client
    .path("/app/transactions/{transactionId}", transactionId)
    .get(requestOptions)) as GetLedgerEntryResponse;

  for (let attempt = 0; attempt < MAX_LOADING_RETRIES; attempt++) {
    if (!isLoadingResponse(response)) {
      return response;
    }

    await delay(pollingIntervalInMs, abortSignal);

    response = (await client
      .path("/app/transactions/{transactionId}", transactionId)
      .get(requestOptions)) as GetLedgerEntryResponse;
  }

  return response;
}

/**
 * Polls `GET /app/transactions/{transactionId}/status` until the entry reaches
 * a terminal state. Mirrors the LRO state machine implemented by
 * `Azure.Security.ConfidentialLedger.PostLedgerEntryOperation`:
 *
 * - HTTP 200 → reset the consecutive-404 counter and continue with normal state
 *   parsing (returns once `state` is no longer `"Pending"`).
 * - HTTP 406 → treat as `Pending` indefinitely (no retry cap), reset the
 *   consecutive-404 counter and continue polling.
 * - HTTP 404 → increment the consecutive-404 counter; while
 *   `counter <= {@link MAX_NOT_FOUND_RETRIES}` keep polling, otherwise surface
 *   the response as the terminal failure.
 * - Any other status → terminal, returned to the caller.
 *
 * @param client - The {@link ConfidentialLedgerClient} to poll with.
 * @param transactionId - Identifier of the transaction whose commit status
 *   should be awaited. Must be a non-empty string.
 * @param options - Optional polling configuration.
 * @returns The terminal response. Callers should inspect `status` and
 *   `body.state` to determine whether the operation succeeded.
 */
export async function waitForLedgerEntryCommit(
  client: ConfidentialLedgerClient,
  transactionId: string,
  options: LedgerPollingOptions = {},
): Promise<WaitForLedgerEntryCommitResponse> {
  if (!transactionId) {
    throw new Error("transactionId must be a non-empty string.");
  }

  const { pollingIntervalInMs = DEFAULT_POLLING_INTERVAL_IN_MS, abortSignal } = options;
  const requestOptions: { abortSignal?: AbortSignalLike } = {};
  if (abortSignal) {
    requestOptions.abortSignal = abortSignal;
  }

  let consecutiveNotFound = 0;
  let attempt = 0;

  while (true) {
    if (attempt > 0) {
      await delay(pollingIntervalInMs, abortSignal);
    }
    attempt++;

    const response = (await client
      .path("/app/transactions/{transactionId}/status", transactionId)
      .get(requestOptions)) as WaitForLedgerEntryCommitResponse;

    if (response.status === "200") {
      consecutiveNotFound = 0;
      const state = (response as GetTransactionStatus200Response).body?.state;
      if (state !== "Pending") {
        return response;
      }
      continue;
    }

    if (response.status === "406") {
      // The node knows the transaction but consensus is still in progress.
      // Treat as Pending indefinitely.
      consecutiveNotFound = 0;
      continue;
    }

    if (response.status === "404") {
      consecutiveNotFound++;
      if (consecutiveNotFound <= MAX_NOT_FOUND_RETRIES) {
        continue;
      }
      return response;
    }

    return response;
  }
}

/**
 * Returns `true` when the supplied response is an HTTP 200 whose JSON body
 * does not yet contain an `entry` property — i.e. the service is still loading
 * the requested historical entry. Non-200 responses, or 200 responses whose
 * body is not a JSON object, are considered terminal.
 */
export function isLoadingResponse(response: GetLedgerEntryResponse): boolean {
  if (response.status !== "200") {
    return false;
  }
  const body = (response as GetLedgerEntry200Response).body as unknown;
  if (!body || typeof body !== "object") {
    return false;
  }
  return !("entry" in (body as Record<string, unknown>));
}

/**
 * Promise-based delay that honors an optional {@link AbortSignalLike}.
 *
 * @internal
 */
function delay(timeInMs: number, abortSignal?: AbortSignalLike): Promise<void> {
  if (timeInMs <= 0) {
    if (abortSignal?.aborted) {
      return Promise.reject(new AbortError("The operation was aborted."));
    }
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const handle: { token: ReturnType<typeof setTimeout> | undefined } = { token: undefined };
    const onAbort = (): void => {
      if (handle.token !== undefined) {
        clearTimeout(handle.token);
      }
      abortSignal?.removeEventListener("abort", onAbort);
      reject(new AbortError("The delay was aborted."));
    };

    handle.token = setTimeout(() => {
      abortSignal?.removeEventListener("abort", onAbort);
      resolve();
    }, timeInMs);

    if (abortSignal) {
      if (abortSignal.aborted) {
        onAbort();
        return;
      }
      abortSignal.addEventListener("abort", onAbort);
    }
  });
}
