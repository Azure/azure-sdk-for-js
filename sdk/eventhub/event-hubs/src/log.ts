// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { createClientLogger } from "@azure/logger";

/**
 * The @azure/logger configuration for this package.
 * This will output logs using the `azure:event-hubs` namespace prefix.
 */
export const logger = createClientLogger("event-hubs");

/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error Error containing a stack trace.
 * @ignore
 */
export function logErrorStackTrace(error: any) {
  if (error && error.stack) {
    logger.verbose(error.stack);
  }
}
