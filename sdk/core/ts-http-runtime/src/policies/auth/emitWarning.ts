// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import process from "node:process";

/**
 * Emits a process-level warning (displayed once per unique message).
 * @internal
 */
export function emitWarning(message: string): void {
  process.emitWarning(message);
}
