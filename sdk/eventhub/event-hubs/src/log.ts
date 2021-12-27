// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createClientLogger } from "@azure/logger";
import { isObjectWithProperties } from "./util/typeGuards";

/**
 * The `@azure/logger` configuration for this package.
 * This will output logs using the `azure:event-hubs` namespace prefix.
 */
export const logger = createClientLogger("event-hubs");

/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
export function logErrorStackTrace(error: unknown): void {
  if (isObjectWithProperties(error, ["stack"]) && error.stack) {
    logger.verbose(error.stack);
  }
}
