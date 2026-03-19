// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * No-op on browser — process.emitWarning is not available.
 * @internal
 */
export function emitWarning(_message: string): void {
  // No-op in browser environments
}
