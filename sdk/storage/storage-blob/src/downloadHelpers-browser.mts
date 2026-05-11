// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Platform-specific download options for browser.
 * In browser, progress is reported via the request's onDownloadProgress callback.
 * @internal
 */
export function getDownloadProgressCallback(
  onProgress: ((progress: { loadedBytes: number }) => void) | undefined,
): ((progress: { loadedBytes: number }) => void) | undefined {
  return onProgress;
}

/**
 * Whether the current platform requires early return for browser response handling.
 * @internal
 */
export const shouldReturnEarlyForBrowserResponse = true;

/**
 * Whether the query operation is supported on this platform.
 * @internal
 */
export const isQuerySupported = false;
