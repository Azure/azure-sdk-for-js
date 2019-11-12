// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import debug, { Debugger } from "./debug";
export { Debugger } from "./debug";

const registeredLoggers = new Set<AzureDebugger>();
const logLevelFromEnv =
  (typeof process !== "undefined" && process.env && process.env.AZURE_LOG_LEVEL) || undefined;

let azureLogLevel: AzureLogLevel | undefined;

/**
 * The AzureLogger provides a mechanism for overriding where logs are output to.
 * By default, logs are sent to stderr.
 * Override the `log` method to redirect logs to another location.
 */
export const AzureLogger: AzureClientLogger = debug("azure");
AzureLogger.log = (...args) => {
  debug.log(...args);
};

/**
 * The log levels supported by the logger.
 * The log levels in order of most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
export type AzureLogLevel = "verbose" | "info" | "warning" | "error";
const AZURE_LOG_LEVELS = ["verbose", "info", "warning", "error"];

type AzureDebugger = Debugger & { level: AzureLogLevel };

/**
 * An AzureClientLogger is a function that can log to an appropriate severity level.
 */
export type AzureClientLogger = Debugger;

if (logLevelFromEnv) {
  // avoid calling setLogLevel because we don't want a mis-set environment variable to crash
  if (isAzureLogLevel(logLevelFromEnv)) {
    setLogLevel(logLevelFromEnv);
  } else {
    console.error(
      `AZURE_LOG_LEVEL set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${AZURE_LOG_LEVELS.join(
        ", "
      )}.`
    );
  }
}

/**
 * Immediately enables logging at the specified log level.
 * @param level The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
export function setLogLevel(level?: AzureLogLevel) {
  if (level && !isAzureLogLevel(level)) {
    throw new Error(
      `Unknown log level '${level}'. Acceptable values: ${AZURE_LOG_LEVELS.join(",")}`
    );
  }
  azureLogLevel = level;

  const enabledNamespaces = [];
  for (const logger of registeredLoggers) {
    if (shouldEnable(logger)) {
      enabledNamespaces.push(logger.namespace);
    }
  }

  debug.enable(enabledNamespaces.join(","));
}

/**
 * Retrieves the currently specified log level.
 */
export function getLogLevel() {
  return azureLogLevel;
}

const levelMap = {
  verbose: 400,
  info: 300,
  warning: 200,
  error: 100
};

/**
 * Defines the methods available on the SDK-facing logger.
 */
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
   * Used for detailed trbouleshooting scenarios. This is
   * intended for use by developers / system administrators
   * for diagnosing specific failures.
   */
  verbose: Debugger;
}

/**
 * Creates a logger for use by the Azure SDKs that inherits from `AzureLogger`.
 * @param namespace The name of the SDK package.
 * @ignore
 */
export function createClientLogger(namespace: string): AzureLogger {
  const clientRootLogger: AzureClientLogger = AzureLogger.extend(namespace);
  patchLogMethod(AzureLogger, clientRootLogger);
  return {
    error: createLogger(clientRootLogger, "error"),
    warning: createLogger(clientRootLogger, "warning"),
    info: createLogger(clientRootLogger, "info"),
    verbose: createLogger(clientRootLogger, "verbose")
  };
}

function patchLogMethod(parent: AzureClientLogger, child: AzureClientLogger | AzureDebugger): void {
  child.log = (...args) => {
    parent.log(...args);
  };
}

function createLogger(parent: AzureClientLogger, level: AzureLogLevel): AzureDebugger {
  const logger: AzureDebugger = Object.assign(parent.extend(level), {
    level
  });

  patchLogMethod(parent, logger);

  if (shouldEnable(logger)) {
    const enabledNamespaces = debug.disable();
    debug.enable(enabledNamespaces + "," + logger.namespace);
  }

  registeredLoggers.add(logger);

  return logger;
}

function shouldEnable(logger: AzureDebugger) {
  if (azureLogLevel && levelMap[logger.level] <= levelMap[azureLogLevel]) {
    return true;
  } else {
    return false;
  }
}

function isAzureLogLevel(logLevel: string): logLevel is AzureLogLevel {
  return AZURE_LOG_LEVELS.includes(logLevel as any);
}
