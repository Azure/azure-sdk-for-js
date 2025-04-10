// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import debug, { type Debugger } from "./debug.js";
export type { Debugger } from "./debug.js";
import process from "node:process";

const registeredLoggers = new Set<CacheDebugger>();
const logLevelFromEnv =
  (typeof process !== "undefined" && process.env && process.env.CACHE_LOG_LEVEL) || undefined;

let cacheLogLevel: CacheLogLevel | undefined;

/**
 * The CacheLogger provides a mechanism for overriding where logs are output to.
 * By default, logs are sent to stderr.
 * Override the `log` method to redirect logs to another location.
 */
export const CacheLogger: CacheClientLogger = debug("cache");
CacheLogger.log = (...args) => {
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
export type CacheLogLevel = "verbose" | "info" | "warning" | "error";
const CACHE_LOG_LEVELS = ["verbose", "info", "warning", "error"];

type CacheDebugger = Debugger & { level: CacheLogLevel };

/**
 * A CacheClientLogger is a function that can log to an appropriate severity level.
 */
export type CacheClientLogger = Debugger;

if (logLevelFromEnv) {
  // avoid calling setLogLevel because we don't want a mis-set environment variable to crash
  if (isCacheLogLevel(logLevelFromEnv)) {
    setLogLevel(logLevelFromEnv);
  } else {
    console.error(
      `CACHE_LOG_LEVEL set to unknown log level '${logLevelFromEnv}'; logging is not enabled. Acceptable values: ${CACHE_LOG_LEVELS.join(
        ", ",
      )}.`,
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
export function setLogLevel(level?: CacheLogLevel): void {
  if (level && !isCacheLogLevel(level)) {
    throw new Error(
      `Unknown log level '${level}'. Acceptable values: ${CACHE_LOG_LEVELS.join(",")}`,
    );
  }
  cacheLogLevel = level;

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
export function getLogLevel(): CacheLogLevel | undefined {
  return cacheLogLevel;
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
export interface CacheLogger {
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
 * Creates a logger for use by the Turbo Cache that inherits from `CacheLogger`.
 * @param namespace - The name of the SDK package.
 * @hidden
 */
export function createClientLogger(namespace: string): CacheLogger {
  const clientRootLogger: CacheClientLogger = CacheLogger.extend(namespace);
  patchLogMethod(CacheLogger, clientRootLogger);
  return {
    error: createLogger(clientRootLogger, "error"),
    warning: createLogger(clientRootLogger, "warning"),
    info: createLogger(clientRootLogger, "info"),
    verbose: createLogger(clientRootLogger, "verbose"),
  };
}

function patchLogMethod(parent: CacheClientLogger, child: CacheClientLogger | CacheDebugger): void {
  child.log = (...args) => {
    parent.log(...args);
  };
}

function createLogger(parent: CacheClientLogger, level: CacheLogLevel): CacheDebugger {
  const logger: CacheDebugger = Object.assign(parent.extend(level), {
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

function shouldEnable(logger: CacheDebugger): boolean {
  return Boolean(cacheLogLevel && levelMap[logger.level] <= levelMap[cacheLogLevel]);
}

function isCacheLogLevel(logLevel: string): logLevel is CacheLogLevel {
  return CACHE_LOG_LEVELS.includes(logLevel);
}
