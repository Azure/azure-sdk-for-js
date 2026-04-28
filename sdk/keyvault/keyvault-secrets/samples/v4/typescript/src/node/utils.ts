// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Retries an async operation with a fixed delay between attempts.
 *
 * Useful when Azure Key Vault returns a transient HTTP 409 Conflict while
 * a preceding purge or creation is still propagating across the service.
 * The SDK's built-in retry policy only covers 429 and 5xx responses, so
 * eventual-consistency 409s must be handled at the call site.
 *
 * @param fn - The async operation to run and retry.
 * @param options - Optional retry configuration.
 * @returns The resolved value of `fn` on the first successful attempt.
 * @throws The last error if all attempts fail.
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delayMs?: number;
    shouldRetry?: (error: unknown) => boolean;
  } = {},
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
