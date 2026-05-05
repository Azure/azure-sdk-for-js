// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TransferProgressEvent } from "@azure/core-rest-pipeline";

/**
 * Returns the download progress callback for the download operation.
 * In Node.js, progress is reported by RetriableReadableStream, so we return undefined.
 * @internal
 */
export function getDownloadProgressCallback(
  _onProgress: ((progress: TransferProgressEvent) => void) | undefined,
): ((progress: TransferProgressEvent) => void) | undefined {
  // Node.js uses RetriableReadableStream which reports progress directly
  return undefined;
}

/**
 * Whether to return early for browser responses.
 * In Node.js, we continue processing the stream.
 * @internal
 */
export const shouldReturnEarlyForBrowserResponse = false;
