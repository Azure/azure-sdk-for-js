// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import debug from "debug";

const registeredLoggers = new Set<AzureDebugger>();
const logLevelFromEnv =
  (typeof process !== "undefined" &&
    process.env &&
    (process.env.AZURE_LOG_LEVEL as AzureLogLevel)) ||
  undefined;

let azureLogLevel: AzureLogLevel | undefined = logLevelFromEnv;

/**
 * The AzureLogger provides a mechanism for overriding where logs are output to.
 * By default, logs are sent to stderr.
 * Override the `log` method to redirect logs to another location.
 */
export const AzureLogger = debug("azure") as AzureDebugger;
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

type AzureDebugger = debug.Debugger & { level: number };

if (logLevelFromEnv) {
  setLogLevel(logLevelFromEnv);
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
 * @ignore
 */
export interface AzureLogger {
  error: debug.Debugger;
  warning: debug.Debugger;
  info: debug.Debugger;
  verbose: debug.Debugger;
}

/**
 * Creates a logger for use by the Azure SDKs that inherits from `AzureLogger`.
 * @param namespace The name of the SDK package.
 * @ignore
 */
export function createClientLogger(namespace: string): AzureLogger {
  const clientRootLogger = createLogger(AzureLogger, namespace);
  return {
    error: createLogger(clientRootLogger, "error"),
    warning: createLogger(clientRootLogger, "warning"),
    info: createLogger(clientRootLogger, "info"),
    verbose: createLogger(clientRootLogger, "verbose")
  };
}

function createLogger(parent: AzureDebugger, levelOrNamespace: string) {
  const logger: AzureDebugger = parent.extend(levelOrNamespace) as any;
  if (levelOrNamespace !== undefined) {
    logger.level = levelMap[levelOrNamespace as AzureLogLevel];
  }

  if (parent) {
    logger.log = (...args) => {
      parent.log(...args);
    };
  }

  if (shouldEnable(logger)) {
    const enabledNamespaces = debug.disable();
    debug.enable(enabledNamespaces + "," + logger.namespace);
  }

  registeredLoggers.add(logger);

  return logger;
}

function shouldEnable(logger: AzureDebugger) {
  if (azureLogLevel && logger.level <= levelMap[azureLogLevel]) {
    return true;
  } else {
    return false;
  }
}
