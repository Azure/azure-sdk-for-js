// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import debug, { Debugger } from "./debug";
export { Debugger } from "./debug";

const registeredLoggers = new Set<TypeSpecRuntimeDebugger>();
const logLevelFromEnv =
  (typeof process !== "undefined" && process.env && process.env.TYPESPEC_RUNTIME_LOG_LEVEL) ||
  undefined;

let typeSpecRuntimeLogLevel: TypeSpecRuntimeLogLevel | undefined;

/**
 * The TypeSpecRuntimeLogger provides a mechanism for overriding where logs are output to.
 * By default, logs are sent to stderr.
 * Override the `log` method to redirect logs to another location.
 */
export const TypeSpecRuntimeLogger: TypeSpecRuntimeClientLogger = debug("typeSpecRuntime");
TypeSpecRuntimeLogger.log = (...args) => {
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
export type TypeSpecRuntimeLogLevel = "verbose" | "info" | "warning" | "error";
const TYPESPEC_RUNTIME_LOG_LEVELS = ["verbose", "info", "warning", "error"];

type TypeSpecRuntimeDebugger = Debugger & { level: TypeSpecRuntimeLogLevel };

/**
 * An TypeSpecRuntimeClientLogger is a function that can log to an appropriate severity level.
 */
export type TypeSpecRuntimeClientLogger = Debugger;

if (logLevelFromEnv) {
  // avoid calling setLogLevel because we don't want a mis-set environment variable to crash
  if (isTypeSpecRuntimeLogLevel(logLevelFromEnv)) {
    setLogLevel(logLevelFromEnv);
  } else {
    console.error(
      `TYPESPEC_RUNTIME_LOG_LEVEL set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(
        ", "
      )}.`
    );
  }
}

/**
 * Immediately enables logging at the specified log level. If no level is specified, logging is disabled.
 * @param level - The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
export function setLogLevel(level?: TypeSpecRuntimeLogLevel): void {
  if (level && !isTypeSpecRuntimeLogLevel(level)) {
    throw new Error(
      `Unknown log level '${level}'. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(",")}`
    );
  }
  typeSpecRuntimeLogLevel = level;

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
export function getLogLevel(): TypeSpecRuntimeLogLevel | undefined {
  return typeSpecRuntimeLogLevel;
}

const levelMap = {
  verbose: 400,
  info: 300,
  warning: 200,
  error: 100,
};

/**
 * Defines the methods available on the SDK-facing logger.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export interface TypeSpecRuntimeLogger {
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

/**
 * Creates a logger for use by the SDKs that inherits from `TypeSpecRuntimeLogger`.
 * @param namespace - The name of the SDK package.
 * @hidden
 */
export function createClientLogger(namespace: string): TypeSpecRuntimeLogger {
  const clientRootLogger: TypeSpecRuntimeClientLogger = TypeSpecRuntimeLogger.extend(namespace);
  patchLogMethod(TypeSpecRuntimeLogger, clientRootLogger);
  return {
    error: createLogger(clientRootLogger, "error"),
    warning: createLogger(clientRootLogger, "warning"),
    info: createLogger(clientRootLogger, "info"),
    verbose: createLogger(clientRootLogger, "verbose"),
  };
}

function patchLogMethod(
  parent: TypeSpecRuntimeClientLogger,
  child: TypeSpecRuntimeClientLogger | TypeSpecRuntimeDebugger
): void {
  child.log = (...args) => {
    parent.log(...args);
  };
}

function createLogger(
  parent: TypeSpecRuntimeClientLogger,
  level: TypeSpecRuntimeLogLevel
): TypeSpecRuntimeDebugger {
  const logger: TypeSpecRuntimeDebugger = Object.assign(parent.extend(level), {
    level,
  });

  patchLogMethod(parent, logger);

  if (shouldEnable(logger)) {
    const enabledNamespaces = debug.disable();
    debug.enable(enabledNamespaces + "," + logger.namespace);
  }

  registeredLoggers.add(logger);

  return logger;
}

function shouldEnable(logger: TypeSpecRuntimeDebugger): boolean {
  return Boolean(
    typeSpecRuntimeLogLevel && levelMap[logger.level] <= levelMap[typeSpecRuntimeLogLevel]
  );
}

function isTypeSpecRuntimeLogLevel(logLevel: string): logLevel is TypeSpecRuntimeLogLevel {
  return TYPESPEC_RUNTIME_LOG_LEVELS.includes(logLevel as any);
}
