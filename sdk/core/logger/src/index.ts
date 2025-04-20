// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLoggerContext } from "@typespec/ts-http-runtime/internal/logger";

const context = createLoggerContext({
  logLevelEnvVarName: "AZURE_LOG_LEVEL",
  namespace: "azure",
});

/**
 * The AzureLogger provides a mechanism for overriding where logs are output to.
 * By default, logs are sent to stderr.
 * Override the `log` method to redirect logs to another location.
 */
export const AzureLogger: AzureClientLogger = context.logger;

/**
 * Immediately enables logging at the specified log level. If no level is specified, logging is disabled.
 * @param level - The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
export function setLogLevel(level?: AzureLogLevel): void {
  context.setLogLevel(level);
}

/**
 * Retrieves the currently specified log level.
 */
export function getLogLevel(): AzureLogLevel | undefined {
  return context.getLogLevel();
}

/**
 * Creates a logger for use by the Azure SDKs that inherits from `AzureLogger`.
 * @param namespace - The name of the SDK package.
 * @hidden
 */
export function createClientLogger(namespace: string): AzureLogger {
  return context.createClientLogger(namespace);
}

/**
 * A log function that can be dynamically enabled and redirected.
 */
export interface Debugger {
  /**
   * Logs the given arguments to the `log` method.
   */
  (...args: any[]): void;
  /**
   * True if this logger is active and logging.
   */
  enabled: boolean;
  /**
   * Used to cleanup/remove this logger.
   */
  destroy: () => boolean;
  /**
   * The current log method. Can be overridden to redirect output.
   */
  log: (...args: any[]) => void;
  /**
   * The namespace of this logger.
   */
  namespace: string;
  /**
   * Extends this logger with a child namespace.
   * Namespaces are separated with a ':' character.
   */
  extend: (namespace: string) => Debugger;
}

/**
 * The log levels supported by the logger.
 * The log levels in order of most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
export type AzureLogLevel = "verbose" | "info" | "warning" | "error";

/**
 * An AzureClientLogger is a function that can log to an appropriate severity level.
 */
export type AzureClientLogger = Debugger;

/**
 * Defines the methods available on the SDK-facing logger.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface AzureLogger {
  /**
   * Used for failures the program is unlikely to recover from,
   * such as Out of Memory.
   */
  error: Debugger;
  /**
   * Used when a function fails to perform its intended task.
   * Usually this means the function will throw an exception.
   * Not used for self-healing events (e.g. automatic retry)
   */
  warning: Debugger;
  /**
   * Used when a function operates normally.
   */
  info: Debugger;
  /**
   * Used for detailed troubleshooting scenarios. This is
   * intended for use by developers / system administrators
   * for diagnosing specific failures.
   */
  verbose: Debugger;
}
