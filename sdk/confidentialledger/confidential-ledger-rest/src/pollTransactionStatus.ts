// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfidentialLedgerClient } from "./clientDefinitions.js";
import type {
  GetTransactionStatus200Response,
  GetTransactionStatusDefaultResponse,
} from "./responses.js";
import type { ConfidentialLedgerErrorOutput } from "./outputModels.js";
import { logger } from "./logger.js";

/**
 * Options for polling the transaction status of a ledger entry.
 */
export interface PollTransactionStatusOptions {
  /**
   * The polling interval in milliseconds.
   * @defaultValue 500
   */
  intervalInMs?: number;
  /**
   * Maximum number of retries when a 404 (Not Found) response is received.
   * A 404 indicates the node hasn't replicated the transaction yet.
   * Set to 0 to disable 404 retries. Defaults to 10.
   *
   * Note: 406 (Not Acceptable) responses are retried indefinitely, as they
   * indicate the transaction exists but consensus hasn't committed it yet.
   * @defaultValue 10
   */
  max404Retries?: number;
  /**
   * An AbortSignal to cancel the polling operation.
   */
  abortSignal?: AbortSignal;
}

/**
 * The result of polling for a transaction's committed status.
 */
export interface PollTransactionStatusResult {
  /** The transaction status response from the ledger. */
  response: GetTransactionStatus200Response;
  /** The committed state of the transaction. */
  state: "Committed";
  /** The transaction ID. */
  transactionId: string;
}

const DEFAULT_POLL_INTERVAL_MS = 500;
const DEFAULT_MAX_404_RETRIES = 10;

/**
 * Polls the transaction status of a ledger entry until it reaches the "Committed" state.
 *
 * After posting a ledger entry, the transaction must go through the CCF consensus process.
 * During this window, two transient HTTP status codes are expected:
 *
 * - **404 Not Found**: The node hasn't replicated the transaction yet (replication lag).
 *   This is retried up to `max404Retries` times (default: 10).
 *
 * - **406 Not Acceptable**: The node knows the transaction exists but consensus hasn't
 *   committed it yet. This is retried indefinitely until the transaction commits.
 *
 * A 200 OK response with `state: "Pending"` is also treated as transient and retried.
 *
 * @param client - The Confidential Ledger client.
 * @param transactionId - The transaction ID to poll (from the `x-ms-ccf-transaction-id` header).
 * @param options - Optional polling configuration.
 * @returns The committed transaction status response.
 *
 * @example
 * ```ts
 * const postResult = await client.path("/app/transactions").post(ledgerEntry);
 * const transactionId = postResult.headers["x-ms-ccf-transaction-id"];
 *
 * const { response, state, transactionId: txId } = await pollTransactionStatus(
 *   client,
 *   transactionId,
 * );
 * console.log(`Transaction ${txId} is ${state}`);
 * ```
 */
export async function pollTransactionStatus(
  client: ConfidentialLedgerClient,
  transactionId: string,
  options?: PollTransactionStatusOptions,
): Promise<PollTransactionStatusResult> {
  const intervalInMs = options?.intervalInMs ?? DEFAULT_POLL_INTERVAL_MS;
  const max404Retries = options?.max404Retries ?? DEFAULT_MAX_404_RETRIES;
  const abortSignal = options?.abortSignal;

  let notFoundRetryCount = 0;

  while (true) {
    if (abortSignal?.aborted) {
      throw new Error("The polling operation was aborted.");
    }

    const response: GetTransactionStatus200Response | GetTransactionStatusDefaultResponse =
      await client.path("/app/transactions/{transactionId}/status", transactionId).get();

    const statusCode = Number(response.status);

    // 404: node doesn't know about the transaction yet (replication lag)
    // Retry up to max404Retries times.
    if (statusCode === 404) {
      notFoundRetryCount++;
      if (notFoundRetryCount > max404Retries) {
        throw new Error(
          `Transaction ${transactionId} not found after ${max404Retries} retries. ` +
            `The transaction may not have been replicated to this node.`,
        );
      }
      logger.info(
        `Transaction ${transactionId} returned 404 (retry ${notFoundRetryCount}/${max404Retries}). ` +
          `Node hasn't replicated the transaction yet. Retrying...`,
      );
      await delay(intervalInMs, abortSignal);
      continue;
    }

    // 406: node knows the transaction but it hasn't committed yet
    // Retry indefinitely — consensus will eventually commit or reject.
    if (statusCode === 406) {
      logger.info(
        `Transaction ${transactionId} returned 406. ` +
          `Transaction exists but consensus hasn't committed it yet. Retrying...`,
      );
      await delay(intervalInMs, abortSignal);
      continue;
    }

    // Any other non-200 status is an unexpected error — throw immediately.
    if (statusCode !== 200) {
      const errorResponse = response as GetTransactionStatusDefaultResponse;
      const errorBody = errorResponse.body as ConfidentialLedgerErrorOutput | undefined;
      const errorMessage = errorBody?.error?.message ?? "Unknown error";
      throw new Error(
        `Unexpected status ${response.status} while polling transaction ${transactionId}: ${errorMessage}`,
      );
    }

    // 200 OK — check the transaction state
    const okResponse = response as GetTransactionStatus200Response;

    if (okResponse.body.state === "Committed") {
      return {
        response: okResponse,
        state: "Committed",
        transactionId: okResponse.body.transactionId,
      };
    }

    // state is "Pending" — continue polling
    logger.info(`Transaction ${transactionId} state is "${okResponse.body.state}". Retrying...`);
    await delay(intervalInMs, abortSignal);
  }
}

/**
 * Internal helper to delay for a given number of milliseconds, respecting an abort signal.
 */
function delay(ms: number, abortSignal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (abortSignal?.aborted) {
      reject(new Error("The polling operation was aborted."));
      return;
    }

    let onAbort: (() => void) | undefined;

    const timer = setTimeout(() => {
      if (onAbort) {
        abortSignal!.removeEventListener("abort", onAbort);
      }
      resolve();
    }, ms);

    if (abortSignal) {
      onAbort = (): void => {
        clearTimeout(timer);
        reject(new Error("The polling operation was aborted."));
      };
      abortSignal.addEventListener("abort", onAbort, { once: true });
    }
  });
}
