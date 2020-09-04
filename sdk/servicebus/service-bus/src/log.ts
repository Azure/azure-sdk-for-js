// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createClientLogger } from "@azure/logger";

/**
 * The @azure/logger configuration for this package.
 * This will output logs using the `azure:event-hubs` namespace prefix.
 */
export const logger = createClientLogger("service-bus");

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

import debugModule from "debug";
/**
 * @internal
 * @ignore
 * log statements for management
 */
export const mgmt = debugModule("azure:service-bus:management");
/**
 * @internal
 * @ignore
 * log statements for sender
 */
export const sender = debugModule("azure:service-bus:sender");
/**
 * @internal
 * @ignore
 * log statements for receiver
 */
export const receiver = debugModule("azure:service-bus:receiver");
/**
 * @internal
 * @ignore
 * log statements for receiverbatching
 */
export const batching = debugModule("azure:service-bus:receiverbatching");
/**
 * @internal
 * @ignore
 * log statements for servicebusMessage
 */
export const message = debugModule("azure:service-bus:servicebusMessage");
/**
 * @internal
 * @ignore
 * log statements for utils
 */
export const utils = debugModule("azure:service-bus:utils");
/**
 * @internal
 * @ignore
 * log statements for messageSession
 */
export const messageSession = debugModule("azure:service-bus:messageSession");
