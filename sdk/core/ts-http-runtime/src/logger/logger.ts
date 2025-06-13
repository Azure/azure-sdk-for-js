// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import debug from "./debug.js";

import type { Debugger } from "./debug.js";
export type { Debugger };

/**
 * The log levels supported by the logger.
 * The log levels in order of most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
export type TypeSpecRuntimeLogLevel = "verbose" | "info" | "warning" | "error";

/**
 * A TypeSpecRuntimeClientLogger is a function that can log to an appropriate severity level.
 */
export type TypeSpecRuntimeClientLogger = Debugger;

/**
 * Defines the methods available on the SDK-facing logger.
 */
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
 * todo doc
 */
export interface LoggerContext {
  /**
   * Immediately enables logging at the specified log level. If no level is specified, logging is disabled.
   * @param level - The log level to enable for logging.
   * Options from most verbose to least verbose are:
   * - verbose
   * - info
   * - warning
   * - error
   */
  setLogLevel(logLevel?: TypeSpecRuntimeLogLevel): void;

  /**
   * Retrieves the currently specified log level.
   */
  getLogLevel(): TypeSpecRuntimeLogLevel | undefined;

  /**
   * Creates a logger for use by the SDKs that inherits from `TypeSpecRuntimeLogger`.
   * @param namespace - The name of the SDK package.
   * @hidden
   */
  createClientLogger(namespace: string): TypeSpecRuntimeLogger;

  /**
   * The TypeSpecRuntimeClientLogger provides a mechanism for overriding where logs are output to.
   * By default, logs are sent to stderr.
   * Override the `log` method to redirect logs to another location.
   */
  logger: TypeSpecRuntimeClientLogger;
}

/**
 * Option for creating a TypeSpecRuntimeLoggerContext.
 */
export interface CreateLoggerContextOptions {
  /**
   * The name of the environment variable to check for the log level.
   */
  logLevelEnvVarName: string;

  /**
   * The namespace of the logger.
   */
  namespace: string;
}

const TYPESPEC_RUNTIME_LOG_LEVELS = ["verbose", "info", "warning", "error"];

type DebuggerWithLogLevel = Debugger & { level: TypeSpecRuntimeLogLevel };

const levelMap = {
  verbose: 400,
  info: 300,
  warning: 200,
  error: 100,
};

function patchLogMethod(
  parent: TypeSpecRuntimeClientLogger,
  child: TypeSpecRuntimeClientLogger | DebuggerWithLogLevel,
): void {
  child.log = (...args) => {
    parent.log(...args);
  };
}

function isTypeSpecRuntimeLogLevel(level: string): level is TypeSpecRuntimeLogLevel {
  return TYPESPEC_RUNTIME_LOG_LEVELS.includes(level as any);
}

/**
 * Creates a logger context base on the provided options.
 * @param options - The options for creating a logger context.
 * @returns The logger context.
 */
export function createLoggerContext(options: CreateLoggerContextOptions): LoggerContext {
  const registeredLoggers = new Set<DebuggerWithLogLevel>();
  const logLevelFromEnv =
    (typeof process !== "undefined" && process.env && process.env[options.logLevelEnvVarName]) ||
    undefined;

  let logLevel: TypeSpecRuntimeLogLevel | undefined;

  const clientLogger: TypeSpecRuntimeClientLogger = debug(options.namespace);
  clientLogger.log = (...args) => {
    debug.log(...args);
  };

  function contextSetLogLevel(level?: TypeSpecRuntimeLogLevel): void {
    if (level && !isTypeSpecRuntimeLogLevel(level)) {
      throw new Error(
        `Unknown log level '${level}'. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(",")}`,
      );
    }
    logLevel = level;

    const enabledNamespaces = [];
    for (const logger of registeredLoggers) {
      if (shouldEnable(logger)) {
        enabledNamespaces.push(logger.namespace);
      }
    }

    debug.enable(enabledNamespaces.join(","));
  }

  if (logLevelFromEnv) {
    // avoid calling setLogLevel because we don't want a mis-set environment variable to crash
    if (isTypeSpecRuntimeLogLevel(logLevelFromEnv)) {
      contextSetLogLevel(logLevelFromEnv);
    } else {
      console.error(
        `${options.logLevelEnvVarName} set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${TYPESPEC_RUNTIME_LOG_LEVELS.join(
          ", ",
        )}.`,
      );
    }
  }

  function shouldEnable(logger: DebuggerWithLogLevel): boolean {
    return Boolean(logLevel && levelMap[logger.level] <= levelMap[logLevel]);
  }

  function createLogger(
    parent: TypeSpecRuntimeClientLogger,
    level: TypeSpecRuntimeLogLevel,
  ): DebuggerWithLogLevel {
    const logger: DebuggerWithLogLevel = Object.assign(parent.extend(level), {
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

  function contextGetLogLevel(): TypeSpecRuntimeLogLevel | undefined {
    return logLevel;
  }

  function contextCreateClientLogger(namespace: string): TypeSpecRuntimeLogger {
    const clientRootLogger: TypeSpecRuntimeClientLogger = clientLogger.extend(namespace);
    patchLogMethod(clientLogger, clientRootLogger);
    return {
      error: createLogger(clientRootLogger, "error"),
      warning: createLogger(clientRootLogger, "warning"),
      info: createLogger(clientRootLogger, "info"),
      verbose: createLogger(clientRootLogger, "verbose"),
    };
  }

  return {
    setLogLevel: contextSetLogLevel,
    getLogLevel: contextGetLogLevel,
    createClientLogger: contextCreateClientLogger,
    logger: clientLogger,
  };
}

const context = createLoggerContext({
  logLevelEnvVarName: "TYPESPEC_RUNTIME_LOG_LEVEL",
  namespace: "typeSpecRuntime",
});

/**
 * Immediately enables logging at the specified log level. If no level is specified, logging is disabled.
 * @param level - The log level to enable for logging.
 * Options from most verbose to least verbose are:
 * - verbose
 * - info
 * - warning
 * - error
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TypeSpecRuntimeLogger: TypeSpecRuntimeClientLogger = context.logger;

/**
 * Retrieves the currently specified log level.
 */
export function setLogLevel(logLevel?: TypeSpecRuntimeLogLevel): void {
  context.setLogLevel(logLevel);
}

/**
 * Retrieves the currently specified log level.
 */
export function getLogLevel(): TypeSpecRuntimeLogLevel | undefined {
  return context.getLogLevel();
}

/**
 * Creates a logger for use by the SDKs that inherits from `TypeSpecRuntimeLogger`.
 * @param namespace - The name of the SDK package.
 * @hidden
 */
export function createClientLogger(namespace: string): TypeSpecRuntimeLogger {
  return context.createClientLogger(namespace);
}
