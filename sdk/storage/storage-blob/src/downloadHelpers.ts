// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Platform-specific download options for Node.js.
 * In Node.js, progress is reported by RetriableReadableStream, not onDownloadProgress.
 * @internal
 */
export function getDownloadProgressCallback(
  _onProgress: ((progress: { loadedBytes: number }) => void) | undefined,
): ((progress: { loadedBytes: number }) => void) | undefined {
  // Node.js reports progress through RetriableReadableStream
  return undefined;
}

/**
 * Whether the current platform requires early return for browser response handling.
 * @internal
 */
export const shouldReturnEarlyForBrowserResponse = false;

/**
 * Whether the query operation is supported on this platform.
 * @internal
 */
export const isQuerySupported = true;
