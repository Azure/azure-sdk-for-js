// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureLogger, AzureLogLevel, createClientLogger, Debugger } from "@azure/logger";
import { isObjectWithProperties } from "@azure/core-util";

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
  if (isObjectWithProperties(error, ["stack"])) {
    logger.verbose(error.stack);
  }
}

/**
 * @internal
 */
export function createReceiverLogPrefix(
  consumerId: string,
  connectionId: string,
  partitionId: string,
): string {
  return `[${connectionId}] Receiver P${partitionId}-${consumerId}`;
}

/**
 * @internal
 */
export function createSenderLogPrefix(senderId: string, connectionId: string): string {
  return `[${connectionId}] Sender ${senderId}`;
}

/**
 * @internal
 */
export function createManagementLogPrefix(connectionId: string): string {
  return `[${connectionId}] Management`;
}

/**
 * @internal
 */
export type SimpleLogger = {
  [Property in keyof AzureLogger]: Debugger["log"];
};

function createLogFunction(
  azureLogger: AzureLogger,
  prefix: string,
  level: AzureLogLevel,
): (arg: any, ...args: any[]) => void {
  return (arg: any, ...args: any[]) =>
    azureLogger[level](
      ...(typeof arg === "string" ? [`${prefix}: ${arg}`] : [prefix, arg]),
      ...args,
    );
}

/**
 * @internal
 */
export function createSimpleLogger(azureLogger: AzureLogger, prefix: string): SimpleLogger {
  return {
    info: createLogFunction(azureLogger, prefix, "info"),
    error: createLogFunction(azureLogger, prefix, "error"),
    verbose: createLogFunction(azureLogger, prefix, "verbose"),
    warning: createLogFunction(azureLogger, prefix, "warning"),
  };
}

/** @internal */
export function logObj(obj: unknown): void {
  JSON.stringify(obj, undefined, 2);
}
