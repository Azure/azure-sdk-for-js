// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClientLogger } from "@azure/logger";

/**
 * The `@azure/logger` configuration for this package.
 * This will output logs using the `azure:eventhubs-checkpointstore-table` namespace prefix.
 */
export const logger = createClientLogger("eventhubs-checkpointstore-table");

/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
export function logErrorStackTrace(error: unknown): void {
  if (error && typeof error === "object" && "stack" in error) {
    logger.verbose((error as any).stack);
  }
}
