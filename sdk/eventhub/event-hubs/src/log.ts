// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
 * Creates a logger that includes the connectionId, sender or receiver name, and
 * client type.
 * @internal
 */
export function createLogPrefix(
  connectionId?: string,
  type?: "Sender" | "Receiver" | "Management",
  name?: string
): string {
  let prefix = "";
  if (connectionId) {
    prefix = `[${connectionId}]`;
  }
  if (type) {
    prefix += ` ${type}`;
  }
  if (name) {
    prefix += ` [${name}]`;
  }
  return prefix;
}

type LogFunction = Debugger["log"];

/**
 * @internal
 */
export interface SimpleLogger {
  readonly info: LogFunction;
  readonly error: LogFunction;
  readonly warning: LogFunction;
  readonly verbose: LogFunction;
}

function createLogFunction(
  azureLogger: AzureLogger,
  prefix: string,
  level: AzureLogLevel
): (arg: any, ...args: any[]) => void {
  return (arg: any, ...args: any[]) =>
    azureLogger[level](
      ...(typeof arg === "string" ? [prefix + " " + arg] : [prefix, arg]),
      ...args
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
