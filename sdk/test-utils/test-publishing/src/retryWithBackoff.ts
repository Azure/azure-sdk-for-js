// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Options for {@link retryWithBackoff}.
 */
export interface RetryWithBackoffOptions {
  /**
   * Maximum number of attempts (including the first). Defaults to `5`.
   */
  maxAttempts?: number;
  /**
   * Milliseconds to wait between attempts. Defaults to `2000`.
   */
  delayMs?: number;
  /**
   * Predicate that decides whether a thrown error is retryable.
   * Return `true` to retry, `false` to re-throw immediately.
   * Defaults to retrying on any error.
   */
  shouldRetry?: (error: unknown) => boolean;
}

/**
 * Retries an async operation with a fixed delay between attempts.
 *
 * Useful in sample-tests where Azure services exhibit eventual consistency
 * (e.g. a restore operation returning a 409 Conflict while a preceding
 * purge is still propagating). The SDK's built-in retry policy only retries
 * on 429 and 5xx responses, so these transient 409s must be handled at the
 * call site.
 *
 * @param fn - The async operation to run and retry.
 * @param options - Optional retry configuration.
 * @returns The resolved value of `fn` on the first successful attempt.
 * @throws The last error if all attempts fail.
 *
 * @example
 * // Restore after purge — KV may still be propagating the deletion
 * const restored = await retryWithBackoff(() => client.restoreKeyBackup(backup));
 *
 * @example
 * // Retry only on specific error messages
 * await retryWithBackoff(
 *   () => client.deleteCertificateOperation(certName),
 *   { shouldRetry: (e) => /conflict while deleting/i.test((e as Error).message) },
 * );
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryWithBackoffOptions = {},
): Promise<T> {
  const { maxAttempts = 5, delayMs = 2000, shouldRetry = () => true } = options;
  let lastError: unknown;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (!shouldRetry(error)) throw error;
      lastError = error;
      if (attempt < maxAttempts - 1) {
        await new Promise<void>((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
}
