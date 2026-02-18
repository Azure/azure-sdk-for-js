// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Structured logger with configurable verbosity.
 *
 * Levels (in order of increasing verbosity):
 *   quiet  — errors only
 *   info   — default: normal build output
 *   verbose — debug details (cache hits, timings, file lists)
 */

export type LogLevel = "quiet" | "info" | "verbose";

export class Logger {
  level: LogLevel;
  constructor(level: LogLevel = "info") {
    this.level = level;
  }

  /** Always printed (unless piped to /dev/null). */
  error(msg: string): void {
    console.error(msg);
  }

  /** Printed at "info" and "verbose". Suppressed at "quiet". */
  warn(msg: string): void {
    if (this.level !== "quiet") {
      console.warn(msg);
    }
  }

  /** Printed at "info" and "verbose". Suppressed at "quiet". */
  info(msg: string): void {
    if (this.level !== "quiet") {
      console.log(msg);
    }
  }

  /** Printed only at "verbose". */
  verbose(msg: string): void {
    if (this.level === "verbose") {
      console.log(msg);
    }
  }
}

/** Module-level default logger. CLI sets the level before build(). */
let defaultLogger = new Logger("info");

export function getLogger(): Logger {
  return defaultLogger;
}

export function setLogLevel(level: LogLevel): void {
  defaultLogger = new Logger(level);
}
