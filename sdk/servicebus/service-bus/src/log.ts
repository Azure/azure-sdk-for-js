// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogger, createClientLogger } from "@azure/logger";
import { AmqpError } from "rhea-promise";
import { isError } from "util";

/**
 * The @azure/logger configuration for this package.
 * This will output logs using the `azure:service-bus` namespace prefix.
 */
export const logger = createServiceBusLogger("service-bus");

/**
 * Logging for ServiceBusReceivers of any type (session, non-session)
 */
export const receiverLogger = createServiceBusLogger("service-bus:receiver");

/**
 * Logging for ServiceBusSenders
 */
export const senderLogger = createServiceBusLogger("service-bus:sender");

/**
 * Logging for connection management
 */
export const connectionLogger = createServiceBusLogger("service-bus:connection");

/**
 * Logging for the ServiceBusAdministrationClient
 */
export const atomLogger = createServiceBusLogger("service-bus:administration");

/**
 * Logging related to message encoding/decoding.
 */
export const messageLogger = createServiceBusLogger("service-bus:messages");

/**
 * Logging related to message encoding/decoding.
 */
export const managementClientLogger = createServiceBusLogger("service-bus:messages");

/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error Error containing a stack trace.
 * @ignore
 */
export function logErrorStackTrace(_logger: AzureLogger, error: any) {
  if (error && error.stack) {
    _logger.verbose(error.stack);
  }
}

/**
 * @internal
 * @ignore
 */
export interface ServiceBusLogger extends AzureLogger {
  /**
   * Logs an error with an associated message in this format:
   * `formatted `args`: %O
   * where the value for %O is the error object.
   * @param err
   * @param args
   */
  logError(err: Error | AmqpError | undefined, ...args: any[]): void;
}

/**
 * Creates an AzureLogger with any additional methods for standardized logging (for example, with errors)
 * @internal
 * @ignore
 */
function createServiceBusLogger(namespace: string) {
  const _logger = createClientLogger(namespace) as ServiceBusLogger;

  _logger["logError"] = (err: Error | AmqpError | undefined, ...args: any[]): void => {
    let l: typeof logger.info;

    // abort errors are user initiated so we don't have to treat them as warnings, like we
    // would with other errors.
    if (isError(err) && err.name === "AbortError") {
      l = _logger.info;
    } else {
      l = _logger.warning;
    }

    // tack on the error object so it also gets logged.
    args.push("; ", err);

    // let the normal formatting work and include the error at the end.
    l(...args);

    // optionally log the stack trace if it's available but this always goes to verbose
    if (err && (err as any).stack) {
      _logger.verbose((err as any).stack);
    }
  };

  return _logger;
}
