// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogger, createClientLogger } from "@azure/logger";
import { AmqpError } from "rhea-promise";
import { isObjectWithProperties } from "@azure/core-util";

/**
 * The `@azure/logger` configuration for this package.
 * This will output logs using the `azure:service-bus` namespace prefix.
 * @internal
 */
export const logger = createServiceBusLogger("service-bus");

/**
 * Logging for ServiceBusReceivers of any type (session, non-session)
 * @internal
 */
export const receiverLogger = createServiceBusLogger("service-bus:receiver");

/**
 * Logging for ServiceBusSenders
 * @internal
 */
export const senderLogger = createServiceBusLogger("service-bus:sender");

/**
 * Logging for ServiceBusRuleManagers
 * @internal
 */
export const ruleManagerLogger = createServiceBusLogger("service-bus:rulemanager");

/**
 * Logging for connection management
 * @internal
 */
export const connectionLogger = createServiceBusLogger("service-bus:connection");

/**
 * Logging for the ServiceBusAdministrationClient
 * @internal
 */
export const administrationLogger = createServiceBusLogger("service-bus:administration");

/**
 * Logging related to message encoding/decoding.
 * @internal
 */
export const messageLogger = createServiceBusLogger("service-bus:messages");

/**
 * Logging related to message encoding/decoding.
 * @internal
 */
export const managementClientLogger = createServiceBusLogger("service-bus:management");

/**
 * Logs the error's stack trace to "verbose" if a stack trace is available.
 * @param error - Error containing a stack trace.
 * @internal
 */
export function logErrorStackTrace(_logger: AzureLogger, error: unknown): void {
  if (isObjectWithProperties(error, ["stack"]) && error.stack) {
    _logger.verbose(error.stack);
  }
}

/**
 * @internal
 */
export interface ServiceBusLogger extends AzureLogger {
  /**
   * Logs an error with an associated message, formatted. If there is a stack
   * trace in the error that will be logged to the verbose stream.
   *
   * Example:
   *   receiverLogger.logError(new Error("hello, this is the error"), "this is my message");
   * will output:
   *   azure:service-bus:receiver:warning this is my message : Error: hello, this is the error
   */
  logError(err: Error | AmqpError | undefined, ...args: any[]): void;
}

/**
 * Creates an AzureLogger with any additional methods for standardized logging (for example, with errors)
 * @internal
 */
export function createServiceBusLogger(namespace: string): ServiceBusLogger {
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
    args.push(":", err);

    // let the normal formatting work and include the error at the end.
    l(...args);

    // optionally log the stack trace if it's available but this always goes to verbose
    if (err && (err as any).stack) {
      _logger.verbose((err as any).stack);
    }
  };

  return _logger;
}

/**
 * @internal
 */
function isError(err: Error | AmqpError | undefined): err is Error {
  return err != null && (err as any).name != null;
}
