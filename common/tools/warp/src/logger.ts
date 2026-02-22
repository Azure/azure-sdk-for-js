// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Structured logger with configurable verbosity and optional buffering.
 *
 * Levels (in order of increasing verbosity):
 *   quiet  — errors only
 *   info   — default: normal build output
 *   verbose — debug details (cache hits, timings, file lists)
 *
 * Buffering (tshy-inspired):
 *   When level < "verbose", info/verbose messages are buffered instead of
 *   printed. On success the buffer is discarded. On failure, `flush()` replays
 *   the buffer to stderr so the user sees the full diagnostic trail without
 *   needing to re-run with `--verbose`.
 */

export type LogLevel = "quiet" | "info" | "verbose";

export class Logger {
  level: LogLevel;

  /**
   * Messages buffered while level is below "verbose".
   * Each entry is the raw string passed to `info()` / `verbose()`.
   */
  private buffer: string[] = [];

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
    } else {
      // Suppressed — buffer for potential replay on failure
      this.buffer.push(msg);
    }
  }

  /** Printed only at "verbose". Buffered at lower levels for failure replay. */
  verbose(msg: string): void {
    if (this.level === "verbose") {
      console.log(msg);
    } else {
      // Suppressed — buffer for potential replay on failure
      this.buffer.push(msg);
    }
  }

  /**
   * Flush buffered messages to stderr.
   * Called on build failure so the user sees the full diagnostic trail
   * without needing to re-run with `--verbose`.
   * Has no effect when level is already "verbose" (messages were already printed).
   */
  flush(): void {
    if (this.level === "verbose") {
      // Already printed in real-time — nothing to replay
      this.buffer.length = 0;
      return;
    }
    if (this.buffer.length === 0) return;

    console.error("\n[warp] Diagnostic trail (use --verbose to see this in real-time):");
    for (const msg of this.buffer) {
      console.error(msg);
    }
    this.buffer.length = 0;
  }

  /** Discard buffered messages (e.g. after a successful build). */
  clear(): void {
    this.buffer.length = 0;
  }
}

/** Whether JSON output mode is active. When true, human-readable output is suppressed. */
let jsonMode = false;

export function isJsonMode(): boolean {
  return jsonMode;
}

export function setJsonMode(enabled: boolean): void {
  jsonMode = enabled;
}

/** Module-level default logger. CLI sets the level before build(). */
let defaultLogger = new Logger("info");

export function getLogger(): Logger {
  return defaultLogger;
}

export function setLogLevel(level: LogLevel): void {
  defaultLogger = new Logger(level);
}
