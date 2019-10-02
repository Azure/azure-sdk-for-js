// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { createClientLogger } from "@azure/logger";

/**
 * A logger that can be used to log under the azure:event-hubs namespace.
 */
export const log = createClientLogger("event-hubs");

/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error Error containing a stack trace.
 * @ignore
 */
export function logErrorStackTrace(error: any) {
  if (error && error.stack) {
    log.verbose(error.stack);
  }
}
