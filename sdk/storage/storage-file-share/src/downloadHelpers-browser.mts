// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TransferProgressEvent } from "@azure/core-rest-pipeline";

/**
 * Returns the download progress callback for the download operation.
 * In browsers, we use the callback directly since there's no RetriableReadableStream.
 * @internal
 */
export function getDownloadProgressCallback(
  onProgress: ((progress: TransferProgressEvent) => void) | undefined,
): ((progress: TransferProgressEvent) => void) | undefined {
  return onProgress;
}

/**
 * Whether to return early for browser responses.
 * In browsers, we return the response immediately since there's no stream processing.
 * @internal
 */
export const shouldReturnEarlyForBrowserResponse = true;
